from flask import render_template, redirect, url_for
from app import app


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/fractalTree")
def fractalTree():
    return render_template("fractalTree.html")


@app.route("/background")
def background():
    return render_template("background.html")


@app.route("/snake")
def snake():
    return render_template("snakeDivs.html")
