from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from pydantic import BaseModel
from typing import List, Optional

# ----------------- DB 설정 -----------------
DATABASE_URL = "sqlite:///./todos.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ----------------- DB 모델 -----------------
class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    completed = Column(Boolean, default=False)
    date = Column(String, index=True)

# ----------------- Pydantic 스키마 -----------------
class TodoBase(BaseModel):
    text: str
    completed: bool = False
    date: str

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None
    date: Optional[str] = None

class TodoResponse(TodoBase):
    id: int
    class Config:
        orm_mode = True

# 테이블 생성
Base.metadata.create_all(bind=engine)

# ----------------- FastAPI 앱 설정 -----------------
app = FastAPI(title="Todo API")

# CORS 미들웨어 설정 (Next.js 로컬 접속 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB 의존성 주입
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------- API 엔드포인트 -----------------
@app.get("/todos", response_model=List[TodoResponse])
def get_todos(
    filter: Optional[str] = Query(None, description="상태 필터: active 또는 completed"),
    search: Optional[str] = Query(None, description="키워드 검색"),
    db: Session = Depends(get_db)
):
    query = db.query(Todo)
    
    # 1. 상태 필터 적용
    if filter == "active":
        query = query.filter(Todo.completed == False)
    elif filter == "completed":
        query = query.filter(Todo.completed == True)
        
    # 2. 키워드 검색 적용
    if search:
        query = query.filter(Todo.text.contains(search))
        
    return query.all()

@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo_update: TodoUpdate, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    update_data = todo_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
        
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
        
    db.delete(db_todo)
    db.commit()
    return {"ok": True}
