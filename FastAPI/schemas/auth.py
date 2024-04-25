from pydantic import BaseModel

class Users_models(BaseModel):
    firstName: str
    lastName: str
    email: str
    userName: str
    
    class Config:
        from_attributes = True

class Create_user(Users_models):
    password: str

    class Config:
        from_attributes = True

class User(Users_models):
    id: int

    class Config:
        from_attributes = True

class login_(BaseModel):
    userName: str
    password: str

    class Config:
        from_attributes = True
