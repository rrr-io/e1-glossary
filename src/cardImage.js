import { RACING_TEAMS } from './teams.js'

// A term card as a 1080×1350 image (the portrait size Instagram and X show in full), drawn on a canvas.

export const IMAGE = { width: 1080, height: 1350, pad: 88 }
const C = {
  ground: '#0F0F14', card: '#1A1A22', frame: '#3A3A48', text: '#F2F2F5', muted: '#A6A6B2',
  red: '#E10600', redText: '#FF4A3D', number: '#34343F', grid: 'rgba(255, 255, 255, 0.035)'
}
const PIXEL = "'Press Start 2P', monospace"
const BODY = "'IBM Plex Mono', monospace"
const SITE = 'e1-glossary.rrriooo.com'
const teamById = Object.fromEntries(RACING_TEAMS.map((t) => [t.id, t]))

/** Splits text into lines no wider than maxWidth, measured by `measure(text)`. Long words get a line of their own. */
export function wrapLines(text, maxWidth, measure) {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word
    if (line && measure(next) > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

export const fileName = (term) => `e1-glossary-${term.id}.png`

async function fontsReady() {
  if (!document.fonts?.load) return
  await Promise.all([
    document.fonts.load(`56px ${PIXEL}`), document.fonts.load(`36px ${BODY}`), document.fonts.load(`500 36px ${BODY}`)
  ]).catch(() => {})
}

/** The list under the definition, as lines of coloured parts: Racing Teams show their hashtag in the team colour. */
function listLines(term) {
  return (term.list ?? []).map((item) => {
    if (!item.team) return { dot: C.red, parts: [{ text: item.label, color: C.text }] }
    const team = teamById[item.team]
    return { dot: team?.color ?? C.red, parts: [{ text: `${item.label} — `, color: C.text }, { text: item.tag, color: team?.ink ?? team?.color }] }
  })
}

function background(ctx) {
  const { width, height } = IMAGE
  ctx.fillStyle = C.ground
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = C.grid
  for (let x = 0; x < width; x += 24) ctx.fillRect(x, 0, 3, height)
  for (let y = 0; y < height; y += 24) ctx.fillRect(0, y, width, 3)
}

/** The card: a frame with notched corners and a hard shadow, like on the site. */
function frame(ctx, x, y, w, h) {
  const e = 6
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)'
  ctx.fillRect(x + 12, y + 12, w, h)
  ctx.fillStyle = C.frame
  ctx.fillRect(x, y - e, w, h + 2 * e)
  ctx.fillRect(x - e, y, w + 2 * e, h)
  ctx.fillStyle = C.card
  ctx.fillRect(x, y, w, h)
}

/** The footer stripe: a line that breaks into three slanted blocks, every slant in 6 px steps. */
function stripe(ctx, y) {
  const { width, pad } = IMAGE
  const step = 6
  const blockW = 44
  const gap = 18
  const lineEnd = width - pad - 3 * (blockW + gap)
  ctx.fillStyle = C.red
  for (let row = 0; row < 3; row++) {
    const shift = (2 - row) * step
    ctx.fillRect(0, y + row * step, lineEnd - 2 * step + shift, step)
    for (let b = 0; b < 3; b++) ctx.fillRect(lineEnd + gap + b * (blockW + gap) + shift, y + row * step, blockW, step)
  }
}

/** A new canvas with the background, the brand, the empty card frame and the footer. */
async function blankCard() {
  await fontsReady()
  const { width, height, pad } = IMAGE
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.textBaseline = 'top'
  background(ctx)

  // brand on top
  ctx.fillStyle = C.red
  ctx.fillRect(pad, pad + 4, 22, 22)
  ctx.font = `22px ${PIXEL}`
  ctx.fillStyle = C.redText
  ctx.fillText('E1 GLOSSARY', pad + 40, pad + 4)

  const cardX = pad
  const cardY = pad + 80
  const cardW = width - 2 * pad
  const cardH = height - cardY - 190
  frame(ctx, cardX, cardY, cardW, cardH)

  // footer: the stripe and the address of the site
  stripe(ctx, height - 132)
  ctx.font = `20px ${PIXEL}`
  ctx.fillStyle = C.muted
  ctx.fillText(SITE, pad, height - 80)
  ctx.fillStyle = C.text
  ctx.textAlign = 'right'
  ctx.fillText('#E1GLOSSARY', width - pad, height - 80)
  ctx.textAlign = 'left'
  return { canvas, ctx, cardX, cardY, cardW, cardH, inner: cardW - 2 * 56, left: cardX + 56 }
}

/** Draws the card for one term and returns the canvas. */
export async function drawCardImage(term, number) {
  const { canvas, ctx, cardX, cardY, cardW, cardH, inner, left } = await blankCard()

  // fit the text: shrink the body until everything fits in the card
  let body = 38
  let layout
  for (; body >= 24; body -= 2) {
    const lh = Math.round(body * 1.45)
    ctx.font = `56px ${PIXEL}`
    const termLines = wrapLines(term.term.toUpperCase(), inner, (t) => ctx.measureText(t).width)
    ctx.font = `500 ${body}px ${BODY}`
    const e1Lines = term.e1 ? wrapLines(term.e1, inner, (t) => ctx.measureText(t).width) : []
    ctx.font = `${body}px ${BODY}`
    const defLines = wrapLines(term.definition, inner, (t) => ctx.measureText(t).width)
    const list = listLines(term)
    const listH = list.length ? 24 + list.length * Math.round(body * 1.25) : 0
    const total = 120 + termLines.length * 76 + (e1Lines.length ? 20 + e1Lines.length * lh : 0) + 56 + defLines.length * lh + listH
    layout = { lh, termLines, e1Lines, defLines, list, height: total - 120 }
    if (total <= cardH - 64) break
  }

  // race number, top right of the card
  ctx.font = `64px ${PIXEL}`
  ctx.fillStyle = C.number
  ctx.textAlign = 'right'
  ctx.fillText(number, cardX + cardW - 48, cardY + 48)
  ctx.textAlign = 'left'

  // short terms sit in the middle of the card instead of leaving an empty bottom half
  const room = cardH - 166
  let y = cardY + 110 + Math.max(40, (room - layout.height) / 2)
  ctx.font = `56px ${PIXEL}`
  ctx.fillStyle = C.text
  layout.termLines.forEach((line) => { ctx.fillText(line, left, y); y += 76 })

  if (layout.e1Lines.length) {
    y += 20
    ctx.font = `500 ${body}px ${BODY}`
    ctx.fillStyle = C.redText
    layout.e1Lines.forEach((line) => { ctx.fillText(line, left, y); y += layout.lh })
  }

  // dashed pixel rule
  y += 20
  ctx.fillStyle = C.frame
  for (let x = left; x < left + inner; x += 16) ctx.fillRect(x, y, 8, 6)
  y += 36

  ctx.font = `${body}px ${BODY}`
  ctx.fillStyle = C.text
  layout.defLines.forEach((line) => { ctx.fillText(line, left, y); y += layout.lh })

  if (layout.list.length) {
    y += 24
    const size = Math.round(body * 0.82)
    ctx.font = `${size}px ${BODY}`
    layout.list.forEach(({ dot, parts }) => {
      ctx.fillStyle = dot
      ctx.fillRect(left, y + size * 0.35, 12, 12)
      let x = left + 30
      parts.forEach(({ text, color }) => { ctx.fillStyle = color; ctx.fillText(text, x, y); x += ctx.measureText(text).width })
      y += Math.round(body * 1.25)
    })
  }
  return canvas
}

/** The crew as rows: the role (and its note) in the pixel font, then the handles in the team colour. Stewards are indented. */
function crewRows(crew, depth = 0) {
  return crew.flatMap((m) => [
    { depth, role: m.role, note: m.note, handles: (m.handles ?? []).map((h) => `@${h}`).join('  ') },
    ...crewRows(m.crew ?? [], depth + 1)
  ])
}

/** Draws the card for one Racing Team and returns the canvas. */
export async function drawTeamImage(team) {
  const { canvas, ctx, cardX, cardY, cardW, cardH, inner, left } = await blankCard()
  const ink = team.ink ?? team.color
  const rows = crewRows(team.crew)

  // the team colour along the top of the card
  ctx.fillStyle = team.color
  ctx.fillRect(cardX, cardY, cardW, 12)

  // hashtag, top right of the card, where terms have their number
  ctx.font = `22px ${PIXEL}`
  ctx.fillStyle = ink
  ctx.textAlign = 'right'
  ctx.fillText(team.tag, cardX + cardW - 48, cardY + 52)
  ctx.textAlign = 'left'

  // fit the crew: shrink everything a little until it fits in the card
  let k = 1
  let layout
  for (; k >= 0.6; k -= 0.05) {
    const roleSize = Math.round(18 * k)
    const bodySize = Math.round(30 * k)
    ctx.font = `52px ${PIXEL}`
    const liveryLines = wrapLines(team.livery.toUpperCase(), inner - 72, (t) => ctx.measureText(t).width)
    const items = rows.map((r) => {
      const indent = r.depth * 40
      ctx.font = `${roleSize}px ${PIXEL}`
      const roleW = ctx.measureText(r.role.toUpperCase()).width
      ctx.font = `${bodySize}px ${BODY}`
      const note = r.note ? ` · ${r.note}` : ''
      const noteBelow = note && roleW + ctx.measureText(note).width > inner - indent
      ctx.font = `500 ${bodySize}px ${BODY}`
      const handleLines = r.handles ? wrapLines(r.handles, inner - indent, (t) => ctx.measureText(t).width) : []
      const h = Math.round(bodySize * 1.3) * (1 + (noteBelow ? 1 : 0) + handleLines.length)
      return { ...r, indent, noteBelow, handleLines, h }
    })
    const gap = Math.round(22 * k)
    const crewH = rows.length ? items.reduce((sum, i) => sum + i.h, 0) + gap * (items.length - 1) : 48
    const height = liveryLines.length * 70 + 44 + 56 + crewH
    layout = { liveryLines, items, gap, roleSize, bodySize, height }
    if (height <= cardH - 166 - 48) break
  }

  let y = cardY + 110 + Math.max(24, (cardH - 166 - layout.height) / 2)

  // swatch and livery, the team name under it
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)'
  ctx.fillRect(left + 8, y + 10, 44, 44)
  ctx.fillStyle = team.color
  ctx.fillRect(left, y + 2, 44, 44)
  ctx.font = `52px ${PIXEL}`
  ctx.fillStyle = C.text
  layout.liveryLines.forEach((line) => { ctx.fillText(line, left + 72, y); y += 70 })
  ctx.font = `22px ${PIXEL}`
  ctx.fillStyle = C.muted
  ctx.fillText(team.team.toUpperCase(), left + 72, y)
  y += 44

  // dashed pixel rule
  y += 14
  ctx.fillStyle = C.frame
  for (let x = left; x < left + inner; x += 16) ctx.fillRect(x, y, 8, 6)
  y += 42

  if (!layout.items.length) {
    ctx.font = `30px ${BODY}`
    ctx.fillStyle = C.muted
    ctx.fillText('Crew coming soon.', left, y)
    return canvas
  }

  const { roleSize, bodySize, gap } = layout
  const lh = Math.round(bodySize * 1.3)
  layout.items.forEach((item) => {
    const x = left + item.indent
    const top = y
    ctx.font = `${roleSize}px ${PIXEL}`
    ctx.fillStyle = C.text
    const role = item.role.toUpperCase()
    ctx.fillText(role, x, y + (bodySize - roleSize) / 2)
    if (item.note) {
      ctx.font = `${bodySize}px ${BODY}`
      ctx.fillStyle = C.muted
      if (item.noteBelow) { y += lh; ctx.fillText(item.note, x, y) }
      else { ctx.font = `${roleSize}px ${PIXEL}`; const w = ctx.measureText(role).width; ctx.font = `${bodySize}px ${BODY}`; ctx.fillText(` · ${item.note}`, x + w, y) }
    }
    y += lh
    ctx.font = `500 ${bodySize}px ${BODY}`
    ctx.fillStyle = ink
    item.handleLines.forEach((line) => { ctx.fillText(line, x, y); y += lh })
    // stewards hang from a dashed line, like on the site
    if (item.depth) {
      ctx.fillStyle = C.frame
      for (let ry = top - gap; ry < y; ry += 16) ctx.fillRect(x - 40, ry, 6, 8)
    }
    y += gap
  })
  return canvas
}

const onPhone = () => window.matchMedia?.('(pointer: coarse)').matches ?? false

/** Saves an image. Phones get the share sheet, so it can go straight to Photos; computers download the file,
 * since their share sheet (Mail, AirDrop…) has no "save" in it. */
async function saveImage(canvas, name, title) {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return
  const file = new File([blob], name, { type: 'image/png' })
  if (onPhone() && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title })
      return
    } catch (err) {
      if (err?.name === 'AbortError') return
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export const saveCardImage = async (term, number) =>
  saveImage(await drawCardImage(term, number), fileName(term), `${term.term} · E1 Glossary`)

export const saveTeamImage = async (team) =>
  saveImage(await drawTeamImage(team), fileName(team), `${team.livery} · E1 Glossary`)
