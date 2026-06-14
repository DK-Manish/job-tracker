from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# --- Auth ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Job Applications ---
class JobCreate(BaseModel):
    company: str
    role: str
    status: Optional[str] = "Wishlist"
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None

class JobUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None

class JobOut(BaseModel):
    id: int
    company: str
    role: str
    status: str
    notes: Optional[str]
    applied_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True