from django.db import models
import datetime


# position of img in content
VERITCAL = (
        ('t', 'top'),
        ('b', 'bottom'),
)

HORIZONTAL = (
        ('l', 'left'),
        ('c', 'center'),
        ('r', 'right'),
)


# an abstract class of Article
class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=30)
    #create_on = models.DateTimeField(default=(datetime.datetime.now()+datetime.timedelta(hours=8)))
    #create_on = models.DateTimeField(default=(datetime.datetime.now()))
    create_on = models.DateTimeField(auto_now=True);
    text = models.TextField()
    img_url = models.URLField(max_length=255, blank=True)
    img_veritcal = models.CharField(max_length=1, choices=VERITCAL, blank=True)
    img_horizontal = models.CharField(max_length=1, choices=HORIZONTAL, blank=True)

    def __unicode__(self):
        return self.title

    class Meta:
        abstract = True

# for user edit
class Story(Article):
    def __unicode__(self):
        return self.title

# for admin post
class News(Article):
    def __unicode__(self):
        return self.title

