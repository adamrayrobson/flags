import { describe, beforeEach, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Country from '../components/Country';

describe('Country', () => {
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

  const countryData = {
    id: 1,
    created_at: '2021-09-01T00:00:00.000Z',
    population: 331449281,
    iso2: 'US',
    name: 'United States',
    region: 'Americas',
    capital: 'Washington D.C.',
    flag: 'https://flagcdn.com/us.svg',
   };

  test('renders without crashing', () => {
    const { getByTestId } = render(<Country {...countryData} />);
    const countryName = getByTestId(/country-div/);
    expect(countryName).toBeTruthy();
  });

  test('displays correct flag', () => {
    const { getByAltText } = render(<Country {...countryData} />);
    const flag = getByAltText(countryData.name);
    expect(flag).toBeTruthy();
  });
});
