"""
Flask Backend for Student Performance Predictor
Serves the frontend and provides a /predict API endpoint using all 19 features.
"""
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Load model and metadata at startup
try:
    model = joblib.load("student_model.pkl")
    with open("model_metadata.json", "r") as f:
        metadata = json.load(f)
    FEATURE_ORDER = metadata["feature_order"]
    CATEGORICAL_MAPPINGS = metadata["categorical_mappings"]
    NUMERICAL_FEATURES = metadata["numerical_features"]
    CATEGORICAL_FEATURES = metadata["categorical_features"]
    print(f"Model loaded successfully! Using {len(FEATURE_ORDER)} features.")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")


@app.route('/')
def home():
    """Serve the main frontend page."""
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict exam score from student performance factors.
    Accepts JSON with all 19 features (6 numerical + 13 categorical).
    Categorical values are passed as strings (e.g. "High", "Yes") and encoded server-side.
    """
    if model is None:
        return jsonify({"error": "Model is not loaded on the server."}), 500

    try:
        data = request.get_json(force=True)

        # Validate all features are present
        missing = [f for f in FEATURE_ORDER if f not in data]
        if missing:
            return jsonify({"error": f"Missing features: {', '.join(missing)}"}), 400

        # Build feature vector in the correct order
        features = []
        for feature in FEATURE_ORDER:
            value = data[feature]

            if feature in CATEGORICAL_FEATURES:
                # Encode categorical value using the saved mapping
                mapping = CATEGORICAL_MAPPINGS.get(feature, {})
                if str(value) not in mapping:
                    valid_options = list(mapping.keys())
                    return jsonify({
                        "error": f"Invalid value '{value}' for '{feature}'. Valid options: {valid_options}"
                    }), 400
                features.append(mapping[str(value)])
            else:
                # Numerical feature — convert to float
                try:
                    features.append(float(value))
                except (ValueError, TypeError):
                    return jsonify({"error": f"'{feature}' must be a number. Got: '{value}'"}), 400

        # Predict
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)[0]
        final_score = max(0.0, min(100.0, float(prediction)))

        return jsonify({
            "predicted_score": round(final_score, 2),
            "status": "success"
        })

    except Exception as err:
        return jsonify({"error": f"Prediction failed: {str(err)}"}), 500


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    app.run(host="0.0.0.0", port=port, debug=False)
