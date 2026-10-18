import { useState } from 'react'

/** The floppy disk at the bottom right of a card. It blinks while the image is being made. */
export default function SaveButton({ label, onSave }) {
  const [saving, setSaving] = useState(false)
  const save = async () => {
    setSaving(true)
    try { await onSave() } finally { setSaving(false) }
  }
  return (
    <button type="button" className="card-save" onClick={save} disabled={saving} aria-label={label} title="Save as image">
      <svg width="24" height="24" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" shapeRendering="crispEdges">
        <path d="M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM7 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM0 1h1v1h-1zM3 1h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM0 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM11 2h1v1h-1zM0 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM5 4h1v1h-1zM6 4h1v1h-1zM7 4h1v1h-1zM8 4h1v1h-1zM11 4h1v1h-1zM0 5h1v1h-1zM11 5h1v1h-1zM0 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM11 6h1v1h-1zM0 7h1v1h-1zM2 7h1v1h-1zM9 7h1v1h-1zM11 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM0 9h1v1h-1zM2 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM9 10h1v1h-1zM11 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM2 11h1v1h-1zM3 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM11 11h1v1h-1z" />
      </svg>
    </button>
  )
}
