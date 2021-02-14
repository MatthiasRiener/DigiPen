
class TaskRepositoryInstance():    
    def __init__(self):
        from .TaskRepository import TaskRepository
        self.repo = TaskRepository(testing=False)

class PresentationRepositoryInstace():
    def __init__(self):
        from .PresentationRepository import PresentationRepository
        self.repo = PresentationRepository(testing=False)


class CanvasRepositoryInstance():
    def __init__(self):
        from .CanvasRepository import CanvasRepository
        self.repo = CanvasRepository(testing=False)


class AuthenticationRepositoryInstance():
    def __init__(self):
        from .AuthenticationRepository import AuthenticationRepository
        self.repo = AuthenticationRepository(testing=False)
    