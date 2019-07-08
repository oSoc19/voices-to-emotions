from flask import Flask, Response, request

app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['POST'])
def catch_all(path):
  if request.method == 'POST':
    f = request.files['audio']
    f.save('/tmp/audio.wav')

    return Response("File uploaded", mimetype='text/html')

  else:
    return Response("Unknown request", mimetype='text/html')
