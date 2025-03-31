import pandas as pd
import os

# File paths
raw_data_path = r"C:\Users\NAMNEET\OneDrive\Desktop\Semicolons'25\food_pred\data\Food Consumption & Access Control Data (Admin) 2023-24 - All XYZ Location Offices-Mar 25.xlsb"
data_save_path = os.path.join(os.path.dirname(__file__), "../data/cleaned_data.csv")

try:
    # Load Excel file
    df = pd.read_excel(raw_data_path, sheet_name=0, engine='pyxlsb', header=2)

    # Manually rename columns (modify these based on actual column meanings)
    df.columns = [
        "Facility", "Date", "Day", "Footfall", "Lunch Ordered",
        "Additional Order", "Total Order", "Lunch Actual", "Difference", 
        "Dry Veg", "Gravy Veg", "Rice", "Dal", "Sweet", "Remarks",
        "Snacks Ordered", "Additional Snacks", "Total Snacks", 
        "Snacks Actual", "Snack Difference", "Menu", "Extra Remarks"
    ]

    # Save cleaned data with proper column names
    df.to_csv(data_save_path, index=False)

    print(f"✅ Data extracted and column names set! Saved to {data_save_path}")

except Exception as e:
    print(f"❌ Error extracting data: {e}")
