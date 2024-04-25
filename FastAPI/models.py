from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index= True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    userName = Column(String)
    hashedPassword = Column(String)
    blogs = relationship('Blog', back_populates="user")


class Blog(Base):
    __tablename__ = "blog"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    datetime = Column(String)
    user = relationship('User', back_populates='blogs')
    owner_id = Column(Integer, ForeignKey('users.id'))