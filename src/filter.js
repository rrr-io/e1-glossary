export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const initial = (term) => term.term[0].toUpperCase()

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function matchesQuery(term, query) {
  const q = normalize(query.trim())
  if (!q) return true
  return normalize([term.term, term.e1 ?? '', term.definition, ...(term.list ?? []).map((i) => `${i.label} ${i.tag ?? ''}`)].join(' ')).includes(q)
}

/** Topic first, then letter, then search: the three filters add up. */
export function filterTerms(terms, { topic = 'all', letter = null, query = '' } = {}) {
  return terms
    .filter((t) => topic === 'all' || t.topic === topic)
    .filter((t) => !letter || initial(t) === letter)
    .filter((t) => matchesQuery(t, query))
}

/** The letters that have at least one term in the chosen topic. */
export function lettersIn(terms, topic = 'all') {
  const used = new Set(terms.filter((t) => topic === 'all' || t.topic === topic).map(initial))
  return ALPHABET.map((letter) => ({ letter, used: used.has(letter) }))
}
