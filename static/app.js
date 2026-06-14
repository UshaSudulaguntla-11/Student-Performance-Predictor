// Model Configuration — coefficients, mappings, and stats from train_model.py
const MODEL_CONFIG = {
    intercept: 40.13036112465204,
    coefficients: {
        Hours_Studied: 0.28862557627106245,
        Attendance: 0.19781501902728663,
        Parental_Involvement: -0.44696860137389754,
        Access_to_Resources: -0.40443570133870127,
        Extracurricular_Activities: 0.5690811531788046,
        Sleep_Hours: -0.029158158247076214,
        Previous_Scores: 0.04812340241984812,
        Motivation_Level: -0.1545322728962785,
        Internet_Access: 0.9677633816661573,
        Tutoring_Sessions: 0.5023799965109284,
        Family_Income: -0.16662277013172488,
        Teacher_Quality: -0.23758709918471402,
        School_Type: -0.033380671298890094,
        Peer_Influence: 0.5325652748668006,
        Physical_Activity: 0.1725830033682435,
        Learning_Disabilities: -0.8746076537066424,
        Parental_Education_Level: 0.1778757248173487,
        Distance_from_Home: 0.46713165039134497,
        Gender: -0.01877933760105528
    },
    // Alphabetical label encoding (matches train_model.py exactly)
    categoricalMappings: {
        Parental_Involvement:     { High: 0, Low: 1, Medium: 2 },
        Access_to_Resources:      { High: 0, Low: 1, Medium: 2 },
        Extracurricular_Activities:{ No: 0, Yes: 1 },
        Motivation_Level:         { High: 0, Low: 1, Medium: 2 },
        Internet_Access:          { No: 0, Yes: 1 },
        Family_Income:            { High: 0, Low: 1, Medium: 2 },
        Teacher_Quality:          { High: 0, Low: 1, Medium: 2 },
        School_Type:              { Private: 0, Public: 1 },
        Peer_Influence:           { Negative: 0, Neutral: 1, Positive: 2 },
        Learning_Disabilities:    { No: 0, Yes: 1 },
        Parental_Education_Level: { College: 0, "High School": 1, Postgraduate: 2 },
        Distance_from_Home:       { Far: 0, Moderate: 1, Near: 2 },
        Gender:                   { Female: 0, Male: 1 }
    },
    featureImportances: {
        Attendance: 38.01, Hours_Studied: 24.23, Previous_Scores: 9.16,
        Tutoring_Sessions: 3.53, Sleep_Hours: 3.00, Physical_Activity: 2.84,
        Access_to_Resources: 2.79, Parental_Involvement: 2.75, Peer_Influence: 1.89,
        Family_Income: 1.84, Distance_from_Home: 1.73, Parental_Education_Level: 1.65,
        Motivation_Level: 1.31, Teacher_Quality: 1.23, Learning_Disabilities: 0.93,
        Extracurricular_Activities: 0.91, School_Type: 0.86, Gender: 0.74, Internet_Access: 0.60
    },
    correlations: {
        Attendance: 0.581, Hours_Studied: 0.445, Previous_Scores: 0.175,
        Tutoring_Sessions: 0.157, Peer_Influence: 0.100, Distance_from_Home: 0.089,
        Extracurricular_Activities: 0.064, Internet_Access: 0.051, Parental_Education_Level: 0.045,
        Physical_Activity: 0.028, Gender: -0.002, School_Type: -0.009,
        Motivation_Level: -0.015, Sleep_Hours: -0.017, Family_Income: -0.026,
        Teacher_Quality: -0.061, Learning_Disabilities: -0.085,
        Access_to_Resources: -0.091, Parental_Involvement: -0.094
    }
};

