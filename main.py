from fastapi import FastAPI, Depends
from routers import tasks, ai_assistant
from sqlalchemy.orm import Session
from db import SessionLocal, Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include routers
app.include_router(tasks.router)
app.include_router(ai_assistant.router)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
