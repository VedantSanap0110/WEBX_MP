from flask import Flask, render_template, request, jsonify
import pandas as pd
import os
from flask_cors import CORS
from utils import loadData

app = Flask(__name__)
CORS(app)
# Load dataset from data/cleaned_data.csv

df = None


def parse_dish_name(dish):
    """Return the dish name only if it's non-numeric text."""
    if pd.isna(dish):
        return None
    try:
        float(dish)  # if conversion works, it's numeric, so ignore it
        return None
    except ValueError:
        return str(dish).strip().upper()

def top_favored_items(dataframe, top_n=5, food_type="Lunch", day="All"):
    """
    For 'Lunch': combines 'Dry Veg', 'Gravy Veg', 'Rice', 'Dal' columns (ignoring numeric values).
    For 'Snacks': uses the 'Menu' column (ignoring numeric values).
    If a specific day is selected (not "All"), filters the dataframe by that day.
    Returns a dictionary of top items as percentages (rounded to 1 decimal place) sorted in descending order.
    """
    try:
        # Filter by day if a specific day is selected
        if day and day.lower() != "all":
            dataframe = dataframe[dataframe["Day"] == day]
        
        if food_type.lower() == "lunch":
            lunch_cols = ["Dry Veg", "Gravy Veg", "Rice", "Dal"]
            missing_cols = [col for col in lunch_cols if col not in dataframe.columns]
            if missing_cols:
                raise Exception(f"Missing columns for Lunch: {missing_cols}")
            stacked = dataframe[lunch_cols].stack().dropna()
            stacked = stacked.apply(parse_dish_name).dropna()
            counts = stacked.value_counts()
        elif food_type.lower() == "snacks":
            menu_col = "Menu"
            if menu_col not in dataframe.columns:
                raise Exception(f"Missing column for Snacks: '{menu_col}'")
            menu_series = dataframe[menu_col].dropna().apply(parse_dish_name).dropna()
            counts = menu_series.value_counts()
        else:
            # Default to lunch logic
            lunch_cols = ["Dry Veg", "Gravy Veg", "Rice", "Dal"]
            stacked = dataframe[lunch_cols].stack().dropna()
            stacked = stacked.apply(parse_dish_name).dropna()
            counts = stacked.value_counts()
        
        total = counts.sum()
        # If top_n is 'all', then return all items
        try:
            top_n = int(top_n)
            selected = counts.sort_values(ascending=False).head(top_n)
        except ValueError:
            selected = counts.sort_values(ascending=False)
        
        # Compute percentage for each dish
        result = {dish: round((count / total * 100), 1) for dish, count in selected.items()}
        return result

    except Exception as e:
        print(f"❌ ERROR in top_favored_items: {e}")
        return {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/top_dishes", methods=["GET"])
def get_top_dishes():
    food_type = request.args.get("food_type", default="Lunch", type=str)
    top_n = request.args.get("n", default="5", type=str)  # can be a number or "all"
    day = request.args.get("day", default="All", type=str)
    
    if df is None:
        return jsonify({"error": "No dataset available. Please upload valid data."}), 500

    try:
        top_items = top_favored_items(df, top_n, food_type, day)
        return jsonify(top_items)
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    df=loadData()
    app.run(debug=True)
