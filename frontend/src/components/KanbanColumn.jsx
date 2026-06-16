import { Droppable } from '@hello-pangea/dnd'
import JobCard from './JobCard'

export default function KanbanColumn({ column, jobs, onDelete, onCardClick }) {
  const colorClass = {
    Wishlist: 'col-wishlist',
    Applied: 'col-applied',
    Interview: 'col-interview',
    Offer: 'col-offer',
    Rejected: 'col-rejected',
  }[column]

  return (
    <div className={`kanban-column ${colorClass}`}>
      <div className="column-header">
        <span className="column-title">{column}</span>
        <span className="column-count">{jobs.length}</span>
      </div>

      <Droppable droppableId={column}>
        {(provided) => (
          <div
            className="column-drop-zone"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onDelete={onDelete}
                onClick={onCardClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}