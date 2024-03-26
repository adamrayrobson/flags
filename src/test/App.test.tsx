import { test, describe, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

describe('App renders Countries', () => {
  test('renders countries component', () => {
    const { getByTestId } = render(<App />)
    const element = getByTestId(/countries-div/i)
    expect(element).toBeInstanceOf('HTMLDivElement')
  })
});

