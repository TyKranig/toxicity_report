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