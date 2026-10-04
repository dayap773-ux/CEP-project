from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

infrastructure = [
    {
        "id": 1,
        "name": "Roads",
        "icon": "🛣️",
        "condition": 75
    },
    {
        "id": 2,
        "name": "Water Supply",
        "icon": "🚰",
        "condition": 60
    },
    {
        "id": 3,
        "name": "Street Lights",
        "icon": "💡",
        "condition": 85
    },
    {
        "id": 4,
        "name": "Waste Management",
        "icon": "🗑️",
        "condition": 65
    },
    {
        "id": 5,
        "name": "Drainage",
        "icon": "🌧️",
        "condition": 45
    },
    {
        "id": 6,
        "name": "Public Toilets",
        "icon": "🚽",
        "condition": 70
    }
]

issues = []


@app.route("/")
def home():
    return jsonify({
        "message": "CivicMap Backend is running 🚀"
    })


@app.route("/api/infrastructure", methods=["GET"])
def get_infrastructure():
    return jsonify(infrastructure)


@app.route("/api/issues", methods=["GET"])
def get_issues():
    return jsonify(issues)


@app.route("/api/issues", methods=["POST"])
def create_issue():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    issue = {
        "id": len(issues) + 1,
        "name": data.get("name"),
        "issue": data.get("issue"),
        "location": data.get("location"),
        "description": data.get("description"),
        "status": "Pending"
    }

    issues.append(issue)

    return jsonify({
        "success": True,
        "message": "Issue submitted successfully",
        "issue": issue
    }), 201


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )