import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fileName, wrapLines } from './cardImage.js'
import { TERMS } from './terms.js'
import TermCard from './TermCard.jsx'
import { TeamCard } from './TeamGrid.jsx'
import { RACING_TEAMS } from './teams.js'

const byChars = (t) => t.length

describe('wrapLines', () => {
  it('breaks text into lines that fit', () => {
    expect(wrapLines('The end of the race, when voting closes.', 16, byChars))
      .toEqual(['The end of the', 'race, when', 'voting closes.'])
  })

  it('keeps a word longer than the line on a line of its own', () => {
    expect(wrapLines('a ENGENEsENGENEs b', 6, byChars)).toEqual(['a', 'ENGENEsENGENEs', 'b'])
  })
})

describe('saving a card', () => {
  afterEach(cleanup)

  it('names the file after the term', () => {
    expect(fileName({ id: 'pit-stop' })).toBe('e1-glossary-pit-stop.png')
  })

  it('saves the card with its term and number', async () => {
    const onSave = vi.fn(() => Promise.resolve())
    const term = TERMS.find((t) => t.id === 'lights-out')
    render(<TermCard term={term} number="13" onSave={onSave} />)
    fireEvent.click(screen.getByRole('button', { name: 'Save the Lights Out card as an image' }))
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(term, '13'))
  })

  it('saves a Racing Team card too', async () => {
    const onSave = vi.fn(() => Promise.resolve())
    const team = RACING_TEAMS.find((t) => t.id === 'team-sunoo')
    render(<TeamCard team={team} onSave={onSave} />)
    fireEvent.click(screen.getByRole('button', { name: 'Save the Alpinoo card as an image' }))
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(team))
    expect(fileName(team)).toBe('e1-glossary-team-sunoo.png')
  })
})
