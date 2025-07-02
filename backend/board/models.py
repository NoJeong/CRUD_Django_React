from django.db import models

class Post(models.Model):
    title   = models.CharField(max_length=200)
    content = models.TextField()
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
