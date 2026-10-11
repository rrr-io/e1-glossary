/** One term, like a driver card: topic, number, the term, its official E1 meaning, then what it means for fans. */
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
      <p className="card-e1"><span className="visually-hidden">In E1: </span>{term.e1}</p>
      <p className="card-definition">{term.definition}</p>
      {term.example?.trim() && <p className="card-example">“{term.example}”</p>}
    </article>
  )
}
