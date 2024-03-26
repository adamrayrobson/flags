import Header from './Header';
import { useCountries } from '../hooks/useCountries';
import Country from './Country';
import Loader from './Loader.tsx';
import type { CountryPropTypes } from '../../database.types.ts'

export default function Countries() {
  const {
    query,
    setQuery,
    filterCountries,
    continent,
    setContinent,
    error,
    loading
  } = useCountries();

  return (
    <div data-testid="countries-div">
      <Header />
      <div className="controls">
        <input
          type="text"
          placeholder="Search Countries..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase())
          }}
        />
        <select
          className="select"
          name="continent"
          id="continent"
          data-testid="continent"
          value={continent}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setContinent(e.target.value)
          }}
        >
          <option data-testid="country-name" value="all">All Countries</option>
          <option data-testid="country-name" value="Africa">Africa</option>
          <option data-testid="country-name" value="Antarctica">Antarctica</option>
          <option data-testid="country-name" value="Asia">Asia</option>
          <option data-testid="country-name" value="Oceania">Oceania</option>
          <option data-testid="country-name" value="Americas">Americas</option>
        </select>
        <span data-testid="error" className="error">{error}</span>
        <main>
          {loading && <Loader />}
          <div className="flag-grid">
            {!loading && filterCountries().map((country: CountryPropTypes) => (
              <Country
                key={country.id}
                {...country}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
