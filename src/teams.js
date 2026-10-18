// The Racing Teams and who runs them: livery, hashtag and crew.
// Handles are X usernames, without the @. `ink` is a lighter shade of the team colour for text, when the colour
// itself is too dark to read on the cards.
// `term` links a role to its card in the glossary. A team with no crew yet shows "Crew coming soon".

const captains = (leader, coLeader) => [
  { term: 'team-captain', role: 'Team Captain', note: 'Leader', handles: [leader] },
  { term: 'co-team-captain', role: 'Co-Team Captain', note: 'Co-leader', handles: [coLeader] }
]

const pitWall = ({ engineer, system, manual, media }) => [
  { term: 'race-engineer', role: 'Race Engineer', note: 'Voting Strategies', handles: [engineer] },
  {
    term: 'race-steward', role: 'Race Steward', crew: [
      { term: 'e1-system-steward', role: 'E1 System Steward', note: 'Voting Proof Checker', handles: [system] },
      { term: 'manual-steward', role: 'Manual Steward', note: 'Voting Proof Encoder and Checker', handles: [manual] },
      { term: 'media-crew', role: 'Media Crew', handles: [media] }
    ]
  }
]

export const RACING_TEAMS = [
  {
    id: 'team-jungwon', team: 'Team Jungwon', livery: 'Meowcedes', tag: '#MEOWCEDES', color: '#13A8A0', ink: '#2CD3C9',
    crew: [
      { term: 'team-manager', role: 'Team Manager', handles: ['baekthemochi']},
      ...captains('wonniesgardn', '02fantasies'),
      ...pitWall({ engineer: 'mywonlywon', system: 'lune_night28', manual: 'yjwbaobei', media: 'rileymeup_' })
    ]
  },
  {
    id: 'team-jay', team: 'Team Jay', livery: 'JayBull Racing', tag: '#JAYBULLRACING', color: '#FFD400',
    crew: [
      ...captains('jayseongieee', 'jayhoonsgf'),
      ...pitWall({ engineer: 'igiioovanna', system: '02byjay', manual: 'blosomoon', media: 'ENHYPENJAYHQ' })
    ]
  },
  {
    id: 'team-jake', team: 'Team Jake', livery: 'McJakey', tag: '#MCJAKEY', color: '#FF8000',
    crew: [
      ...captains('jake9226', 'swcyjakey'),
      ...pitWall({ engineer: 'jakeysversion', system: 'anmngks', manual: 'Lovingjaeyunie', media: 'spideyunie' })
    ]
  },
  {
    id: 'team-sunghoon', team: 'Team Sunghoon', livery: 'Hoonrari', tag: '#HOONRARI', color: '#E10600', ink: '#FF4A3D',
    crew: [
      ...captains('hoonikiz', 'fioreIliu'),
      ...pitWall({ engineer: 'mysolace23', system: '02zzf0r3ver', manual: 'icathoons', media: 'pagehoonz' })
    ]
  },
  {
    id: 'team-sunoo', team: 'Team Sunoo', livery: 'Alpinoo', tag: '#ALPINOO', color: '#F06BB4',
    crew: [
      { term: 'team-manager', role: 'Team Manager', handles: ['pinknooieu'] },
      ...captains('ltboysunoo', 'infinitefoxz'),
      ...pitWall({ engineer: 'thavvysunny', system: 'bokeira_', manual: 'jjongnoo', media: 'zherraxoxo' })
    ]
  },
  {
    id: 'team-niki', team: 'Team Ni-ki', livery: 'Rikston Drift', tag: '#RIKSTONDRIFT', color: '#0B8040', ink: '#35C46E',
    crew: [
      { term: 'team-manager', role: 'Team Manager', handles: ['Puma24Girl'] },
      ...captains('namaewariki', 'HOONK1R0CKSTAR'),
      ...pitWall({ engineer: 'Enpen_ki', system: 'ninilouves', manual: 'crimlvfate', media: 'wonaerin' })
    ]
  }
]

export const profileUrl = (handle) => `https://x.com/${encodeURIComponent(handle)}`

const crewHandles = (crew) => crew.flatMap((m) => [...(m.handles ?? []), ...crewHandles(m.crew ?? [])])
const plain = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[#@\s-]/g, '')

/** Search for teams: name, livery, hashtag or any crew handle ("alpinoo", "#mcjakey", "@jake9226"). */
export function teamsMatching(query) {
  const q = plain(query.trim())
  if (!q) return []
  return RACING_TEAMS.filter((t) =>
    [t.team, t.livery, t.tag, ...crewHandles(t.crew)].some((field) => plain(field).includes(q)))
}
