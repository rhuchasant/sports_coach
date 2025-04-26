import requests
import json

BASE_URL = "http://localhost:5000"

def create_test_user():
    # Create user profile
    user_data = {
        "name": "Test User",
        "age": 25,
        "gender": "male",
        "height": 180,
        "weight": 75,
        "fitnessLevel": "intermediate"
    }
    
    response = requests.post(f"{BASE_URL}/api/user", json=user_data)
    if response.status_code == 200:
        user_id = response.json().get("userId")
        print(f"Created user with ID: {user_id}")
        return user_id
    else:
        print(f"Failed to create user: {response.text}")
        return None

def set_user_sport(user_id):
    # Set user's sport
    sport_data = {
        "userId": user_id,
        "sport": "running",
        "level": "intermediate"
    }
    
    response = requests.post(f"{BASE_URL}/api/sport", json=sport_data)
    if response.status_code == 200:
        print("Successfully set user's sport")
    else:
        print(f"Failed to set sport: {response.text}")

def set_user_diet(user_id):
    # Set user's diet preferences
    diet_data = {
        "userId": user_id,
        "dietType": "balanced",
        "restrictions": []
    }
    
    response = requests.post(f"{BASE_URL}/api/diet", json=diet_data)
    if response.status_code == 200:
        print("Successfully set user's diet preferences")
    else:
        print(f"Failed to set diet: {response.text}")

def main():
    user_id = create_test_user()
    if user_id:
        set_user_sport(user_id)
        set_user_diet(user_id)
        
        # Try to get the plan
        response = requests.get(f"{BASE_URL}/api/plan/{user_id}")
        if response.status_code == 200:
            print("\nSuccessfully generated plan:")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"\nFailed to get plan: {response.text}")

if __name__ == "__main__":
    main() 