from flask_classful import FlaskView, route

class LoginView(FlaskView):
    route_base="/mama/"

    @route('/name/')
    def mumname(self):
        return "soos"