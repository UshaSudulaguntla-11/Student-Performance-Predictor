"""
Train the Linear Regression model on ALL 19 features from StudentPerformanceFactors.csv
and save the model + label encoders for deployment.
"""
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import json

# 1. Load data
df = pd.read_csv("StudentPerformanceFactors.csv")

# 2. Handle missing values
df.fillna(df.mean(numeric_only=True), inplace=True)
for col in df.select_dtypes(include='object'):
    df[col] = df[col].fillna(df[col].mode()[0])

# 3. Encode categorical features using sorted alphabetical mapping (consistent & reproducible)
categorical_cols = df.select_dtypes(include='object').columns.tolist()
categorical_mappings = {}

for col in categorical_cols:
    unique_vals = sorted(df[col].unique().tolist())
    mapping = {val: idx for idx, val in enumerate(unique_vals)}
    categorical_mappings[col] = mapping
    df[col] = df[col].map(mapping)

# 4. Separate features and target
feature_order = [col for col in df.columns if col != "Exam_Score"]
X = df[feature_order]
y = df["Exam_Score"]

# 5. Evaluate on test split first
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
lr_eval = LinearRegression()
lr_eval.fit(X_train, y_train)
pred = lr_eval.predict(X_test)
mae = mean_absolute_error(y_test, pred)
r2 = r2_score(y_test, pred)
print(f"Test Evaluation -> MAE: {mae:.4f}, R²: {r2:.4f}")

# 6. Train final model on FULL dataset for deployment
model = LinearRegression()
model.fit(X, y)

# 7. Save model and metadata
joblib.dump(model, "student_model.pkl")

metadata = {
    "feature_order": feature_order,
    "categorical_mappings": categorical_mappings,
    "numerical_features": [col for col in feature_order if col not in categorical_cols],
    "categorical_features": categorical_cols,
    "metrics": {"mae": round(mae, 4), "r2": round(r2, 4)}
}
with open("model_metadata.json", "w") as f:
    json.dump(metadata, f, indent=2)

print(f"\nModel trained on ALL {len(feature_order)} features and saved to student_model.pkl")
print(f"Metadata saved to model_metadata.json")
print(f"Feature order: {feature_order}")
print(f"Categorical features: {categorical_cols}")
print(f"Numerical features: {metadata['numerical_features']}")
