import { useEffect, useMemo, useRef, useState } from 'react'
import { TERMS, TOPICS } from './terms.js'
import { filterTerms, lettersIn } from './filter.js'
import TermCard from './TermCard.jsx'
import Footer from './Footer.jsx'

const topicById = Object.fromEntries(TOPICS.map((t) => [t.id, t]))
const numberOf = Object.fromEntries(TERMS.map((t, i) => [t.id, String(i + 1).padStart(2, '0')]))
const pad = (n) => String(n).padStart(2, '0')

export default function App() {
  const [topic, setTopic] = useState('all')
  const [letter, setLetter] = useState(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(null)
  const [position, setPosition] = useState(0)
  const track = useRef(null)

  const cards = useMemo(() => filterTerms(TERMS, { topic, letter, query }), [topic, letter, query])
  const letters = useMemo(() => lettersIn(TERMS, topic), [topic])

  // a link to #pit-stop opens the page on that card, whatever the filters were
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!TERMS.some((t) => t.id === id)) return
      setTopic('all'); setLetter(null); setQuery(''); setFocused(id)
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
  }, [topic, letter, query])

  const pickTopic = (id) => {
    setTopic(id)
    if (letter && !lettersIn(TERMS, id).some((l) => l.letter === letter && l.used)) setLetter(null)
  }

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
          <label className="search">
            Search a term
            <input type="search" value={query} placeholder="Pit Stop, Lap, P1…" onChange={(e) => setQuery(e.target.value)} />
          </label>
        </section>

        <nav className="wrap" aria-label="Topics">
          <div className="chips">
            {[{ id: 'all', name: 'All terms' }, ...TOPICS].map((t) => (
              <button key={t.id} type="button" className="chip" aria-pressed={topic === t.id} onClick={() => pickTopic(t.id)}>
                {t.name}
                <span className="chip-count">{t.id === 'all' ? TERMS.length : TERMS.filter((x) => x.topic === t.id).length}</span>
              </button>
            ))}
          </div>
        </nav>

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

        {cards.length === 0 && (
          <p className="wrap empty" role="status">No term here. Try another letter or topic.</p>
        )}

        <section className="wrap cards" aria-label="Terms" ref={track} onScroll={onSwipe}>
          {cards.map((t) => (
            <TermCard key={t.id} term={t} topic={topicById[t.topic]} number={numberOf[t.id]} focused={focused === t.id} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
