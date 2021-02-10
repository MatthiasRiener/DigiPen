from ..models.Canvas import Canvas

class CanvasRepository():
    def __init__(self, testing):
        self.testing = testing
    
    def createCanvas(self, p_id):
        Canvas(p_id=p_id).save()
        print("Canvas created... :D")

    def deleteAll(self):
        if self.testing:
            Canvas.objects().delete()
            return 'All canvases deleted...'
        else:
            return 'You do not have the permission to do that.'