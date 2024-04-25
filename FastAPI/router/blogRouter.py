import sys
import statistics
sys.path.append("...")
from schemas.blogPath import Blog, Blog_model
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
import models
from database import get_db
from .userRouter import get_current_user
router = APIRouter(tags=["BlogData"], prefix='/blog')
@router.get("/getAll-blogs/", response_model= list[Blog])
def read_all_blog(db: session = Depends(get_db), 
                current_user: models.User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=404, detail="Unauthorized")
    blog_data = db.query(models.Blog).filter(models.Blog.owner_id == current_user.id).all()
    return blog_data

@router.get("/write-blog/{blog_id}", response_model=Blog_model)
def getBlogById(blog_id: int, db: session = Depends(get_db),
                current_user: models.User = Depends(get_current_user)):
    blogData = db.query(models.Blog).filter(current_user.id == models.Blog.id).filter(models.Blog.id == blog_id).first()
    if blogData:
        return blogData
    else:
        raise HTTPException(status_code=505, detail="requested item not Found")

@router.post("/write-blog/", response_model= Blog_model)
def write_blog(blog: Blog_model, db: session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    
    db_content = models.Blog()
    db_content.title = blog.title
    db_content.description = blog.description
    db_content.datetime = blog.datetime
    db_content.owner_id = current_user.id
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

@router.put("/edit-blog/{blog_id}", response_model=Blog)
def update_blog(blog: Blog, blog_id: int, db: session = Depends(get_db),
                current_user: models.User = Depends(get_current_user)):
    updateBlogData = db.query(models.Blog).filter(current_user.id == models.Blog.id).filter(models.Blog.id == blog_id).first()
    if updateBlogData is None:
        raise HTTPException(status_code=statistics.HTTP_404_NOT_FOUND, detail="Blog not found")

    for key, value in blog.dict().items():
        setattr(updateBlogData, key, value)
        
    db.commit()
    db.refresh(updateBlogData)
    return updateBlogData

@router.delete("/delete/{blog_id}", response_model=Blog)
def delete_blog(blog_id: int, db: session = Depends(get_db), 
                current_user: models.User = Depends(get_current_user)):
    db.query(models.Blog).filter(current_user.id == models.Blog.id).filter(models.Blog.id == blog_id).delete()
    db.commit()
    return {"message": "Blog deleted successfully"}