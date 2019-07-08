from http.server import BaseHTTPRequestHandler

# TODO: Add librosa code, unfortunately we can't add the library as a dependency
# TODO: due to size constraints

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.end_headers()
    self.wfile.write('{ "type": "success", "data": "Python Endpoint", message }')
    return
