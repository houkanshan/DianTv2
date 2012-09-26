from django.conf.urls import patterns, include, url
from piston.resource import Resource
from storys.handlers import StorysHandler, StoryHandler, NewsHandler, NewHandler
from piston.utils import rc

storys_resource = Resource(handler=StorysHandler)
story_resource = Resource(handler=StoryHandler)

news_resource = Resource(handler=NewsHandler)
new_resource = Resource(handler=NewHandler)


urlpatterns = patterns('',
        url(r'^storys/?$', storys_resource),
        url(r'^story/(?P<id>[^/?]+)/?$', story_resource),
        url(r'^news/?$', news_resource),
        url(r'^new/(?P<id>[^/?]+)/?$', new_resource),
        #url(r'^story/?$', rc.BAD_REQUEST),
        #url(r'^/(?P<emitter_format>.+)/$', storys),
        #url(r'^$'),
)
