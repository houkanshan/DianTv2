from piston.handler import BaseHandler
from piston.utils import rc, require_mime, require_extended

from storys.models import Story, News

import re
import time
import pdb


class StorysHandler(BaseHandler):
    """ get Storys """
    allowd_methods = ('GET', 'POST', )

    model = Story
    storys = Story.objects

    fields = ('id', 'title', 'author', 'text', 'img_url',
            'img_horizontal', 'img_veritcal', 'create_on')
    def read(self, request):
        '''
        get storys from start to start+count-1
        Sample: GET /api/storys/?start=0&count=2
        '''
        GET = self.flatten_dict(request.GET)
        start = 0
        count = 10
        if (('start' in GET) and (GET['start'] != '')):
            start = int(GET['start'])
            print 'find start', start
        if (('count' in GET) and (GET['count'] != '')):
            count = int(GET['count'])
            print 'find count', count

        if count != 0:
            return self.storys.order_by('create_on')[ start : (start + count)]
        else:
            return self.storys.order_by('create_on')[start:]

    def create(self, request):
        '''
        create a story
        Sample: POST /api/storys/
        {
            title: 'xxx',
            author: 'houks',
            text: 'aaaaaaaa',
            img_url: 'www.a.com/a.png', //optional
            img_horizontal: 'l',        //optional
            img_veritcal: 't'           //optional
            }
        }
        '''

        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)
        #pdb.set_trace();

        if ('title' not in POST) or \
                ('author' not in POST) or \
                ('text' not in POST):
            return rc.BAD_REQUEST

        title = POST['title']
        author = POST['author']
        text = POST['text']

        new_story = Story(title=title, author=author, text=text)

        if 'img_url' in POST:
            new_story.img_url = POST['img_url']
            if 'img_vertical' in POST:
                new_story.img_horizontal = POST['img_veritcal']
            if 'img_horizontal' in POST:
                new_story.img_horizontal = POST['img_horizontal']

        new_story.save()

        return new_story

    def delete(self, request):
        '''
        delete storys
        Current fobidden
        '''
        print "get delete"
        GET = self.flatten_dict(request.GET)

        return rc.FORBIDDEN

    def update(self, request):
        '''
        put storys
        Current fobidden
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

class StoryHandler(BaseHandler):
    """ get Story """
    allowd_methods = ('GET', 'DELETE', 'PUT', )

    model = Story
    storys = Story.objects

    fields = ('id', 'title', 'author', 'text', 'img_url',
            'img_horizontal', 'img_veritcal', 'create_on')

    def read(self, request, id):
        '''
        read a story from id
        Sample: GET /api/story/1/
        '''
        GET = self.flatten_dict(request.GET)
        #if(!id):
            #return rc.BAD_REQUEST

        try:
            got_story = self.storys.get(id=id)
        except:
            return rc.NOT_FOUND

        return got_story

    def create(self, request, id):
        '''
        post storys,
        Current fobidden
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

    def delete(self, request, id):
        '''
        delete by id
        Sample: DELETE /api/story/1/
        '''
        GET = self.flatten_dict(request.GET)

        try:
            to_del = self.storys.get(id=id)
            to_del.delete()
            return rc.DELETED
        except:
            return rc.NOT_FOUND

    def update(self, request, id):
        '''
        update by id
        Sample: PUT /api/story/1/
        {
            title: 'xxx',
            author: 'houks',
            text: 'aaaaaaaa',
            img_url: 'www.a.com/a.png', //optional
            img_horizontal: 'l',        //optional
            img_veritcal: 't'           //optional
        }
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        try:
            update_story = self.storys.get(id=id)
        except:
            return rc.NOT_FOUND


        try:
            update_story.title = POST['title']
            update_story.author = POST['author']
            update_story.text = POST['text']

            if 'img_url' in POST:
                update_story.img_url = POST['img_url']
                if 'img_vertical' in POST:
                    update_story.img_horizontal = POST['img_veritcal']
                if 'img_horizontal' in POST:
                    update_story.img_horizontal = POST['img_horizontal']
        except:
            return rc.BAD_REQUEST

        update_story.save()

        return update_story




# news
class NewsHandler(BaseHandler):
    """ get News """
    allowd_methods = ('GET', 'POST', )

    model = News
    news = News.objects

    fields = ('id', 'title', 'author', 'text', 'img_url',
            'img_horizontal', 'img_veritcal', 'create_on')

    def read(self, request):
        '''
        get news from start to start+count-1
        Sample: GET /api/news/?start=0&count=2
        '''
        GET = self.flatten_dict(request.GET)
        start = 0
        count = 10
        if (('start' in GET) and (GET['start'] != '')):
            start = int(GET['start'])
            print 'find start', start
        if (('count' in GET) and (GET['count'] != '')):
            count = int(GET['count'])
            print 'find count', count

        if count != 0:
            return self.news.order_by('create_on')[ start : (start + count)]
        else:
            return self.news.order_by('create_on')[start:]

    def create(self, request):
        '''
        create a news
        Sample: POST /api/news/
        {
            title: 'xxx',
            author: 'houks',
            text: 'aaaaaaaa',
            img_url: 'www.a.com/a.png', //optional
            img_horizontal: 'l',        //optional
            img_veritcal: 't'           //optional
            }
        }
        '''

        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)
        #pdb.set_trace();

        if ('title' not in POST) or \
                ('author' not in POST) or \
                ('text' not in POST):
            return rc.BAD_REQUEST

        title = POST['title']
        author = POST['author']
        text = POST['text']

        new_news = News(title=title, author=author, text=text)

        if 'img_url' in POST:
            new_news.img_url = POST['img_url']
            if 'img_vertical' in POST:
                new_news.img_horizontal = POST['img_veritcal']
            if 'img_horizontal' in POST:
                new_nes.img_horizontal = POST['img_horizontal']

        new_news.save()

        return new_news

    def delete(self, request):
        '''
        delete news
        Current fobidden
        '''
        print "get delete"
        GET = self.flatten_dict(request.GET)

        return rc.FORBIDDEN

    def update(self, request):
        '''
        put news
        Current fobidden
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