// Presets — keys use exact HTML element IDs to avoid mapping errors
const STUDENT_PRESETS = {
    overachiever: {
        "input-hours": 32, "input-attendance": 98, "input-prev-score": 92, "input-tutoring": 3,
        "input-parental-involvement": "High", "input-resources": "High",
        "input-motivation": "High", "input-peer": "Positive", "input-income": "High",
        "input-teacher": "High", "input-school": "Private", "input-distance": "Near",
        "input-sleep": 8, "input-physical": 4,
        "input-extracurricular": "Yes", "input-disability": "No",
        "input-internet": "Yes", "input-parental-edu": "Postgraduate", "input-gender": "Female"
    },
    average: {
        "input-hours": 20, "input-attendance": 80, "input-prev-score": 75, "input-tutoring": 1,
        "input-parental-involvement": "Medium", "input-resources": "Medium",
        "input-motivation": "Medium", "input-peer": "Neutral", "input-income": "Medium",
        "input-teacher": "Medium", "input-school": "Public", "input-distance": "Near",
        "input-sleep": 7, "input-physical": 3,
        "input-extracurricular": "Yes", "input-disability": "No",
        "input-internet": "Yes", "input-parental-edu": "College", "input-gender": "Male"
    },
    struggling: {
        "input-hours": 12, "input-attendance": 75, "input-prev-score": 58, "input-tutoring": 2,
        "input-parental-involvement": "Medium", "input-resources": "Low",
        "input-motivation": "High", "input-peer": "Neutral", "input-income": "Low",
        "input-teacher": "Medium", "input-school": "Public", "input-distance": "Moderate",
        "input-sleep": 6, "input-physical": 2,
        "input-extracurricular": "No", "input-disability": "Yes",
        "input-internet": "Yes", "input-parental-edu": "High School", "input-gender": "Male"
    },
    absentee: {
        "input-hours": 8, "input-attendance": 62, "input-prev-score": 60, "input-tutoring": 0,
        "input-parental-involvement": "Low", "input-resources": "Medium",
        "input-motivation": "Low", "input-peer": "Negative", "input-income": "Low",
        "input-teacher": "Low", "input-school": "Public", "input-distance": "Far",
        "input-sleep": 5, "input-physical": 1,
        "input-extracurricular": "No", "input-disability": "No",
        "input-internet": "No", "input-parental-edu": "High School", "input-gender": "Female"
    }
};

// In-memory profile storage (works everywhere, no localStorage dependency)
let savedProfiles = [];
let chartsInitialized = false;
let currentCharts = {};

// ─── Bootstrap ───────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    setupTabs();
    setupAccordions();
    setupInputBubbleListeners();
    setupPresets();
    setupPredictorTriggers();
    initProfiles();
    setupRegistryActions();
    evaluateStudent();
});

// ─── Tab Switching (fixed) ────────────────────────────────────────────────────
function setupTabs() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => switchTab(btn.getAttribute("data-tab")));
    });
}

function switchTab(tabId) {
    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    // Content panels
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    const panel = document.getElementById(`tab-${tabId}`);
    if (panel) panel.classList.add("active");

    // Lazy-init charts
    if (tabId === "insights" && !chartsInitialized) initializeCharts();
}

// ─── Accordions ──────────────────────────────────────────────────────────────
function setupAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const item = trigger.parentElement;
            item.classList.toggle("expanded");
        });
    });
}

// ─── Slider value bubbles ─────────────────────────────────────────────────────
function setupInputBubbleListeners() {
    const sliders = [
        { id: "input-hours",       valId: "val-hours",      suffix: " hrs" },
        { id: "input-attendance",  valId: "val-attendance", suffix: "%" },
        { id: "input-prev-score",  valId: "val-prev-score", suffix: " / 100" },
        { id: "input-tutoring",    valId: "val-tutoring",   suffix: " session", plural: "s" },
        { id: "input-sleep",       valId: "val-sleep",      suffix: " hrs" },
        { id: "input-physical",    valId: "val-physical",   suffix: " hrs" }
    ];
    sliders.forEach(({ id, valId, suffix, plural }) => {
        const inputEl = document.getElementById(id);
        const valEl   = document.getElementById(valId);
        if (!inputEl || !valEl) return;
        inputEl.addEventListener("input", e => {
            let text = e.target.value + suffix;
            if (plural && e.target.value !== "1") text += plural;
            valEl.textContent = text;
        });
    });
}

// ─── Presets (fixed: IDs match HTML directly, no underscore conversion) ───────
function setupPresets() {
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyPreset(btn.getAttribute("data-preset"));
        });
    });
}

