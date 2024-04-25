from pydantic import BaseModel


class Blog_model(BaseModel):
    title: str
    description: str
    datetime: str
    
class  Blog(Blog_model):
    id: int
    owner_id: int
    class Config:
        orm_mode = True
