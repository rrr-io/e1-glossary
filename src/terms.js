// The E1 meaning of every term is EMGP's official race terminology, word for word.
// Definition explains it for new fans. Team roles: the short description each team uses.
// A term without an official E1 meaning leaves `e1` out. `list` adds a short list under the definition:
// an item with `href` is a link to X; an item with `team` jumps to that team on the E1 Grid and shows its `tag` in the team colour.

export const TOPICS = [
  { id: 'teams', name: 'The teams' },
  { id: 'officials', name: 'Officials and media' },
  { id: 'weekend', name: 'Race weekend' },
  { id: 'phases', name: 'Race phases' },
  { id: 'results', name: 'Results' },
  { id: 'roles', name: 'Team roles' }
]

export const TERMS = [
  {
    id: 'driver', term: 'Driver', topic: 'teams',
    e1: 'ENHYPEN member of each team',
    definition: 'An ENHYPEN member. Every Racing Team races for one Driver.'
  },
  {
    id: 'racing-team', term: 'Racing Teams', topic: 'teams',
    e1: 'F1 team assigned to each member',
    definition: 'The six competing teams, each representing an ENHYPEN member and their assigned Formula 1-inspired racing identity.',
    list: [
      { label: 'Team Jungwon', tag: '#MEOWCEDES', team: 'team-jungwon' },
      { label: 'Team Jay', tag: '#JAYBULLRACING', team: 'team-jay' },
      { label: 'Team Jake', tag: '#MCJAKEY', team: 'team-jake' },
      { label: 'Team Sunghoon', tag: '#HOONRARI', team: 'team-sunghoon' },
      { label: 'Team Sunoo', tag: '#ALPINOO', team: 'team-sunoo' },
      { label: 'Team Ni-ki', tag: '#RIKSTONDRIFT', team: 'team-niki' }
    ]
  },
  {
    id: 'pit-crew', term: 'Pit Crew', topic: 'teams',
    e1: 'ENGENE participants',
    definition: 'The ENGENEs assigned to each racing team who actively participate in MAMA voting and contribute to their team’s progress throughout the competition.'
  },
  {
    id: 'team-radio', term: 'Team Radio', topic: 'teams',
    e1: 'Team chant',
    definition: "The team's chant!"
  },
  {
    id: 'race-control', term: 'Race Control', topic: 'officials',
    e1: 'Main admin team',
    definition: 'The Main Admin Team responsible for overseeing the entire competition, managing operations, coordinating teams, enforcing rules, and ensuring the race runs smoothly and fairly.'
  },
  {
    id: 'paddock-announcers', term: 'Paddock Announcers', topic: 'officials',
    e1: 'Fanbases posting live updates',
    definition: 'The participating fanbases responsible for publishing and sharing the live team rankings every day to keep ENGENEs updated on the ongoing competition.',
    list: [
      { label: '@enhapopbase', href: 'https://x.com/enhapopbase' },
      { label: '@About___Enhypen', href: 'https://x.com/About___Enhypen' }
    ]
  },
  {
    id: 'formation-lap', term: 'Formation Lap', topic: 'weekend',
    definition: 'The pre-race period dedicated to preparing for the actual competition by boosting excitement, engaging the Pit Crew through games, organizing tag parties, and hosting streaming activities to build momentum before the race begins.'
  },
  {
    id: 'race-calendar', term: 'Race Calendar', topic: 'weekend',
    definition: 'The official schedule outlining the key dates, race events, voting periods, and important milestones throughout the E1 competition.'
  },
  {
    id: 'free-practice', term: 'Free Practice', topic: 'weekend',
    e1: 'Practicing before voting begins',
    definition: 'Practice race fow before the actual voting begins: set up the apps, try a vote on the website, learn how proofs work.'
  },
  {
    id: 'beta-testing', term: 'Beta Testing', topic: 'weekend',
    e1: 'Verifying proofs and testing the system',
    definition: 'Verifying the proofs the teams send and testing the system before the race.'
  },
  {
    id: 'grid', term: 'Grid', topic: 'weekend',
    e1: 'Starting lineup of teams',
    definition: 'The starting lineup of the E1 Racing Teams.'
  },
  {
    id: 'lights-out', term: 'Lights Out', topic: 'weekend',
    e1: 'Official start of the race',
    definition: 'The official start of the race.'
  },
  {
    id: 'lap', term: 'Lap', topic: 'weekend',
    e1: 'Mass-voting sessions in a day',
    definition: 'A mass-voting session. A race day could have several Laps.'
  },
  {
    id: 'pit-stop', term: 'Pit Stop', topic: 'weekend',
    e1: 'Temporary pause',
    definition: 'A temporary pause in the race.'
  },
  {
    id: 'sprint-race', term: 'Sprint Race', topic: 'phases',
    e1: 'MAMA Voting Round 1',
    definition: 'The first round of MAMA voting.'
  },
  {
    id: 'grand-prix', term: 'Grand Prix', topic: 'phases',
    e1: 'MAMA Voting Round 2',
    definition: 'The second round of MAMA voting.'
  },
  {
    id: 'final-lap', term: 'Final Lap', topic: 'phases',
    e1: 'MAMA Live Voting final',
    definition: 'The live voting during MAMA 2026, the last push of the race.'
  },
  {
    id: 'finish-line', term: 'Finish Line', topic: 'phases',
    e1: 'Completion of the race',
    definition: 'The end of the race, when voting closes.'
  },
  {
    id: 'podium', term: 'Podium', topic: 'results',
    e1: 'Final top three teams',
    definition: 'The final top three teams.'
  },
  {
    id: 'p1', term: 'P1', topic: 'results',
    e1: 'Daesang',
    definition: 'The Daesang, the grand prize at MAMA.'
  },
  {
    id: 'podium-ceremony', term: 'Podium Ceremony', topic: 'results',
    e1: 'Final results and awards',
    definition: 'The grand finale of the race, honoring the top three teams on the podium, recognizing outstanding achievements through special awards, and bringing everyone together for a celebratory streaming event to commemorate their hard work, dedication, and victories. 🏁🏆'
  },
  {
    id: 'team-manager', term: 'Team Manager', topic: 'roles',
    e1: 'Runs the team',
    definition: 'Keeps the Racing Team organised behind the scenes and works with the captains.'
  },
  {
    id: 'team-captain', term: 'Team Captain', topic: 'roles',
    e1: 'Leader',
    definition: 'Leads the Racing Team and its Pit Crew through every phase of the race.'
  },
  {
    id: 'co-team-captain', term: 'Co-Team Captain', topic: 'roles',
    e1: 'Co-leader',
    definition: 'Leads the Racing Team together with the Team Captain.'
  },
  {
    id: 'race-engineer', term: 'Race Engineer', topic: 'roles',
    e1: 'Voting Strategies',
    definition: "Plans the team's voting strategy: what to vote, when, and how to spread the work across the Pit Crew."
  },
  {
    id: 'race-steward', term: 'Race Steward', topic: 'roles',
    e1: 'Checks proofs and shares updates',
    definition: "The crew that checks the team's voting proofs and keeps everyone posted. E1 System Stewards, Manual Stewards and the Media Crew are all Race Stewards."
  },
  {
    id: 'e1-system-steward', term: 'E1 System Steward', topic: 'roles',
    e1: 'Voting Proof Checker',
    definition: 'Checks the voting proofs the team sends through the E1 system.'
  },
  {
    id: 'manual-steward', term: 'Manual Steward', topic: 'roles',
    e1: 'Voting Proof Encoder and Checker',
    definition: 'Records the voting proofs by hand and checks them.'
  },
  {
    id: 'media-crew', term: 'Media Crew', topic: 'roles',
    e1: 'Team media',
    definition: "Posts the team's updates and graphics."
  }
]