function applyPreset(presetKey) {
    const preset = STUDENT_PRESETS[presetKey];
    if (!preset) return;
    for (const [id, val] of Object.entries(preset)) {
        const el = document.getElementById(id);
        if (el) {
            el.value = val;
            el.dispatchEvent(new Event("input"));
        }
    }
    const labels = { overachiever: "Honor Student", average: "Average Performer",
                     struggling: "Struggling but Motivated", absentee: "High Risk (Absentee)" };
    showToast(`Loaded: ${labels[presetKey] || presetKey}`, "info");
    evaluateStudent();
}

// ─── Live predictor triggers ──────────────────────────────────────────────────
function setupPredictorTriggers() {
    document.querySelectorAll(".custom-slider, .custom-select").forEach(el => {
        el.addEventListener("change", () => {
            document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
            evaluateStudent();
        });
        el.addEventListener("input", () => evaluateStudent());
    });
}

// ─── Core evaluation ──────────────────────────────────────────────────────────
async function evaluateStudent() {
    const inputs = getSimulatorInputs();
    const prediction = await calculateScore(inputs);
    updateGauge(prediction);
    updateAssessment(prediction, inputs);
    updateWhatIfAnalysis(inputs);
    updateRecommendations(inputs);
}

function getSimulatorInputs() {
    return {
        Hours_Studied:             parseFloat(document.getElementById("input-hours").value),
        Attendance:                parseFloat(document.getElementById("input-attendance").value),
        Sleep_Hours:               parseFloat(document.getElementById("input-sleep").value),
        Previous_Scores:           parseFloat(document.getElementById("input-prev-score").value),
        Tutoring_Sessions:         parseFloat(document.getElementById("input-tutoring").value),
        Physical_Activity:         parseFloat(document.getElementById("input-physical").value),
        Parental_Involvement:      document.getElementById("input-parental-involvement").value,
        Access_to_Resources:       document.getElementById("input-resources").value,
        Motivation_Level:          document.getElementById("input-motivation").value,
        Peer_Influence:            document.getElementById("input-peer").value,
        Family_Income:             document.getElementById("input-income").value,
        Teacher_Quality:           document.getElementById("input-teacher").value,
        School_Type:               document.getElementById("input-school").value,
        Distance_from_Home:        document.getElementById("input-distance").value,
        Extracurricular_Activities:document.getElementById("input-extracurricular").value,
        Learning_Disabilities:     document.getElementById("input-disability").value,
        Internet_Access:           document.getElementById("input-internet").value,
        Parental_Education_Level:  document.getElementById("input-parental-edu").value,
        Gender:                    document.getElementById("input-gender").value
    };
}

// ─── ML Inference — calls Flask /predict API endpoint ─────────────────────────
async function calculateScore(inputs) {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        });
        const result = await response.json();
        if (response.ok && result.status === 'success') {
            return Math.max(0, Math.min(100, result.predicted_score));
        } else {
            console.error('API Error:', result.error);
            // Fallback to client-side calculation
            return calculateScoreLocal(inputs);
        }
    } catch (err) {
        console.error('Fetch failed, using local fallback:', err);
        return calculateScoreLocal(inputs);
    }
}

// ─── Local fallback (client-side) in case Flask API is unreachable ─────────────
function calculateScoreLocal(inputs) {
    const C = MODEL_CONFIG.coefficients;
    const M = MODEL_CONFIG.categoricalMappings;
    let score = MODEL_CONFIG.intercept;

    score += inputs.Hours_Studied    * C.Hours_Studied;
    score += inputs.Attendance       * C.Attendance;
    score += inputs.Sleep_Hours      * C.Sleep_Hours;
    score += inputs.Previous_Scores  * C.Previous_Scores;
    score += inputs.Tutoring_Sessions* C.Tutoring_Sessions;
    score += inputs.Physical_Activity* C.Physical_Activity;

    score += M.Parental_Involvement[inputs.Parental_Involvement]         * C.Parental_Involvement;
    score += M.Access_to_Resources[inputs.Access_to_Resources]           * C.Access_to_Resources;
    score += M.Extracurricular_Activities[inputs.Extracurricular_Activities] * C.Extracurricular_Activities;
    score += M.Motivation_Level[inputs.Motivation_Level]                 * C.Motivation_Level;
    score += M.Internet_Access[inputs.Internet_Access]                   * C.Internet_Access;
    score += M.Family_Income[inputs.Family_Income]                       * C.Family_Income;
    score += M.Teacher_Quality[inputs.Teacher_Quality]                   * C.Teacher_Quality;
    score += M.School_Type[inputs.School_Type]                           * C.School_Type;
    score += M.Peer_Influence[inputs.Peer_Influence]                     * C.Peer_Influence;
    score += M.Learning_Disabilities[inputs.Learning_Disabilities]       * C.Learning_Disabilities;
    score += M.Parental_Education_Level[inputs.Parental_Education_Level] * C.Parental_Education_Level;
    score += M.Distance_from_Home[inputs.Distance_from_Home]             * C.Distance_from_Home;
    score += M.Gender[inputs.Gender]                                     * C.Gender;

    return Math.max(0, Math.min(100, score));
}

