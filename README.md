# 🎓 EduPulse — Student Performance Prediction System

<p align="center">
  <img src="https://img.shields.io/badge/ML-Linear%20Regression-blue" alt="ML - Linear Regression">
  <img src="https://img.shields.io/badge/Backend-Flask-green" alt="Backend - Flask">
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange" alt="Frontend - HTML/CSS/JS">
  <img src="https://img.shields.io/badge/Deployment-HuggingFace-yellow" alt="Deployment - HuggingFace">
</p>

---

## 🚀 Overview

**EduPulse** is an end-to-end Machine Learning web application that predicts a student's final exam score based on academic, behavioral, and environmental factors.

It combines:
- Machine Learning model training  
- Flask backend API  
- Interactive frontend UI  
- Deployment-ready architecture  

---

## Deployed Link
https://student-performance-predictor-production-812b.up.railway.app/

---

## 🎯 Problem Statement

Student performance depends on multiple real-world factors:

- Study habits  
- Attendance  
- Sleep patterns  
- Motivation level  
- Previous academic performance  

Traditional evaluation systems cannot quantify these relationships effectively.

👉 EduPulse solves this using Machine Learning.

---

## ✨ Features

- 📊 Real-time exam score prediction  
- 🎯 19 intelligent input features  
- 🧠 Machine Learning powered system  
- 📈 Automatic grade classification (A / B / C / D)  
- 🌐 Web-based interactive interface  
- 📱 Fully responsive design  
- ⚡ Fast Flask API response  

---

## 🧠 Machine Learning Model

| Parameter | Value |
|----------|------|
| Algorithm | Linear Regression |
| Dataset | 6,608 records |
| Features | 19 |
| R² Score | 0.6888 |
| MAE | 1.02 |

---

## 🔍 Model Comparison

| Model | R² Score | MAE | Result |
|------|----------|-----|--------|
| Linear Regression | 0.68 | 1.02 | Baseline |
| Decision Tree | 0.72 | 0.89 | Overfitting risk |
| Random Forest | **0.84** | **0.62** | Best performance |

### 🏆 Final Decision

Although multiple models were evaluated, **Linear Regression was selected for deployment** due to:

- Fast inference speed  
- Stable predictions  
- Lightweight deployment  
- Good generalization on dataset  

---

## 📌 Key Insights

- Attendance is the strongest predictor of performance  
- Study hours strongly impact final scores  
- Simple models work surprisingly well for structured educational data  

---

## 🧰 Tech Stack

### 🧠 Machine Learning
- Python  
- Scikit-learn  
- Pandas  
- NumPy  
- Joblib  

### ⚙️ Backend
- Flask  
- Flask-CORS  

### 🎨 Frontend
- HTML5  
- CSS3  
- JavaScript  

### ☁️ Deployment
- Hugging Face Spaces  
- Docker  

---

## 📁 Project Structure

```text
EduPulse/
│
├── main.py
├── student_model.pkl
├── train_model.py
├── requirements.txt
├── Dockerfile
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── StudentPerformanceFactors.csv
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 2️⃣ Run the application
```bash
python main.py
```

### 3️⃣ Open in browser
```text
http://127.0.0.1:5000
```

---

## 📡 API Reference

### `POST /predict`

**Request:**
```json
{
  "Hours_Studied": 25,
  "Attendance": 85,
  "Sleep_Hours": 7,
  "Previous_Scores": 78
}
```

**Response:**
```json
{
  "predicted_score": 72.45
}
```

---

## 🚀 Applications

- 🎓 Student performance prediction systems
- 📊 Academic analytics dashboards
- ⚠️ Early warning systems for weak students
- 🤖 AI-based learning recommendation systems

---

## 🔮 Future Improvements

- Upgrade to XGBoost / LightGBM
- Improve feature engineering pipeline
- Add analytics dashboard
- Deploy scalable cloud API
- Integrate AI chatbot assistant

---

## 👨‍💻 Author

**Usha Chowdary**  
AI/ML Enthusiast | Python Developer | Full Stack ML Developer
