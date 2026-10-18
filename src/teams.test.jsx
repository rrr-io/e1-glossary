import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { RACING_TEAMS, teamsMatching } from './teams.js'
import { TERMS } from './terms.js'
import TeamGrid from './TeamGrid.jsx'

const roles = (crew) => crew.flatMap((m) => [m, ...roles(m.crew ?? [])])

describe('teamsMatching', () => {
  it('finds a team by livery, hashtag or crew handle', () => {
    expect(teamsMatching('Alpinoo').map((t) => t.id)).toEqual(['team-sunoo'])
    expect(teamsMatching('hoonrari').map((t) => t.id)).toEqual(['team-sunghoon'])
    expect(teamsMatching('ferrari')).toEqual([])
    expect(teamsMatching('#MCJAKEY').map((t) => t.id)).toEqual(['team-jake'])
    expect(teamsMatching('@wonniesgardn').map((t) => t.id)).toEqual(['team-jungwon'])
    expect(teamsMatching('  ')).toEqual([])
  })
})

describe('the E1 Grid', () => {
  afterEach(cleanup)

  it('links every role to a card in the glossary', () => {
    const ids = new Set(TERMS.map((t) => t.id))
    RACING_TEAMS.forEach((t) => roles(t.crew).forEach((m) => expect(ids.has(m.term)).toBe(true)))
  })

  it('opens each name on X in a new tab', () => {
    render(<TeamGrid />)
    const captain = screen.getByRole('link', { name: '@jake9226' })
    expect(captain.getAttribute('href')).toBe('https://x.com/jake9226')
    expect(captain.getAttribute('target')).toBe('_blank')
  })

  it('shows a team without a crew yet', () => {
    render(<TeamGrid />)
    const niki = screen.getByRole('article', { name: /Team Ni-ki/ })
    expect(within(niki).getByText('Crew coming soon.')).toBeTruthy()
  })
})

describe('team colours', () => {
  afterEach(cleanup)

  it('gives each card its team colour for the handles', () => {
    render(<TeamGrid />)
    const hoon = screen.getByRole('article', { name: /Team Sunghoon/ })
    expect(hoon.style.getPropertyValue('--team-ink')).toBe('#FF4A3D')
    const jake = screen.getByRole('article', { name: /Team Jake/ })
    expect(jake.style.getPropertyValue('--team-ink')).toBe('#FF8000')
  })
})

describe('the Racing Teams card', () => {
  afterEach(cleanup)

  it('shows each hashtag in its team colour and links to the team', async () => {
    const { default: TermCard } = await import('./TermCard.jsx')
    const term = TERMS.find((t) => t.id === 'racing-team')
    render(<TermCard term={term} topic={{ name: 'The teams' }} number="02" />)
    const tag = screen.getByText('#HOONRARI')
    expect(tag.style.color).toBe('rgb(255, 74, 61)')
    expect(tag.closest('a').getAttribute('href')).toBe('#team-sunghoon')
  })
})