// ─── Gauge (r=70 → perimeter = 2π×70 = 439.823) ─────────────────────────────
function updateGauge(score) {
    const valEl  = document.getElementById("predicted-score-val");
    const fillEl = document.getElementById("score-gauge-fill");
    if (!valEl || !fillEl) return;

    valEl.textContent = score.toFixed(1);

    const perimeter = 439.823;
    fillEl.setAttribute("stroke-dasharray", perimeter);
    fillEl.style.strokeDashoffset = perimeter - (score / 100) * perimeter;

    if (score >= 85) {
        fillEl.style.stroke = "var(--color-emerald)";
        fillEl.style.filter = "drop-shadow(0 0 8px rgba(16,185,129,0.4))";
    } else if (score >= 70) {
        fillEl.style.stroke = "var(--color-primary)";
        fillEl.style.filter = "drop-shadow(0 0 8px rgba(99,102,241,0.4))";
    } else if (score >= 60) {
        fillEl.style.stroke = "var(--color-amber)";
        fillEl.style.filter = "none";
    } else {
        fillEl.style.stroke = "var(--color-danger)";
        fillEl.style.filter = "none";
    }
}

// ─── Assessment text ──────────────────────────────────────────────────────────
function updateAssessment(score, inputs) {
    const badgeEl = document.getElementById("score-badge");
    const descEl  = document.getElementById("score-summary-desc");
    if (!badgeEl || !descEl) return;

    badgeEl.className = "assessment-badge";
    if (score >= 85) {
        badgeEl.classList.add("badge-excellent");
        badgeEl.textContent = "Excellent Performance";
        descEl.innerHTML = `Top-tier student profile (Grade A). With attendance at <strong>${inputs.Attendance}%</strong> and <strong>${inputs.Hours_Studied} hrs/wk</strong> of study, academic success is highly probable.`;
    } else if (score >= 70) {
        badgeEl.classList.add("badge-good");
        badgeEl.textContent = "Good / Stable";
        descEl.innerHTML = `Steady performance. Current study habits and attendance are adequate. Small improvements could push this student into the excellent bracket.`;
    } else if (score >= 60) {
        badgeEl.classList.add("badge-average");
        badgeEl.textContent = "Average / Vulnerable";
        descEl.innerHTML = `Borderline performance — passing, but vulnerable. Consider targeted tutoring (<strong>+${MODEL_CONFIG.coefficients.Tutoring_Sessions.toFixed(2)} pts/session</strong>) for extra reinforcement.`;
    } else {
        badgeEl.classList.add("badge-risk");
        badgeEl.textContent = "High Academic Risk";
        descEl.innerHTML = `<span class="warning-text">Critical attention required.</span> Predicted score is well below average. Prioritise attendance recovery and increased study hours immediately.`;
    }
}

