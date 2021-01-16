from flask_classful import FlaskView, route


class QuotesView(FlaskView):
    route_base="/zitate/"

    quotes = [
    "Mama mia",
    "What the ",
    "lets go XD"
]


    @route('/all/')
    def index(self):
        return "<br>".join(self.quotes)