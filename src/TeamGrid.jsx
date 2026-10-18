import { RACING_TEAMS, profileUrl } from './teams.js'

function Handles({ handles }) {
  return (
    <span className="crew-handles">
      {handles.map((h) => (
        <a key={h} href={profileUrl(h)} target="_blank" rel="noopener noreferrer">@{h}</a>
      ))}
    </span>
  )
}

function Role({ member }) {
  return (
    <li className="crew-role">
      <span className="crew-title">
        <a href={`#${member.term}`}>{member.role}</a>
        {member.note && <span className="crew-note"> · {member.note}</span>}
      </span>
      {member.handles && <Handles handles={member.handles} />}
      {member.crew && (
        <ul className="crew-sub">
          {member.crew.map((m) => <Role key={m.term} member={m} />)}
        </ul>
      )}
    </li>
  )
}

/** One Racing Team: its livery, the team name under it, then its crew. Used by the E1 Grid and by the search results. */
export function TeamCard({ team: t, idPrefix = '' }) {
  return (
    <article id={`${idPrefix}${t.id}`} className="team" style={{ '--team': t.color, '--team-ink': t.ink ?? t.color }} aria-labelledby={`${idPrefix}${t.id}-title`}>
      <h3 id={`${idPrefix}${t.id}-title`} className="team-name">
        <span className="team-swatch" aria-hidden="true" />
        {t.livery}
        <span className="team-livery">{t.team}</span>
      </h3>
      {t.crew.length > 0
        ? <ul className="crew">{t.crew.map((m) => <Role key={m.term} member={m} />)}</ul>
        : <p className="crew-soon">Crew coming soon.</p>}
    </article>
  )
}

/** The E1 Grid: every Racing Team and the fans who run it. Role names link to their card in the glossary. */
export default function TeamGrid() {
  return (
    <section id="racing-teams" className="team-grid" aria-labelledby="racing-teams-title">
      <div className="wrap">
        <p className="eyebrow"><span aria-hidden="true" />Racing Teams</p>
        <h2 id="racing-teams-title" className="grid-title">The E1 Grid</h2>
        <p className="lede">Who runs each Racing Team. Tap a role to see what it means, or a name to open their profile on X.</p>
      </div>
      <div className="wrap teams">
        {RACING_TEAMS.map((t) => <TeamCard key={t.id} team={t} />)}
      </div>
    </section>
  )
}