// ─── What-If Analysis — contributions derived from model coefficients ──────────
function updateWhatIfAnalysis(inputs) {
    const strengthsEl  = document.getElementById("list-strengths");
    const weaknessesEl = document.getElementById("list-weaknesses");
    if (!strengthsEl || !weaknessesEl) return;

    const C = MODEL_CONFIG.coefficients;
    const M = MODEL_CONFIG.categoricalMappings;
    const pos = [], neg = [];

    function record(label, delta) {
        if (Math.abs(delta) < 0.01) return;
        (delta > 0 ? pos : neg).push({ label, points: Math.abs(delta) });
    }

    // Numerical contributions relative to their minimum possible value
    record("Study Time",       (inputs.Hours_Studied    - 1)  * C.Hours_Studied);
    record("Attendance",       (inputs.Attendance       - 60) * C.Attendance);
    record("Previous Scores",  (inputs.Previous_Scores  - 50) * C.Previous_Scores);
    record("Tutoring Support",  inputs.Tutoring_Sessions       * C.Tutoring_Sessions);
    record("Physical Activity", inputs.Physical_Activity       * C.Physical_Activity);
    record("Sleep Quality",    (inputs.Sleep_Hours      - 4)  * C.Sleep_Hours);

    // Categorical contributions — compare each option to its best possible value
    // For features where High=0 (negative coef), High is best; impact = diff from High
    function categoricalDelta(feature, value) {
        const coef = C[feature];
        const enc  = M[feature][value];
        // Best encoded value is 0 when coef<0, max value when coef>0
        const maxEnc = Math.max(...Object.values(M[feature]));
        const bestEnc = coef < 0 ? 0 : maxEnc;
        return (enc - bestEnc) * coef; // negative means penalty vs best
    }

    const catFeatures = [
        ["Parental_Involvement",      inputs.Parental_Involvement,      "Parental Involvement"],
        ["Access_to_Resources",       inputs.Access_to_Resources,       "Learning Resources"],
        ["Motivation_Level",          inputs.Motivation_Level,          "Motivation Level"],
        ["Teacher_Quality",           inputs.Teacher_Quality,           "Teacher Quality"],
        ["Family_Income",             inputs.Family_Income,             "Family Income"],
        ["Peer_Influence",            inputs.Peer_Influence,            "Peer Influence"],
        ["Internet_Access",           inputs.Internet_Access,           "Internet Access"],
        ["Extracurricular_Activities",inputs.Extracurricular_Activities,"Extracurricular"],
        ["Learning_Disabilities",     inputs.Learning_Disabilities,     "Learning Disability"],
        ["Parental_Education_Level",  inputs.Parental_Education_Level,  "Parental Education"],
        ["Distance_from_Home",        inputs.Distance_from_Home,        "Distance from Home"],
        ["School_Type",               inputs.School_Type,               "School Type"],
        ["Gender",                    inputs.Gender,                    "Gender"]
    ];
    catFeatures.forEach(([feat, val, label]) => record(label, categoricalDelta(feat, val)));

    pos.sort((a, b) => b.points - a.points);
    neg.sort((a, b) => b.points - a.points);

    const renderList = (el, items, sign) => {
        if (items.length === 0) {
            el.innerHTML = `<li class="empty-list">${sign === '+' ? 'No significant strengths' : 'No drag factors'}</li>`;
        } else {
            el.innerHTML = items.slice(0, 3).map(c =>
                `<li><span>${c.label}</span><span class="impact-val">${sign}${c.points.toFixed(1)}</span></li>`
            ).join("");
        }
    };
    renderList(strengthsEl,  pos, "+");
    renderList(weaknessesEl, neg, "-");
}

