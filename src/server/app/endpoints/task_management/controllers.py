from flask import Flask, Blueprint, render_template, abort, g, request


task_m = Blueprint("task_management", __name__,
                    static_folder="static", template_folder="templates")



@task_m.route('/', methods=["GET"])
def index():
    return render_template('/task_management/index.html')