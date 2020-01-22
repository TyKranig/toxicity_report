import requests
import sys
import json
from Naked.toolshed.shell import execute_js, muterun_js


session = requests.session()

print(json.loads(session.get("https://api.opendota.com/api/matches/5202117012").text)["chat"])
response = execute_js('flow.js')
print(response)