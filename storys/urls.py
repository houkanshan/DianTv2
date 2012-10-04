from django.conf.urls import patterns, include, url
from piston.resource import Resource
from storys.handlers import StorysHandler, StoryHandler, NewsHandler, NewHandler
from piston.utils import rc
from cors_resource import CORSResource

storys_resource = CORSResource(handler=StorysHandler)
story_resource = CORSResource(handler=StoryHandler)

news_resource = CORSResource(handler=NewsHandler)
new_resource = CORSResource(handler=NewHandler)


urlpatterns = patterns('',
        url(r'^storys/?$', storys_resource),
        url(r'^story/(?P<id>[^/?]+)/?$', story_resource),
        url(r'^news/?$', news_resource),
        url(r'^new/(?P<id>[^/?]+)/?$', new_resource),
        #url(r'^story/?$', rc.BAD_REQUEST),
        #url(r'^/(?P<emitter_format>.+)/$', storys),
        #url(r'^$'),
)
