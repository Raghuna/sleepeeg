from flask import Flask
from predict import predict
from flask import request,jsonify
from flask_cors import CORS, cross_origin
import os
import shutil
import numpy as np
import json

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)



import json
app = Flask(__name__)
CORS(app)


globalpredictions = []
@app.route('/', methods=['POST'])
def hello():
    data = request.form
    files = request.files
    # print(data)
    if not os.path.exists('./uploads'):
        os.mkdir('./uploads')

    UPLOAD_FOLDER = './uploads' + '/' + data['dataset']
    if os.path.exists(UPLOAD_FOLDER):
        shutil.rmtree(UPLOAD_FOLDER)
    os.mkdir(UPLOAD_FOLDER)
    
    keys = list(files.keys())

    for key in keys:
        file_object = request.files[key]
        file_object.save(os.path.join(UPLOAD_FOLDER, key+'.npz'))

    # iterate over the list of files from the request.files object and save each file individually to the upload folder with different names



    dataset = data['dataset']
    n_folds = int(data['n_folds'])
    n_subjects = int(data['n_subjects'])
    print(dataset, n_folds, n_subjects)

    predictions = predict(
        config_file="config/sleepedf.py",
        model_dir="out_sleepedf/train",
        output_dir="out_sleepedf/predict",
        log_file="out_sleepedf/predict.log",
        use_best=True,
        dataset=dataset,
        n_folds=n_folds,
        n_subjects=n_subjects
    )
    global globalpredictions
    globalpredictions = predictions

    # return json object predictions to the react client side
    return json.dumps(predictions, cls=NpEncoder)

@app.route('/getResult', methods=['GET'])
def test():
    return json.dumps({'test': globalpredictions}, cls=NpEncoder)

if __name__ == '__main__':
    app.run(port=5000)


CORS(app)