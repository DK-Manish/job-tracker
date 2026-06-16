import { Draggable } from '@hello-pangea/dnd'
import { deleteJob } from '../api/axios'

export default function JobCard({ job, index, onDelete, onClick }) {
  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm(`Delete ${job.company} — ${job.role}?`)) {
      await deleteJob(job.id)
      onDelete(job.id)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Draggable draggableId={String(job.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className="job-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(job)}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.85 : 1,
            boxShadow: snapshot.isDragging
              ? '0 8px 24px rgba(0,0,0,0.15)'
              : undefined,
          }}
        >
          <h4>{job.role}</h4>
          <p>{job.company}</p>
          <div className="job-card-footer">
            <span className="job-date">{formatDate(job.applied_date)}</span>
            <button className="delete-btn" onClick={handleDelete}>
              🗑️
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}