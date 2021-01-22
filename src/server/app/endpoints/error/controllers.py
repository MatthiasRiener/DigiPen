from flask import render_template


def pagenotfound(e):
    return render_template('./error/error-page.html')
