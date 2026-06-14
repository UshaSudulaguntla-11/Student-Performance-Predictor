# 🎓 EduPulse — Student Exam Score Predictor

A full-stack **ML-powered web application** that predicts student exam scores based on 19 performance factors. Built with **Flask**, **scikit-learn**, and a premium **glassmorphic dark-mode UI**.

---

## 🚀 Features

- **19 Input Features** — Academic habits, health & lifestyle, environment & family factors
- **Real-time Predictions** — Instant exam score prediction via a trained Linear Regression model
- **Animated Score Gauge** — SVG-based circular gauge with smooth animations
- **Grade Assessment** — Automatic A/B/C/D grading with contextual feedback
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Premium UI** — Dark glassmorphism theme with micro-animations

---

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| **Algorithm** | Linear Regression |
| **R² Score** | 68.88% |
| **MAE** | ±1.02 points |
| **Dataset** | 6,608 student records |
| **Features** | 6 numerical + 13 categorical |

---

## 🗂️ Project Structure

```
Student-Performance-Predictor/
│
├── app.py                    # Flask backend (API + server)
├── train_save_model.py       # Training script (generates .pkl + metadata)
├── student_model.pkl         # Trained model (joblib)
├── model_metadata.json       # Feature order + categorical mappings
├── StudentPerformanceFactors.csv  # Raw dataset
├── requirements.txt          # Python dependencies
├── README.md                 # This file
│
├── templates/
│   └── index.html            # Frontend HTML (Jinja2 template)
│
└── static/
    ├── style.css             # Premium dark-mode CSS
    └── script.js             # Frontend logic (fetch API, gauge, animations)
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Student-Performance-Predictor.git
cd Student-Performance-Predictor
```

### 2. Create Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the Model (if `.pkl` not present)

```bash
python train_save_model.py
```

This generates `student_model.pkl` and `model_metadata.json`.

### 5. Run the App

```bash
python app.py
```

Open your browser and navigate to: **http://localhost:5000**

---

## 📡 API Reference

### `POST /predict`

**Request Body** (JSON):

```json
{
  "Hours_Studied": 25,
  "Attendance": 85,
  "Sleep_Hours": 7,
  "Previous_Scores": 78,
  "Tutoring_Sessions": 2,
  "Physical_Activity": 3,
  "Parental_Involvement": "High",
  "Access_to_Resources": "Medium",
  "Extracurricular_Activities": "Yes",
  "Motivation_Level": "High",
  "Internet_Access": "Yes",
  "Family_Income": "Medium",
  "Teacher_Quality": "High",
  "School_Type": "Public",
  "Peer_Influence": "Positive",
  "Learning_Disabilities": "No",
  "Parental_Education_Level": "College",
  "Distance_from_Home": "Near",
  "Gender": "Male"
}
```

**Response** (JSON):

```json
{
  "predicted_score": 72.45,
  "status": "success"
}
```

---

## 🧠 Feature Details

### Numerical Features (6)
| Feature | Range | Description |
|---------|-------|-------------|
| Hours_Studied | 1–44 | Weekly study hours |
| Attendance | 60–100 | Attendance rate (%) |
| Sleep_Hours | 4–10 | Daily sleep hours |
| Previous_Scores | 50–100 | Previous exam scores |
| Tutoring_Sessions | 0–8 | Monthly tutoring sessions |
| Physical_Activity | 0–6 | Weekly physical activity hours |

### Categorical Features (13)
| Feature | Options |
|---------|---------|
| Parental_Involvement | High, Medium, Low |
| Access_to_Resources | High, Medium, Low |
| Extracurricular_Activities | Yes, No |
| Motivation_Level | High, Medium, Low |
| Internet_Access | Yes, No |
| Family_Income | High, Medium, Low |
| Teacher_Quality | High, Medium, Low |
| School_Type | Public, Private |
| Peer_Influence | Positive, Neutral, Negative |
| Learning_Disabilities | Yes, No |
| Parental_Education_Level | High School, College, Postgraduate |
| Distance_from_Home | Near, Moderate, Far |
| Gender | Male, Female |

---

## 🚀 Tech Stack

### 🧠 Machine Learning
- **Python** 🐍 — Core programming language
- **Scikit-learn** — Linear Regression / Random Forest
- **Pandas** — Data handling & preprocessing
- **NumPy** — Numerical computations
- **Joblib** — Model saving / loading

### 🌐 Backend (API Layer)
- **Flask** — Python web framework
- **Flask-CORS** — Connect frontend + backend seamlessly

### 🎨 Frontend
- **HTML5** — Page structure & semantic markup
- **CSS3** — Glassmorphic dark-mode styling with animations
- **JavaScript** — API integration + dynamic UI (fetch, gauge, animations)
- **Google Fonts** — Inter & Outfit typography

### 📊 Data Processing & Visualization
- **Pandas** — Data wrangling & analysis
- **Matplotlib** — Exploratory data analysis (EDA)
- **Seaborn** — Correlation heatmaps & statistical plots

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Dataset: Student Performance Factors (Kaggle)
- Built as an end-to-end ML deployment project

---

> Made with ❤️ by **Usha Chowdary**