// ─── Recommendations — coefficient-driven, no hardcoded numbers ───────────────
function updateRecommendations(inputs) {
    const recsList = document.getElementById("recs-list");
    if (!recsList) return;

    const C = MODEL_CONFIG.coefficients;
    const recs = [];

    if (inputs.Hours_Studied < 25) {
        const gain = 5 * C.Hours_Studied;
        recs.push({ type: "success", icon: "clock", title: "Increase Weekly Study Hours",
            text: `Studying 5 more hours/week (→ ${inputs.Hours_Studied + 5} hrs) is projected to add <strong class="text-emerald">+${gain.toFixed(2)} points</strong>.` });
    }
    if (inputs.Attendance < 95) {
        const diff = 95 - inputs.Attendance;
        const gain = diff * C.Attendance;
        recs.push({ type: inputs.Attendance < 80 ? "warning" : "info", icon: "activity",
            title: "Boost Classroom Attendance",
            text: `Raising attendance from ${inputs.Attendance}% → 95% yields <strong class="text-emerald">+${gain.toFixed(2)} points</strong>.` });
    }
    if (inputs.Tutoring_Sessions < 4) {
        const gain = 2 * C.Tutoring_Sessions;
        recs.push({ type: "info", icon: "users", title: "Enroll in Tutoring Sessions",
            text: `Two extra sessions/month adds <strong class="text-emerald">+${gain.toFixed(2)} points</strong> via focused expert feedback.` });
    }
    if (inputs.Access_to_Resources !== "High") {
        const M = MODEL_CONFIG.categoricalMappings;
        const currEnc = M.Access_to_Resources[inputs.Access_to_Resources];
        // High=0, so gain = currEnc * |coef| (moving to 0 from currEnc)
        const gain = currEnc * Math.abs(C.Access_to_Resources);
        recs.push({ type: "success", icon: "book-open", title: "Upgrade Learning Resources",
            text: `Moving to high-quality resources can recover <strong class="text-emerald">+${gain.toFixed(2)} points</strong>.` });
    }
    if (inputs.Internet_Access === "No") {
        recs.push({ type: "warning", icon: "wifi", title: "Establish Internet Connectivity",
            text: `A stable home internet connection delivers an immediate boost of <strong class="text-emerald">+${C.Internet_Access.toFixed(2)} points</strong>.` });
    }
    if (inputs.Peer_Influence === "Negative") {
        const M = MODEL_CONFIG.categoricalMappings;
        // Negative=0, Positive=2; gain = (2-0)*coef
        const gain = (M.Peer_Influence["Positive"] - M.Peer_Influence["Negative"]) * C.Peer_Influence;
        recs.push({ type: "warning", icon: "users", title: "Improve Peer Environment",
            text: `Shifting peer influence from negative to positive could add <strong class="text-emerald">+${gain.toFixed(2)} points</strong>.` });
    }
    if (inputs.Learning_Disabilities === "Yes") {
        recs.push({ type: "warning", icon: "heart-pulse", title: "Apply Learning Support Accommodations",
            text: `The model identifies a disability-related penalty of <strong class="text-danger">${(C.Learning_Disabilities).toFixed(2)} points</strong>. IEP accommodations and specialist support can narrow this gap significantly.` });
    }

    if (recs.length === 0) {
        recsList.innerHTML = `
            <div class="rec-item success">
                <div class="rec-icon"><i data-lucide="check-circle-2"></i></div>
                <div class="rec-content">
                    <h5>Optimal Configuration</h5>
                    <p>All major factors are set to their best values. Focus on maintaining this balance!</p>
                </div>
            </div>`;
    } else {
        recsList.innerHTML = recs.map(r => `
            <div class="rec-item ${r.type}">
                <div class="rec-icon"><i data-lucide="${r.icon}"></i></div>
                <div class="rec-content"><h5>${r.title}</h5><p>${r.text}</p></div>
            </div>`).join("");
    }
    lucide.createIcons();
}

// ─── Profile Management (local storage with in-memory fallback) ──────────────
function initProfiles() {
    try {
        const local = localStorage.getItem("edupulse_profiles");
        if (local) {
            savedProfiles = JSON.parse(local);
            updateProfilesUI();
            return;
        }
    } catch (e) {
        console.warn("localStorage is blocked or unavailable. Using in-memory registry.");
    }
    // Seed one example profile
    savedProfiles = [{
        id: "seed-1",
        name: "Alex Johnson",
        score: 87.2,
        timestamp: new Date().toLocaleDateString(),
        factors: STUDENT_PRESETS.overachiever
    }];
    updateProfilesUI();
}

function saveProfilesToStorage() {
    try {
        localStorage.setItem("edupulse_profiles", JSON.stringify(savedProfiles));
    } catch (e) {
        // Fail silently if storage is blocked (e.g. file:// context)
    }
}

