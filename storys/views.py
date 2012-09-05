from django.conf import settings
#from djangorestframework.reverse import reverse
#from djangorestframework.views import View
#from djangorestframework.response import Response
#from djangorestframework import status
from django.http import HttpResponseRedirect, HttpResponse

from storys.models import Storys
# Create your views here.

class StorysHandler():
    '''
    Story api
    '''

    def get(self, request):
        '''
        read
        '''
        #return {'msg': 'get done'}
        return HttpResponse("get done")

    def post(self, request):
        '''
        create
        '''
        return {'msg': 'create done'}

    def put(self, request):
        '''
        update
        '''
        return {'msg': 'update done'}

    def delete(self, request):
        '''
        delete
        '''
        return {'msg': 'delete done'}


