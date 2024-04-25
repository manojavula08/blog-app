import sys
sys.path.append('...')
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from database import get_db
from sqlalchemy.orm import Session
from schemas.auth import Create_user, User, login_, Users_models
import models
import datetime
from passlib.hash import bcrypt

SECRET_KEY = "manoj"
ALGORITHM = "HS256"
EXPIRE_TIME_DELTA = 15

router = APIRouter(tags=['User'], prefix='/auth')
oauthSchema = OAuth2PasswordBearer(tokenUrl='/auth/token')

def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return dict(access_token = encoded_jwt, token_type= 'bearer')

def authenticate_user( username: str, password: str,fake_db: Session = Depends(get_db)):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not bcrypt.verify(password, user.hashedPassword):
        return False
    return user

@router.post('/login', response_model= Users_models)
def login(formData: login_, db: Session = Depends(get_db)):
    user = authenticate_user(username=formData.userName, password=formData.password, fake_db= db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def get_user(db, username: str):
    p = db.query(models.User).filter(models.User.userName == username).first()
    print(p)
    return p

@router.post("/register-form", response_model=User)
def register(
    user_form: Create_user,
    db: Session = Depends(get_db)
):
    hashed_password = bcrypt.hash(user_form.password)
    print(hashed_password)
    user_data = models.User(
        firstName=user_form.firstName,
        lastName=user_form.lastName,
        email=user_form.email,
        userName=user_form.userName,
        hashedPassword=hashed_password
    )
    db.add(user_data)
    db.commit()
    db.refresh(user_data)
    return user_data

@router.post("/token")
async def login_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f'userId: {form_data.username}, Password: {form_data.password}')
    user = authenticate_user( form_data.username, form_data.password, db)
    print(f'userId: {form_data.username}, Password: {form_data.password} check1')
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    print(f'userId: {form_data.username}, Password: {form_data.password} check2')
    access_token = create_access_token(
        data={"id": user.id}, expires_delta=datetime.timedelta(minutes=EXPIRE_TIME_DELTA)
    )
    
    print(f'{access_token}:------check3')
    return access_token

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauthSchema)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(models.User).get(payload['id'])
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

