from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Posts,Analytics

@receiver(post_save, sender=Posts)
def create_analytics_instance(sender, instance, created, **kwargs):
    if created:
        Analytics.objects.create(post_id = instance)