from django.conf.urls import patterns, include, url
from piston.resource import Resource
from storys.handlers import StorysHandler, StoryHandler
from piston.utils import rc

storys_resourse = Resource(handler=StorysHandler)
story_resourse = Resource(handler=StoryHandler)


urlpatterns = patterns('',
        url(r'^storys/?$', storys_resourse),
        url(r'^story/(?P<id>[^/?]+)/?$', story_resourse),
        #url(r'^story/?$', rc.BAD_REQUEST),
        #url(r'^/(?P<emitter_format>.+)/$', storys),
        #url(r'^$'),
)
