import os
import json
import nltk
from flask import Flask, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer

# Ensure NLTK finds the packaged vader_lexicon.zip in the sentiment folder
microservice_dir = os.path.dirname(os.path.abspath(__file__))
nltk.data.path.append(microservice_dir)

app = Flask("Sentiment Analyzer")

sia = SentimentIntensityAnalyzer()


@app.get('/')
def home():
    return "Welcome to the Sentiment Analyzer. Use /analyze/text to get the sentiment"


@app.get('/analyze/<input_txt>')
def analyze_sentiment(input_txt):
    scores = sia.polarity_scores(input_txt)
    print(scores)
    pos = float(scores['pos'])
    neg = float(scores['neg'])
    neu = float(scores['neu'])
    res = "positive"
    print("pos neg neu ", pos, neg, neu)
    if neg > pos and neg > neu:
        res = "negative"
    elif neu > neg and neu > pos:
        res = "neutral"
    print(res)
    return jsonify({"sentiment": res})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(host="0.0.0.0", port=port, debug=True)

