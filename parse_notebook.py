import json

with open("Student_Performance_Predictor.ipynb", "r", encoding="utf-8") as f:
    notebook = json.load(f)

for idx, cell in enumerate(notebook.get("cells", [])):
    source = "".join(cell.get("source", []))
    cell_type = cell.get("cell_type")
    
    # Check for imports, column names, model training
    if cell_type == "code":
        if "columns" in source or "df = " in source or "drop" in source or "LinearRegression" in source:
            print(f"--- Cell {idx} (Code) ---")
            print(source)
            print("-" * 50)
    elif cell_type == "markdown":
        if "feature" in source.lower() or "model" in source.lower() or "score" in source.lower():
            print(f"--- Cell {idx} (Markdown) ---")
            print(source)
            print("-" * 50)
