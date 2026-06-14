from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas
from ..auth.jwt_handler import get_current_user

router = APIRouter(prefix="/jobs", tags=["Jobs"])

VALID_STATUSES = {"Wishlist", "Applied", "Interview", "Offer", "Rejected"}

@router.get("/", response_model=List[schemas.JobOut])
def get_all_jobs(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(models.JobApplication).filter(
        models.JobApplication.user_id == current_user.id
    ).all()

@router.post("/", response_model=schemas.JobOut, status_code=201)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if job.status and job.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Choose from: {VALID_STATUSES}")
    new_job = models.JobApplication(**job.model_dump(), user_id=current_user.id)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.patch("/{job_id}", response_model=schemas.JobOut)
def update_job(job_id: int, updates: schemas.JobUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    job = db.query(models.JobApplication).filter(
        models.JobApplication.id == job_id,
        models.JobApplication.user_id == current_user.id
    ).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if updates.status and updates.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status.")
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job

@router.delete("/{job_id}", status_code=204)
def delete_job(job_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    job = db.query(models.JobApplication).filter(
        models.JobApplication.id == job_id,
        models.JobApplication.user_id == current_user.id
    ).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()