import { describe, beforeEach, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Countries from '../components/Countries';

describe('Countries renders controls', () => {
  beforeEach(() => {
    vi.mock('../services/client', () => {
      const mockClient = {
        from: vi.fn().mockReturnValue('countries'),
        select: vi.fn().mockReturnValue('*'),
        eq: vi.fn().mockReturnValue('id'),
        execute: vi.fn().mockReturnValue(Promise.resolve({ data: [], error: null })),
      };

      return mockClient;
    });
  });

  test('renders without crashing', () => {
    const { getByTestId } = render(<Countries />);
    const countriesDiv = getByTestId('countries-div');
    expect(countriesDiv).toBeInstanceOf(HTMLDivElement);
  });

  test('handles search input change', () => {
    const { getByPlaceholderText } = render(<Countries />);
    const searchInput = getByPlaceholderText('Search Countries...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  test('handles continent select change', () => {
    const { getByTestId } = render(<Countries />);
    const continentSelect = getByTestId('continent') as HTMLSelectElement;
    fireEvent.change(continentSelect, { target: { value: 'Asia' } });
    expect(continentSelect.value).toBe('Asia');
  });

  test('displays error message', () => {
    const { getByTestId } = render(<Countries />);
    const errorSpan = getByTestId('error');
    expect(errorSpan).toBeInstanceOf(HTMLSpanElement);
  });

  test('displays loader when loading', () => {
    const { getByText } = render(<Countries />);
    const loader = getByText('Loading...');
    expect(loader).toBeInstanceOf(HTMLDivElement);
  });

  test('displays countries when not loading', () => {
    const { getByTestId } = render(<Countries />);
    const continent = getByTestId('continent');
    expect(continent).toBeInstanceOf(HTMLSelectElement);
  });
});
