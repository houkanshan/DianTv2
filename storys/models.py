from django.db import models

# Create your models here.

TYPE_CHOICES = (
        ('lt', 'left-top'),
        ('lb', 'left-bottom'),
        ('rt', 'right-top'),
        ('rb', 'right-bottom'),
)

class Content(models.Model):
    text = models.TextField()
    img_type = models.CharField(max_length=2, choices=TYPE_CHOICES)
    img_url = models.URLField(max_length=255)

    def __unicode__(self):
        return self.text


class Storys(models.Model):


    title = models.CharField(max_length=255)
    author = models.CharField(max_length=30)
    create_on = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=2, choices=TYPE_CHOICES)
    content = models.ForeignKey(Content)

    def __unicode__(self):
        return self.title