class NewHandler(BaseHandler):
    """ get New"""
    allowd_methods = ('GET', 'DELETE', 'PUT', )

    model = News
    news = News.objects

    fields = ('id', 'title', 'author', 'text', 'img_url',
            'img_horizontal', 'img_veritcal', 'create_on')

    def read(self, request, id):
        '''
        read a new from id
        Sample: GET /api/new/1/
        '''
        GET = self.flatten_dict(request.GET)
        #if(!id):
            #return rc.BAD_REQUEST

        try:
            got_new = self.news.get(id=id)
        except:
            return rc.NOT_FOUND

        return got_new

    def create(self, request, id):
        '''
        post news,
        Current fobidden
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

    def delete(self, request, id):
        '''
        delete by id
        Sample: DELETE /api/new/1/
        '''
        GET = self.flatten_dict(request.GET)

        try:
            to_del = self.news.get(id=id)
            to_del.delete()
            return rc.DELETED
        except:
            return rc.NOT_FOUND

    def update(self, request, id):
        '''
        update by id
        Sample: PUT /api/new/1/
        {
            title: 'xxx',
            author: 'houks',
            text: 'aaaaaaaa',
            img_url: 'www.a.com/a.png', //optional
            img_horizontal: 'l',        //optional
            img_veritcal: 't'           //optional
        }
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        try:
            update_new = self.news.get(id=id)
        except:
            return rc.NOT_FOUND


        try:
            update_new.title = POST['title']
            update_new.author = POST['author']
            update_new.text = POST['text']

            if 'img_url' in POST:
                update_new.img_url = POST['img_url']
                if 'img_vertical' in POST:
                    update_new.img_horizontal = POST['img_veritcal']
                if 'img_horizontal' in POST:
                    update_new.img_horizontal = POST['img_horizontal']
        except:
            return rc.BAD_REQUEST

        update_new.save()

        return update_new

