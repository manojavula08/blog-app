from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "sqlite:///./blog.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
sessionLocal = sessionmaker(autoflush= False, autocommit=False, bind= engine)

def get_db():
    try:
        db = sessionLocal()
        yield db
    finally:
        db.close()

Base = declarative_base()