function updateProfilesUI() {
    document.getElementById("profiles-count").textContent = savedProfiles.length;
    const grid = document.getElementById("saved-profiles-grid");
    if (!grid) return;

    if (savedProfiles.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-card glass-card">
                <i data-lucide="users" class="empty-icon"></i>
                <h3>No Profiles Saved Yet</h3>
                <p>Use the Predictor Dashboard to configure a student profile, enter a name, and save it here.</p>
                <button class="primary-btn" onclick="switchTab('predictor')">Go to Predictor</button>
            </div>`;
        lucide.createIcons();
        return;
    }

    const gradeInfo = score => {
        if (score >= 85) return { cls: "excellent", label: "Excellent" };
        if (score >= 70) return { cls: "good",      label: "Good" };
        if (score >= 60) return { cls: "average",   label: "Average" };
        return               { cls: "risk",      label: "High Risk" };
    };

    grid.innerHTML = savedProfiles.map(p => {
        const g = gradeInfo(p.score);
        const hours      = p.factors["input-hours"]    || p.factors.Hours_Studied      || 0;
        const attendance = p.factors["input-attendance"]|| p.factors.Attendance        || 0;
        const tutoring   = p.factors["input-tutoring"]  || p.factors.Tutoring_Sessions || 0;
        const motivation = p.factors["input-motivation"]|| p.factors.Motivation_Level  || "—";
        return `
            <div class="student-profile-card glass-card">
                <div class="profile-card-header">
                    <div class="student-meta">
                        <h3>${p.name}</h3>
                        <span>Saved: ${p.timestamp}</span>
                    </div>
                    <div class="profile-actions-row">
                        <button class="icon-btn load-btn" onclick="loadProfileIntoSimulator('${p.id}')" title="Load into Simulator">
                            <i data-lucide="sliders-horizontal"></i>
                        </button>
                        <button class="icon-btn delete-btn" onclick="deleteProfile('${p.id}')" title="Delete Profile">
                            <i data-lucide="trash"></i>
                        </button>
                    </div>
                </div>
                <div class="profile-card-score">
                    <div class="mini-score-val ${g.cls}">${p.score.toFixed(1)}</div>
                    <div class="mini-score-details">
                        <span class="lbl">Predicted Score</span>
                        <span class="status">${g.label}</span>
                    </div>
                </div>
                <div class="profile-factors-summary">
                    <div class="summary-fact"><i data-lucide="clock"></i>Study: <span>${hours}h/wk</span></div>
                    <div class="summary-fact"><i data-lucide="activity"></i>Attend: <span>${attendance}%</span></div>
                    <div class="summary-fact"><i data-lucide="graduation-cap"></i>Tutors: <span>${tutoring}</span></div>
                    <div class="summary-fact"><i data-lucide="smile"></i>Motiv: <span>${motivation}</span></div>
                </div>
            </div>`;
    }).join("");
    lucide.createIcons();
}

function setupRegistryActions() {
    const btnSave   = document.getElementById("btn-save-profile");
    const inputName = document.getElementById("save-student-name");
    if (btnSave && inputName) {
        btnSave.addEventListener("click", async () => {
            const name = inputName.value.trim();
            if (!name) { showToast("Please enter a student name first", "danger"); return; }
            const inputs = getSimulatorInputs();
            const score  = await calculateScore(inputs);
            savedProfiles.unshift({
                id: "profile_" + Date.now(), name, score,
                timestamp: new Date().toLocaleDateString(),
                factors: inputs
            });
            saveProfilesToStorage();
            updateProfilesUI();
            inputName.value = "";
            showToast(`Saved profile for ${name}`, "success");
        });
    }

    const btnExport = document.getElementById("btn-export-profiles");
    if (btnExport) {
        btnExport.addEventListener("click", () => {
            if (!savedProfiles.length) { showToast("No profiles to export", "danger"); return; }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedProfiles, null, 2));
            const a = Object.assign(document.createElement("a"), { href: dataStr, download: "edupulse_profiles.json" });
            document.body.appendChild(a); a.click(); a.remove();
            showToast("Profiles exported", "success");
        });
    }

    const btnClear = document.getElementById("btn-clear-profiles");
    if (btnClear) {
        btnClear.addEventListener("click", () => {
            if (confirm("Delete all saved profiles? This cannot be undone.")) {
                savedProfiles = [];
                saveProfilesToStorage();
                updateProfilesUI();
                showToast("Registry cleared", "info");
            }
        });
    }
}

// Load a saved profile back into the predictor form
window.loadProfileIntoSimulator = function(id) {
    const profile = savedProfiles.find(p => p.id === id);
    if (!profile) return;
    const factorToId = {
        Hours_Studied: "input-hours", Attendance: "input-attendance",
        Sleep_Hours: "input-sleep", Previous_Scores: "input-prev-score",
        Tutoring_Sessions: "input-tutoring", Physical_Activity: "input-physical",
        Parental_Involvement: "input-parental-involvement", Access_to_Resources: "input-resources",
        Motivation_Level: "input-motivation", Peer_Influence: "input-peer",
        Family_Income: "input-income", Teacher_Quality: "input-teacher",
        School_Type: "input-school", Distance_from_Home: "input-distance",
        Extracurricular_Activities: "input-extracurricular", Learning_Disabilities: "input-disability",
        Internet_Access: "input-internet", Parental_Education_Level: "input-parental-edu",
        Gender: "input-gender"
    };
    for (const [key, val] of Object.entries(profile.factors)) {
        // Profile factors may be stored by full feature name or by HTML id
        const elementId = factorToId[key] || key;
        const el = document.getElementById(elementId);
        if (el) { el.value = val; el.dispatchEvent(new Event("input")); }
    }
    switchTab("predictor");
    evaluateStudent();
    showToast(`Loaded ${profile.name} into predictor`, "success");
};

window.deleteProfile = function(id) {
    const idx = savedProfiles.findIndex(p => p.id === id);
    if (idx === -1) return;
    const name = savedProfiles[idx].name;
    savedProfiles.splice(idx, 1);
    saveProfilesToStorage();
    updateProfilesUI();
    showToast(`Deleted ${name}`, "info");
};


// ─── Toast Notifications ──────────────────────────────────────────────────────
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const iconMap = { success: "check-circle", danger: "alert-circle", info: "info" };
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i data-lucide="${iconMap[type] || 'info'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => {
        toast.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ─── Charts ───────────────────────────────────────────────────────────────────
function initializeCharts() {
    if (chartsInitialized) return;
    const importanceCtx   = document.getElementById("chart-importance");
    const correlationsCtx = document.getElementById("chart-correlations");
    if (!importanceCtx || !correlationsCtx) return;

    Chart.defaults.color = "#94a3b8";
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.borderColor = "rgba(255,255,255,0.05)";

    // Feature Importance (horizontal bar)
    const impKeys = Object.keys(MODEL_CONFIG.featureImportances);
    const impVals = Object.values(MODEL_CONFIG.featureImportances);
    currentCharts.importance = new Chart(importanceCtx, {
        type: "bar",
        data: {
            labels: impKeys.map(k => k.replace(/_/g, " ")),
            datasets: [{
                label: "Importance (%)",
                data: impVals,
                backgroundColor: ctx => ctx.dataIndex < 3 ? "rgba(168,85,247,0.85)" : "rgba(99,102,241,0.7)",
                borderColor:     ctx => ctx.dataIndex < 3 ? "#a855f7" : "#6366f1",
                borderWidth: 1, borderRadius: 4
            }]
        },
        options: {
            indexAxis: "y", responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false },
                tooltip: { backgroundColor: "rgba(15,17,26,0.95)", titleColor: "#fff",
                           bodyColor: "#cbd5e1", borderColor: "rgba(255,255,255,0.08)", borderWidth: 1 } },
            scales: {
                x: { grid: { color: "rgba(255,255,255,0.03)" },
                     title: { display: true, text: "Importance (%)", font: { size: 11 } } },
                y: { grid: { display: false } }
            }
        }
    });

    // Correlations (vertical bar, sorted descending)
    const corrEntries = Object.entries(MODEL_CONFIG.correlations).sort((a, b) => b[1] - a[1]);
    currentCharts.correlations = new Chart(correlationsCtx, {
        type: "bar",
        data: {
            labels: corrEntries.map(([k]) => k.replace(/_/g, " ")),
            datasets: [{
                label: "Correlation (r)",
                data: corrEntries.map(([, v]) => v),
                backgroundColor: ctx => ctx.raw >= 0 ? "rgba(16,185,129,0.75)" : "rgba(244,63,94,0.75)",
                borderColor:     ctx => ctx.raw >= 0 ? "#10b981" : "#f43f5e",
                borderWidth: 1, borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false },
                tooltip: { backgroundColor: "rgba(15,17,26,0.95)", titleColor: "#fff",
                           bodyColor: "#cbd5e1", borderColor: "rgba(255,255,255,0.08)", borderWidth: 1 } },
            scales: {
                x: { grid: { display: false },
                     ticks: { autoSkip: false, maxRotation: 45, minRotation: 45, font: { size: 8 } } },
                y: { grid: { color: "rgba(255,255,255,0.03)" },
                     title: { display: true, text: "Correlation (r)", font: { size: 11 } } }
            }
        }
    });

    chartsInitialized = true;
}