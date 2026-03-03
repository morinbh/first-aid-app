from flask import Flask, jsonify
from flask_cors import CORS

from .data import SYMPTOMS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.get("/health")
def health() -> tuple[dict, int]:
  return {"status": "ok"}, 200


@app.get("/api/protocols")
def get_protocols() -> tuple[dict, int]:
  return jsonify(SYMPTOMS), 200


@app.get("/api/protocols/<path:key>")
def get_protocol(key: str):
  protocol = SYMPTOMS.get(key)
  if protocol is None:
    return jsonify({"error": "Not found"}), 404
  return jsonify(protocol), 200


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)

