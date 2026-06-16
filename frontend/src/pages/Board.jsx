import { useState, useEffect } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Navbar from '../components/Navbar'
import KanbanColumn from '../components/KanbanColumn'
import JobModal from '../components/JobModal'
import { getJobs, createJob, updateJob } from '../api/axios'

const COLUMNS = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function Board() {
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await getJobs()
      setJobs(res.data)
    } catch (err) {
      console.error('Failed to fetch jobs', err)
    }
  }

  const getJobsByStatus = (status) =>
    jobs.filter((job) => job.status === status)

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    const jobId = parseInt(draggableId)
    const newStatus = destination.droppableId

    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    )

    try {
      await updateJob(jobId, { status: newStatus })
    } catch (err) {
      console.error('Failed to update job status', err)
      fetchJobs()
    }
  }

  const handleCardClick = (job) => {
    setSelectedJob(job)
    setShowModal(true)
  }

  const handleAddNew = () => {
    setSelectedJob(null)
    setShowModal(true)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedJob?.id) {
        const res = await updateJob(selectedJob.id, formData)
        setJobs((prev) =>
          prev.map((j) => (j.id === selectedJob.id ? res.data : j))
        )
      } else {
        const res = await createJob(formData)
        setJobs((prev) => [...prev, res.data])
      }
      setShowModal(false)
    } catch (err) {
      console.error('Failed to save job', err)
    }
  }

  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
  }

  // Stats
  const total = jobs.length
  const interviews = getJobsByStatus('Interview').length
  const offers = getJobsByStatus('Offer').length
  const rejected = getJobsByStatus('Rejected').length

  return (
    <>
      <Navbar />
      <div className="board-container">
        <div className="board-header">
          <h2>My Applications</h2>
          <button className="add-job-btn" onClick={handleAddNew}>
            + Add Job
          </button>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-number">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#f59e0b' }}>{interviews}</div>
            <div className="stat-label">Interviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#10b981' }}>{offers}</div>
            <div className="stat-label">Offers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#ef4444' }}>{rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-board">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col}
                column={col}
                jobs={getJobsByStatus(col)}
                onDelete={handleDelete}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {showModal && (
        <JobModal
          job={selectedJob}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  )
}