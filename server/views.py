from flask import jsonify, make_response, redirect, render_template, request, flash
from werkzeug.utils import secure_filename
from server import app
import os


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        # if 'file' not in request.files:
        #     print("ERROR: No file part")
        #     return redirect(request.url)
        print(request.form)
        file=""
        # file = request.form['file']
        print("File uploaded")
        print(file)
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        # if file:
        # filename = secure_filename(file.filename)
        # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        res = make_response(jsonify({"message": "File uploaded successfully"}),200)
        return res
    return render_template('index.html')

@app.route("/about")
def about():
    return "All about Flask"



