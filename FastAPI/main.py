from fastapi import FastAPI
from FastAPI.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from FastAPI.router import blogRouter, userRouter

app = FastAPI()

# importing the CORSMiddleware for the connecting with frontEND
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials = True
)



# db_dependences = Annotated(session, Depends(get_db))

# @app.get("/")
# async def redirect():
#     return RedirectResponse(url='/getAll_blog/')

app.include_router(blogRouter.router)
app.include_router(userRouter.router)

Base.metadata.create_all(bind=engine)
