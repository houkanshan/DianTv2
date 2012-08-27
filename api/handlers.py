from piston.handler import BaseHandler
from piston.utils import rc, require_mime, require_extended

from storys.models import Storys

class StoryHandler(BaseHandler):
    """
    get Story
    """
    model = Storys

    #@classmethod
    #def content_length(cls, ):

    def read(self, request, index=0, limit=10):
        storys = Storys.objects

        if limit != 0:
            return storys.order_by('create_on')[index:limit].get()
        else:
            return storys.order_by('create_on')[index:].get()

    def create(self, request, title, author, type, text, img, imgType):
        """
        create a new story
        """





