import { useEffect, useMemo, useRef, useState } from 'react'
import { TERMS, TOPICS } from './terms.js'
import { filterTerms, lettersIn } from './filter.js'
import TermCard from './TermCard.jsx'
import Footer from './Footer.jsx'
import TeamGrid, { TeamCard } from './TeamGrid.jsx'
import { teamsMatching } from './teams.js'

const topicById = Object.fromEntries(TOPICS.map((t) => [t.id, t]))
const numberOf = Object.fromEntries(TERMS.map((t, i) => [t.id, String(i + 1).padStart(2, '0')]))
const pad = (n) => String(n).padStart(2, '0')

export default function App() {
  const [letter, setLetter] = useState(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(null)
  const [position, setPosition] = useState(0)
  const track = useRef(null)

  const cards = useMemo(() => filterTerms(TERMS, { letter, query }), [letter, query])
  const letters = useMemo(() => lettersIn(TERMS), [])
  const teams = useMemo(() => teamsMatching(query), [query])

  // a link to #pit-stop opens the page on that card, whatever the filters were
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!TERMS.some((t) => t.id === id)) return
      setLetter(null); setQuery(''); setFocused(id)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth', block: 'center', inline: 'center' }))
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])

  // on a phone the cards are a carousel: back to the first one when the filters change
  useEffect(() => {
    track.current?.scrollTo?.({ left: 0 })
    setPosition(0)
  }, [letter, query])

  const onSwipe = (e) => {
    const first = e.currentTarget.firstElementChild
    if (!first) return
    const step = first.offsetWidth + 12
    setPosition(Math.min(cards.length - 1, Math.round(e.currentTarget.scrollLeft / step)))
  }

  return (
    <>
      <main id="top">
        <section className="intro wrap">
          <p className="eyebrow"><span aria-hidden="true" />New to E1?</p>
          <h1>E1 Glossary</h1>
          <p className="lede">
            The whole E1 race in {TERMS.length} terms, from the Grid to the Podium. Learn the lingo, then race
            for ENHYPEN.
          </p>
          <a className="chip chip-link" href="#racing-teams">
            Check the Racing Teams
            <svg width="12" height="12" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
              <path d="M2 0h2v3h2v1H5v1H4v1H2V5H1V4H0V3h2z" />
            </svg>
          </a>
          <label className="search">
            Search a term or a team
            <input type="search" value={query} placeholder="Pit Stop, Alpinoo, P1…" onChange={(e) => setQuery(e.target.value)} />
          </label>
        </section>


        <nav className="wrap" aria-label="Filter by letter">
          <div className="letters">
            {letters.map(({ letter: l, used }) => (
              <button key={l} type="button" className="letter" disabled={!used} aria-pressed={letter === l}
                      aria-label={used ? `Terms starting with ${l}` : `No terms starting with ${l}`}
                      onClick={() => setLetter(letter === l ? null : l)}>
                {l}
              </button>
            ))}
          </div>
        </nav>

        {teams.length > 0 && (
          <section className="wrap teams team-results" aria-label="Matching Racing Teams">
            {teams.map((t) => <TeamCard key={t.id} team={t} idPrefix="found-" />)}
          </section>
        )}

        <div className="wrap swipe-hint" aria-hidden="true">
          <span>{cards.length ? `${pad(position + 1)} / ${pad(cards.length)}` : ''}</span>
          {cards.length > 1 && (
            <span className="swipe">
              Swipe
              <svg width="32" height="18" viewBox="0 0 16 9" fill="currentColor">
                <path d="M0 4h1v1H0zM1 3h1v3H1zM2 2h1v5H2zM3 1h1v7H3zM4 3h12v3H4z" />
              </svg>
            </span>
          )}
        </div>

        {cards.length === 0 && teams.length === 0 && (
          <p className="wrap empty" role="status">No term here. Try another letter or word.</p>
        )}

        <section className="wrap cards" aria-label="Terms" ref={track} onScroll={onSwipe}>
          {cards.map((t) => (
            <TermCard key={t.id} term={t} topic={topicById[t.topic]} number={numberOf[t.id]} focused={focused === t.id} />
          ))}
        </section>

        <TeamGrid />
      </main>
      <Footer />
    </>
  )
}
