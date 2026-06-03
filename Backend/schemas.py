from pydantic import BaseModel, Field


class TodoCreate(BaseModel):

    title: str = Field(..., min_length=1)
    user_id: int


class TodoUpdate(BaseModel):

    title: str = Field(..., min_length=1)
    completed: bool


class TodoResponse(BaseModel):

    id: int
    title: str
    completed: bool

    class Config:

        from_attributes = True


class PaginatedTodos(BaseModel):
    todos: list[TodoResponse]
    total_count: int
    current_page: int
    total_pages: int
    page_size: int

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

