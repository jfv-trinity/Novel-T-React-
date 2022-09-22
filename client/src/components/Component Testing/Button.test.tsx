import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../Buttons/Button'

test('renders learn react link', () => {
  render(<Button text="hit me daddy" />)
  const buttonText = screen.getByText(/hit me daddy/i)
  expect(buttonText).toBeInTheDocument()
})
