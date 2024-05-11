from django.contrib import admin
from .models import *
# Register your models here.\
from django.contrib import admin
from .models import Users

class UsersAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'email', 'date_created']  # Customize displayed fields
    search_fields = ['username', 'email']  # Add fields for search

admin.site.register(Users, UsersAdmin)
admin.site.register(Posts)
admin.site.register(Collections)
admin.site.register(Posts_collection)
admin.site.register(Users_followers)
admin.site.register(Bookmarks)
admin.site.register(Users_collections)
admin.site.register(Analytics)
admin.site.register(Comments)
# admin.site.register(Users_following)