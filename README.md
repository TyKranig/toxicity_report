# Toxicity_Report
A tool to calculate the most toxic players in Chill Dota League, created because I thought it would be interesting to find out the most toxic players in the league

This uses a tensor flow [library](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

I used python here to stand up a simple webserver so that I could axios request some data from opendota

## Files
* flow.js
    * This grabs chat data from open dota, passes that data to tensor flow, then outputs to the page
* index.html
    * includes the above javascript, displays data
* server.py
    * hosts the server locally

## Packages
[Tensor Flow Toxicity Library](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)
Requests
webbrowser
axios

## Running
To run the project first run `<npm install>`
Then to install python packages run `<pip install -r requirements.txt>`
To start the server run `<python calculator.py>`
