import tensorflow as tf


def normaliseFloat(n):
  return round(n * 10000) / 10000


def predict_emotions(mfcc_data):
  with tf.gfile.FastGFile('model/emotions.pb', 'rb') as f:
    graph_def = tf.GraphDef()
    graph_def.ParseFromString(f.read())
    _ = tf.import_graph_def(graph_def, name='')

  with tf.Session() as sess:
    input_tensor = sess.graph.get_tensor_by_name('FullyConnected/Softmax:0')
    results = sess.run(input_tensor, {
      'InputData/X:0': mfcc_data
    })

    mapped_results = []
    for p in results:
      mapped_results.append({
        'neutral': normaliseFloat(p[0]),
        'calm': normaliseFloat(p[1]),
        'happy': normaliseFloat(p[2]),
        'sad': normaliseFloat(p[3]),
        'angry': normaliseFloat(p[4]),
        'fearful': normaliseFloat(p[5]),
        'disgust': normaliseFloat(p[6]),
        'surprised': normaliseFloat(p[7])
      })

    return mapped_results
