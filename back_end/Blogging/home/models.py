
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Users(AbstractUser):
    user_image = models.ImageField(upload_to='Userimages',null=True,blank=True)
    last_ip = models.CharField(max_length = 20,blank=True,null=True)
    date_created = models.DateTimeField(default = timezone.now)
    date_updated= models.DateTimeField(default = timezone.now)
    # @property
    # def is_authenticated(self):
    #     """
    #     Always return True. This is a way to tell if the user has been
    #     authenticated in templates.
    #     """
    #     return True
    
    def save(self,*args,**kwargs):
        self.date_updated = timezone.now()
        super(Users,self).save(*args,**kwargs)
    

class Posts(models.Model):
    CHOICES = [
        ("Draft", "Draft"),
        ("Scheduled", "Scheduled"),
        ('Publish',"Publish")
    ]

    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users,related_name = "Users",on_delete=models.CASCADE)
    post_image = models.ImageField(upload_to='Postimages',null=True,blank=True)
    title = models.CharField(max_length=70)
    subtitle = models.CharField(max_length=70,blank=True,null=True)
    text = models.TextField(null=True,blank=True)
    status = models.CharField(max_length = 10,choices=CHOICES, default="Publish")
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    date_created = models.DateTimeField(default = timezone.now)
    date_updated= models.DateTimeField(default = timezone.now)
    def save(self,*args,**kwargs):
        self.date_updated = timezone.now()
        super(Posts,self).save(*args,**kwargs)
    def increase_view(self):
        self.views+=1
        self.save()
    def increase_like(self):
        self.likes+=1
        self.save()
    
class Comments(models.Model):
    user_id=models.ForeignKey(Users,on_delete=models.CASCADE)
    post_id=models.ForeignKey(Posts,on_delete=models.CASCADE)
    comment=models.TextField(max_length=250)
    date_created=models.DateTimeField(default=timezone.now)
    date_updated= models.DateTimeField(default = timezone.now)
    def save(self, *args, **kwargs):
        self.date_updated = timezone.now()
        super().save(*args, **kwargs)


class Collections(models.Model):
    collection_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE)
    Collection_image = models.ImageField(upload_to='Collectionimages',null=True,blank=True)
    collection_title = models.CharField(max_length=70)
    subtitle = models.CharField(max_length=70,blank=True,null=True)
    collection_url = models.SlugField(max_length = 60 , blank=True,null=True)
    followers = models.IntegerField(default=0)

class Posts_collection(models.Model):
    collection_id = models.ForeignKey(Collections ,on_delete=models.CASCADE)
    post_id = models.ManyToManyField(Posts)

class Users_followers(models.Model):
    user_id = models.ForeignKey(Users,related_name="follow_user",on_delete=models.CASCADE)
    follower_id = models.ManyToManyField(Users)

class Bookmarks(models.Model):
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts,on_delete=models.CASCADE)

class Users_collections(models.Model): 
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE)
    collection_id = models.ManyToManyField(Collections)

class Analytics(models.Model):
    post_id = models.OneToOneField(Posts,on_delete=models.CASCADE)
    date_viewed = models.DateTimeField(default = timezone.now)


# ## Medium.com Schema

# A schema for a blogging platform like Medium.com.

# ### Table: posts

# **post_id**: (Integer), Primary ID that preferably auto increments (if supported in chosen DB)

# **user_id**: (Integer), ID of the user who authored this post

# **image_path**: (String), Path to image on the server for the post

# **title**: (String), Title of the post

# **subtitle**: (String), Subtitle of the post

# **text**: (Text), Ideally a longtext field for blog contents

# **status**: (String), Values: published, draft, scheduled. Default value: draft

# **views**: (Integer), Number of views (Indexed Field)

# **date_created**: (Unix Timestamp or DateTime), When was this post created?

# **date_updated**: (Unix Timestamp or DateTime), Last time this post was updated?

# ### Table: collections

# **collection_id**: (Integer), Primary ID that preferably auto increments (if supported in chosen DB)

# **user_id**: (Integer), ID of the user who started this collection

# **image_path**: (String), Path to image on the server for the collection

# **name**: (String), Name of the collection

# **subtitle**: (String), Subtitle displayed on collection landing page

# **slug**: (String), Lowercased hyphenated version of the name for URL's

# **followers**: (Integer), Number of follows watching this collection

# ### Table: posts_collections

# A table for holding posts assigned to a particular collection

# **collection_id**: (Integer), ID of the collection this post belongs to (Indexed field)

# **post_id**: (Integer), ID of the post (Indexed field)

# ### Table: users_users

# **user_id**: (Integer), ID of the user (Indexed field)

# **follow_user_id**: (Integer), ID of the user to follow (Indexed field)

# ### Table: bookmarks

# **bookmark_id**: ((Integer), Primary ID that preferably auto increments (if supported in chosen DB)

# **user_id**: (Integer), ID of the user (Indexed field)

# **post_id**: (Integer), ID of the post (Indexed field)

# ### Table: users

# **user_id**: (Integer), Primary ID that preferably auto increments (if supported in chosen DB)

# **username**: (String), Username (Unique Index)

# **email**: (String), Email address (Unique Index)

# **salted_password**: (String), Salted password digest

# **first_name**: (String), First name of user

# **last_name**: (String), Last name of user

# **last_ip**: (String), Last known user IP address

# **date_created**: (Unix Timestamp or DateTime), When did this user sign up?

# **date_updated**: (Unix Timestamp or DateTime), Last time this user was updated?

# ### Table: analytics

# A table for storing post analytics which can be used for trending data. Recommendations are used for trending data as well.

# **post_id**: (Integer), ID of the post (Indexed field)

# **date_created**: (Unix Timestamp or DateTime), When was this post viewed?

# ### Table: users_collections

# A table for users following particular collections

# **collection_id**: (Integer), ID of the collection (Indexed field)

# **user_id**: (Integer), ID of the user (Indexed field)

# ### Table: recommendations

# Whenever a user recommends an article.

# **user_id**: (Integer), ID of the user (Indexed field)

# **post_id**: (Integer), ID of the post (Indexed field)

# **date_created**: (Unix Timestamp or DateTime), When was this post recommended?




    

    

