from server import app

@app.route("/")
def index():
    return "Hello world"

@app.route("/about")
def about():
    return "All about Flask"

@app.route("/file", methods=['GET', 'POST'])
def index1():
    pass
    # if request.method == "POST":
    #     name = request.form["name"]
    #     return name + " Hello"
    # return send_file("index.html")
