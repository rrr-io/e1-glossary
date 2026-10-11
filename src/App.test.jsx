import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

const shown = () => within(screen.getByRole('region', { name: 'Terms' })).queryAllByRole('article').map((a) => a.id)

describe('App', () => {
  afterEach(cleanup)

  it('filters by topic and letter, and a second tap clears the letter', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Race weekend/ }))
    expect(shown()).toContain('pit-stop')
    expect(shown()).not.toContain('driver')

    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with L' }))
    expect(shown()).toEqual(['lights-out', 'lap'])

    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with L' }))
    expect(shown()).toHaveLength(7)
  })

  it('turns off letters that have no term in the topic', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /The teams/ }))
    expect(screen.getByRole('button', { name: 'No terms starting with G' }).disabled).toBe(true)
  })

  it('clears a letter that the new topic does not use', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with G' }))
    fireEvent.click(screen.getByRole('button', { name: /The teams/ }))
    expect(shown()).toHaveLength(4)
  })

  it('says so when nothing matches', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'safety car penalty xyz' } })
    expect(screen.getByRole('status').textContent).toContain('No term here')
  })
})
