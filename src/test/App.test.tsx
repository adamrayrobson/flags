import { test, describe, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('App renders Countries', () => {
  test('renders countries component', () => { // Add async here

    vi.mock('../services/client', () => {
      const mockClient = {
        from: vi.fn().mockReturnValue('countries'),
        select: vi.fn().mockReturnValue('*'),
        eq: vi.fn().mockReturnValue('id'),
        execute: vi.fn().mockReturnValue(Promise.resolve({ data: [], error: null })),
      };

      return mockClient;
    });

    const { getByTestId } = render(<App />);
    const element = getByTestId('countries-div') as HTMLDivElement
    expect(element).toBeInstanceOf(HTMLDivElement);
  });
});


