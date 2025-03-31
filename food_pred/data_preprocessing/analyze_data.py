import pandas as pd
import os

# Define file path
data_path = os.path.join(os.path.dirname(__file__), "../data/cleaned_data.csv")

def load_data():
    """Loads the cleaned food data from CSV."""
    try:
        df = pd.read_csv(data_path)
        print("✅ Data successfully loaded!")
        return df
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return None

def top_favored_items(df, top_n=3):
    """Finds the top N favored food items per day."""
    if df is None:
        return "No data available"
    
    # Define correct column names
    day_col = "Day"
    food_col = "Dry Veg"

    # Check if columns exist
    if day_col not in df.columns or food_col not in df.columns:
        print(f"❌ Error: Columns '{day_col}' or '{food_col}' not found in dataset.")
        print("🔹 Available columns:", df.columns)
        return None

    # Remove rows where food column is empty
    df = df.dropna(subset=[food_col])

    # Get top N dishes per day
    top_items_per_day = {}
    for day, group in df.groupby(day_col):
        top_items = group[food_col].value_counts().nlargest(top_n).index.tolist()
        top_items_per_day[day] = top_items

    return top_items_per_day

if __name__ == "__main__":
    df = load_data()
    if df is not None:
        top_items = top_favored_items(df, top_n=3)  # Default: Top 3 dishes
        if top_items:
            print("\n🔹 Top favored items per day:", top_items)
