import { useState, useEffect } from 'react'

export default function JobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Wishlist',
    notes: '',
    applied_date: '',
  })

  useEffect(() => {
    if (job) {
      setForm({
        company: job.company || '',
        role: job.role || '',
        status: job.status || 'Wishlist',
        notes: job.notes || '',
        applied_date: job.applied_date
          ? job.applied_date.split('T')[0]
          : '',
      })
    }
  }, [job])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      applied_date: form.applied_date
        ? new Date(form.applied_date).toISOString()
        : null,
    }
    onSave(payload)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{job?.id ? '✏️ Edit Job' : '➕ Add Job'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="company"
            placeholder="Company *"
            value={form.company}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Role / Position *"
            value={form.role}
            onChange={handleChange}
            required
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Wishlist</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input
            name="applied_date"
            type="date"
            value={form.applied_date}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}