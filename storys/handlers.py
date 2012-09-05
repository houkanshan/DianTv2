from piston.handler import BaseHandler
from piston.utils import rc, require_mime, require_extended

from storys.models import Story

import re
import time
import pdb


class StorysHandler(BaseHandler):
    """ get Storys """
    model = Story
    storys = Story.objects

    #attr to included, really do not know how to exclude
    #fields = ('id', 'author', 'create_on', 'title',
            #('content',
                #('img_veritcal', 'img_horizontal', 'img_url', 'text', 'id')))

    def read(self, request):
    #def read(self, request):
        '''
        get storys from index to index+limit-1
        '''
        GET = self.flatten_dict(request.GET)
        index = 0
        limit = 10
        if (('index' in GET) and (GET['index'] != '')): index = int(GET['index'])
        if (('limit' in GET) and (GET['limit'] != '')): limit = int(GET['limit'])

        if limit != 0:
            return self.storys.order_by('create_on')[index:limit]
        else:
            return self.storys.order_by('create_on')[index:]

    def create(self, request):
        '''
        post storys, no use
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

    def delete(self, request):
        '''
        delete storys, can't do this
        '''
        print "get delete"
        GET = self.flatten_dict(request.GET)

        return rc.FORBIDDEN

    def update(self, request):
        '''
        put storys, can't do this
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        return rc.FORBIDDEN

class StoryHandler(BaseHandler):
    def read(self, request):
        '''
        '''
        GET = self.flatten_dict(request.GET)
        if('id' not in GET):
            return rc.BAD_REQUEST

        try:
            id = GET['id']
        except:
            return rc.NOT_FOUND

        return self.storys.get(id=id)

    def create(self, request):
        '''
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        if ('title' not in POST) or \
                ('author' not in POST) or \
                ('content' not in POST) or \
                ('text' not in POST['content']):
            return rc.BAD_REQUEST

        title = POST['title']
        author = POST['author']
        text = POST['content']['text']

        new_story = Story(title=title, author=author, text=text)

        if 'img_url' in POST['content']:
            new_story.img_url = POST['content']['img_url']
            if 'img_vertical' in POST['content']:
                new_story.img_horizontal = POST['content']['img_veritcal']
            if 'img_horizontal' in POST['content']:
                new_story.img_horizontal = POST['content']['img_horizontal']

        new_story.save()

        return new_story

    def delete(self, request):
        '''
        by id
        '''
        GET = self.flatten_dict(request.GET)
        if('id' not in GET):
            return rc.NOT_FOUND

        try:
            id = GET['id']
            toDel = self.storys.get(id=id)
            toDel.delete()
            return rc.DELETED
        except:
            return rc.BAD_REQUEST

    def update(self, request):
        '''
        '''
        GET = self.flatten_dict(request.GET)
        POST = self.flatten_dict(request.POST)

        try:
            id = GET['id']
            update = GET['update']
            update_story = this.storys.get(id=id)
        except:
            return rc.NOT_FOUND


        try:
            update_story.title = POST['title']
            update_story.author = POST['author']
            update_story.text = POST['content']['text']

            if 'img_url' in POST['content']:
                update_story.img_url = POST['content']['img_url']
                if 'img_vertical' in POST['content']:
                    update_story.img_horizontal = POST['content']['img_veritcal']
                if 'img_horizontal' in POST['content']:
                    update_story.img_horizontal = POST['content']['img_horizontal']
        except:
            return rc.BAD_REQUEST

        update_story.save()

        return update_story

