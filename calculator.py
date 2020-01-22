import requests
import json
import http.server
import socketserver
import webbrowser

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    webbrowser.open("http://localhost:8080/index.html")
    httpd.serve_forever()

# session = requests.session()

# print(json.loads(session.get("https://api.opendota.com/api/matches/5202117012").text)["chat"])
# response = execute_js('flow.js')
# print(response)
