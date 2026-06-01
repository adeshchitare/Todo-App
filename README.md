# Todo CRUD App

A full-stack Todo application built using ReactJS and FastAPI.

## Features
- Add Todo
- Edit Todo
- Delete Todo
- Mark Todo as Complete
- Pagination
- Form validation

## Technologies Used

Frontend:
- ReactJS
- Axios
- CSS

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL

## APIs Used
- GET /todos
- POST /todos
- PUT /todos/{id}
- DELETE /todos/{id}
- PATCH /todos/{id}/complete

## How to Run

Frontend:
bash
npm start


Backend:

bash
uvicorn main:app --reload
