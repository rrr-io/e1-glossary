import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

const shown = () => within(screen.getByRole('region', { name: 'Terms' })).queryAllByRole('article').map((a) => a.id)

describe('App', () => {
  afterEach(cleanup)

  it('filters by letter, and a second tap clears it', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with L' }))
    expect(shown()).toEqual(['lights-out', 'lap'])

    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with L' }))
    expect(shown()).toHaveLength(30)
  })

  it('turns off letters with no terms', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'No terms starting with Q' }).disabled).toBe(true)
  })

  it('combines the letter with the search', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Terms starting with P' }))
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'daesang' } })
    expect(shown()).toEqual(['p1'])
  })

  it('takes the Racing Teams button to the E1 Grid', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Check the Racing Teams' }).getAttribute('href')).toBe('#racing-teams')
  })

  it('shows the team when the search names it', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'alpinoo' } })
    const found = screen.getByRole('region', { name: 'Matching Racing Teams' })
    expect(within(found).getByRole('article', { name: /Team Sunoo/ })).toBeTruthy()
    expect(shown()).toEqual(['racing-team'])
  })

  it('says so when nothing matches', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'safety car penalty xyz' } })
    expect(screen.getByRole('status').textContent).toContain('No term here')
  })
})

describe('anchors', () => {
  afterEach(cleanup)

  it('keeps every id unique, so links land on the right place', () => {
    render(<App />)
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id)
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([])
  })
})
