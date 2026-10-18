import { RACING_TEAMS } from './teams.js'

const teamById = Object.fromEntries(RACING_TEAMS.map((t) => [t.id, t]))

function ListItem({ item }) {
  if (item.team) {
    const team = teamById[item.team]
    return (
      <a href={`#${item.team}`}>
        {item.label} — <span className="card-tag" style={{ color: team?.ink ?? team?.color }}>{item.tag}</span>
      </a>
    )
  }
  if (item.href) return <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
  return item.label
}

/** One term, like a driver card: topic, number, the term, its official E1 meaning, then what it means for fans, and an optional list. */
export default function TermCard({ term, topic, number, focused = false }) {
  return (
    <article id={term.id} className={`card ${focused ? 'is-focused' : ''}`} aria-labelledby={`${term.id}-title`}>
      <div className="card-head">
        <span className="card-topic">{topic.name}</span>
        <span className="card-number" aria-hidden="true">{number}</span>
      </div>
      <h2 id={`${term.id}-title`} className="card-term">
        <a href={`#${term.id}`} aria-label={`${term.term}, link to this term`}>{term.term}</a>
      </h2>
      {term.e1 && <p className="card-e1"><span className="visually-hidden">In E1: </span>{term.e1}</p>}
      <p className="card-definition">{term.definition}</p>
      {term.list && (
        <ul className="card-list">
          {term.list.map((item) => (
            <li key={item.label} style={item.team ? { '--dot': teamById[item.team]?.color } : undefined}>
              <ListItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
