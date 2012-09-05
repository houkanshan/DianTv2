from django.conf.urls import patterns, include, url
from piston.resource import Resource
from storys.handlers import StorysHandler, StoryHandler

storys_resourse = Resource(handler=StorysHandler)
story_resourse = Resource(handler=StoryHandler)


urlpatterns = patterns('',
        url(r'^storys/?$', storys_resourse),
        url(r'^story/?$', story_resourse),
        #url(r'^/(?P<emitter_format>.+)/$', storys),
        #url(r'^$'),
)
