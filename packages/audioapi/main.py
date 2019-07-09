from flask import Flask, Response, request
from werkzeug.utils import secure_filename
import librosa, os, math, tempfile, json, gc, base64
import numpy as np

app = Flask(__name__)

ALLOWED_EXTENSIONS = ['aiff', 'wav']
temp_dir = tempfile.gettempdir()
mfcc_features = 20


def base64jsonify(data):
  data = json.dumps(data, separators=(',', ':'))
  return Response(base64.b64encode(data.encode('utf-8')), mimetype='text/plain')


@app.route('/', methods=['POST'])
def upload():
  try:
    if request.method == 'POST':
      f = request.files['audio']

      if f and f.filename:
        filename = secure_filename(f.filename)
        extname = filename.rsplit('.', 1)[1].lower()
        target_path = os.path.join(temp_dir, 'temp.' + extname)
        f.save(target_path)
        f.close()

        # Cleanup memory
        del f
        gc.collect()

        if extname in ALLOWED_EXTENSIONS:
          wave, sr = librosa.load(target_path, sr=16000, mono=True, res_type='kaiser_fast')
          wave_frag_offsets = librosa.effects.split(wave, top_db=35)

          results = []
          for offsets in wave_frag_offsets:
            wave_fragment = wave[offsets[0]:offsets[1]]
            mfcc = librosa.feature.mfcc(wave_fragment, sr, n_mfcc=mfcc_features)
            _, y_size = mfcc.shape

            splitted_mfcc = np.array_split(mfcc, math.ceil(y_size / 500), axis=1)

            for short_mfcc in splitted_mfcc:
              short_mfcc = np.pad(short_mfcc, ((0, 0), (0, 500 - len(short_mfcc[0]))), mode='constant',
                                  constant_values=0)
              results.append(np.array(short_mfcc).tolist())

          return base64jsonify({
            "type": 'success',
            "data": results
          })
        else:
          return base64jsonify({
            "type": 'error',
            "message": "Invalid filetype"
          })
      else:
        return base64jsonify({
          "type": 'error',
          "message": "Please provide a file"
        })



    else:
      return base64jsonify({
        "type": 'error',
        "message": "Unknown request"
      })
  except:
    return base64jsonify({
      "type": 'error',
      "message": "Unknown error"
    })


# This is only used locally Google Cloud has some magic for this :)
if __name__ == '__main__':
  app.run(host='127.0.0.1', port=8080, debug=True)
