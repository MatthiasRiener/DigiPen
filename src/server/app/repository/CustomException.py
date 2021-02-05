
class CustomException():
    def __init__(self, message):
        self.message = message

    def __str__(self):
        print(self.message)
        return self.message