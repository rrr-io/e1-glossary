import { describe, expect, it } from 'vitest'
import { TERMS, TOPICS } from './terms.js'
import { filterTerms, lettersIn, matchesQuery } from './filter.js'

const names = (list) => list.map((t) => t.term)

describe('the glossary data', () => {
  it('has the race terms and the 8 team roles, each once', () => {
    expect(TERMS.filter((t) => t.topic !== 'roles')).toHaveLength(22)
    expect(TERMS.filter((t) => t.topic === 'roles')).toHaveLength(8)
    expect(new Set(TERMS.map((t) => t.id)).size).toBe(TERMS.length)
  })

  it('puts every term in a known topic', () => {
    const topics = new Set(TOPICS.map((t) => t.id))
    TERMS.forEach((t) => expect(topics.has(t.topic)).toBe(true))
  })
})

describe('filterTerms', () => {
  it('shows everything with no filter', () => {
    expect(filterTerms(TERMS)).toHaveLength(TERMS.length)
  })

  it('keeps one topic', () => {
    expect(names(filterTerms(TERMS, { topic: 'phases' }))).toEqual(['Sprint Race', 'Grand Prix', 'Final Lap', 'Finish Line'])
  })

  it('combines topic and letter', () => {
    expect(names(filterTerms(TERMS, { topic: 'results', letter: 'P' }))).toEqual(['Podium', 'P1', 'Podium Ceremony'])
  })

  it('searches the term, its E1 meaning and its definition', () => {
    expect(names(filterTerms(TERMS, { query: 'daesang' }))).toEqual(['P1'])
    expect(names(filterTerms(TERMS, { query: 'round 2' }))).toEqual(['Grand Prix'])
    expect(names(filterTerms(TERMS, { query: 'enhapopbase' }))).toEqual(['Paddock Announcers'])
  })

  it('ignores case and accents', () => {
    expect(matchesQuery(TERMS[0], '  DRÏVER ')).toBe(true)
  })
})

describe('lettersIn', () => {
  it('turns off the letters with no terms in the topic', () => {
    const used = lettersIn(TERMS, 'teams').filter((l) => l.used).map((l) => l.letter)
    expect(used).toEqual(['D', 'P', 'R', 'T'])
  })
})
