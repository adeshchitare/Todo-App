from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models
import schemas


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@app.post("/todos")
def create_todo(
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db)
):

    newTodo = models.Todo(
        title=todo.title
    )

    db.add(newTodo)

    db.commit()

    db.refresh(newTodo)

    return newTodo



@app.get("/todos")
def get_todos(
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db)
):

    skip = (page - 1) * limit

    todos = db.query(
    models.Todo
).order_by(models.Todo.id.asc()).offset(skip).limit(limit).all()

    return todos



@app.put("/todos/{id}")
def update_todo(
    id: int,
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db)
):

    item = db.query(
        models.Todo
    ).filter(
        models.Todo.id == id
    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    item.title = todo.title

    db.commit()

    return item



@app.patch("/todos/{id}/complete")
def complete_todo(
    id: int,
    db: Session = Depends(get_db)
):
    item = db.query(
        models.Todo
    ).filter(
        models.Todo.id == id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    item.completed = True

    db.commit()
    db.refresh(item)

    return item

@app.put("/todos/{id}")
def update_todo(
    id:int,
    todo:schemas.TodoCreate,
    db:Session=Depends(get_db)
):

    item=db.query(
        models.Todo
    ).filter(
        models.Todo.id==id
    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    item.title=todo.title

    db.commit()

    db.refresh(item)

    return item

@app.delete("/todos/{id}")
def delete_todo(
    id: int,
    db: Session = Depends(get_db)
):

    item = db.query(
        models.Todo
    ).filter(
        models.Todo.id == id
    ).first()

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    db.delete(item)

    db.commit()

    return {
        "message":"Deleted"
    }