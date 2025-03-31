import pandas as pd
def loadData():
    DATA_PATH = "data/cleaned_data.csv"
    df = None
    try:
        df = pd.read_csv(DATA_PATH)

        print("✅ Dataset loaded successfully!")
        return df
    except Exception as e:
        print(f"❌ ERROR: Could not load dataset: {e}")