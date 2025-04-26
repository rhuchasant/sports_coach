from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile
import uuid
import os
import json
from pyswip import Prolog
import logging

# Set up logging (you can adjust the level based on your needs)
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Initialize Prolog
prolog = Prolog()

# Load the Prolog knowledge base
def load_prolog_knowledge_base():
    # Path to the Prolog file - update this with your actual file path
    prolog_file = "sports_fitness_coach.pl"
    
    # Check if file exists
    if os.path.exists(prolog_file):
        prolog.consult(prolog_file)
        print(f"Loaded Prolog knowledge base from {prolog_file}")
    else:
        print(f"Prolog file {prolog_file} not found")
        # Create the file with basic rules for development
        with open(prolog_file, "w") as f:
            f.write("""
% Basic user profile facts
:- dynamic user_profile/7.
% user_profile(ID, Name, Age, Gender, Height, Weight, FitnessLevel).

% Basic sport selection facts
:- dynamic user_sport/3.
% user_sport(UserID, Sport, Level).

% Rest of the Prolog code would go here
            """)
        prolog.consult(prolog_file)
        print(f"Created and loaded basic Prolog file at {prolog_file}")

# Call this at startup
load_prolog_knowledge_base()

@app.route('/api/user', methods=['POST'])
def create_user():
    data = request.json
    
    # Generate a unique user ID
    user_id = str(uuid.uuid4())
    
    # Extract user data
    name = data.get('name', '')
    age = data.get('age', 0)
    gender = data.get('gender', '')
    height = data.get('height', 0)
    weight = data.get('weight', 0)
    fitness_level = data.get('fitnessLevel', 'beginner')
    
    # Assert user profile in Prolog
    query = f"new_user('{user_id}', '{name}', {age}, '{gender}', {height}, {weight}, '{fitness_level}')"
    list(prolog.query(query))
    
    return jsonify({
        "userId": user_id,
        "message": "User profile created successfully"
    })

@app.route('/api/sport', methods=['POST'])
def set_sport():
    data = request.json
    
    user_id = data.get('userId', '')
    sport = data.get('sport', '')
    level = data.get('level', 'beginner')
    
    # Assert sport selection in Prolog
    query = f"set_sport('{user_id}', '{sport}', '{level}')"
    list(prolog.query(query))
    
    return jsonify({
        "message": f"Sport {sport} at {level} level set for user"
    })

@app.route('/api/competition', methods=['POST'])
def set_competition():
    data = request.json
    
    user_id = data.get('userId', '')
    comp_type = data.get('competitionType', '')
    format = data.get('format', '')
    level = data.get('level', '')
    
    # Assert competition details in Prolog
    query = f"set_competition('{user_id}', '{comp_type}', '{format}', '{level}')"
    list(prolog.query(query))
    
    return jsonify({
        "message": "Competition details set successfully"
    })

@app.route('/api/injury', methods=['POST'])
def add_injury():
    data = request.json
    
    user_id = data.get('userId', '')
    injury_type = data.get('injuryType', '')
    recovery_status = data.get('recoveryStatus', '')
    
    # Assert injury in Prolog
    query = f"add_injury('{user_id}', '{injury_type}', '{recovery_status}')"
    list(prolog.query(query))
    
    return jsonify({
        "message": "Injury record added successfully"
    })

@app.route('/api/achievement', methods=['POST'])
def add_achievement():
    data = request.json
    
    user_id = data.get('userId', '')
    competition = data.get('competition', '')
    position = data.get('position', '')
    year = data.get('year', 0)
    
    # Assert achievement in Prolog
    query = f"add_achievement('{user_id}', '{competition}', '{position}', {year})"
    list(prolog.query(query))
    
    return jsonify({
        "message": "Achievement added successfully"
    })

@app.route('/api/diet', methods=['POST'])
def set_diet():
    data = request.json
    
    user_id = data.get('userId', '')
    diet_type = data.get('dietType', '')
    restrictions = data.get('restrictions', [])
    
    # Convert restrictions list to Prolog list format
    restrictions_str = "[" + ",".join([f"'{r}'" for r in restrictions]) + "]"
    
    # Assert diet preferences in Prolog
    query = f"set_diet('{user_id}', '{diet_type}', {restrictions_str})"
    list(prolog.query(query))
    
    return jsonify({
        "message": "Diet preferences set successfully"
    })

from flask import jsonify

@app.route('/api/plan/<user_id>', methods=['GET'])
def get_plan(user_id):
    try:
        query = f"get_full_plan('{user_id}', TrainingPlan, NutritionPlan)"
        logging.debug(f"Running Prolog query: {query}")

        results = list(prolog.query(query))
        
        if results:
            training_plan = results[0].get('TrainingPlan')
            nutrition_plan = results[0].get('NutritionPlan')
            
            if training_plan is not None and nutrition_plan is not None:
                return jsonify({
                    "trainingPlan": training_plan,
                    "nutritionPlan": nutrition_plan
                })
            else:
                return jsonify({"error": "Plan data missing in response."}), 500
        else:
            return jsonify({
                "error": "Could not generate plan. Make sure all required information is provided."
            }), 400
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/sports', methods=['GET'])
def get_sports():
    # Query Prolog for available sports
    results = list(prolog.query("sport_category(Sport)"))
    sports = [result['Sport'] for result in results]
    
    return jsonify({
        "sports": sports
    })

@app.route('/api/competition_types', methods=['GET'])
def get_competition_types():
    # Query Prolog for competition types
    results = list(prolog.query("competition_type(Type)"))
    types = [result['Type'] for result in results]
    
    return jsonify({
        "competitionTypes": types
    })

@app.route('/api/sport_formats/<sport>', methods=['GET'])
def get_sport_formats(sport):
    # Query Prolog for formats for a specific sport
    results = list(prolog.query(f"sport_format('{sport}', Format)"))
    formats = [result['Format'] for result in results]
    
    return jsonify({
        "formats": formats
    })

@app.route('/api/competition_levels', methods=['GET'])
def get_competition_levels():
    # Query Prolog for competition levels
    results = list(prolog.query("competition_level(Level)"))
    levels = [result['Level'] for result in results]
    
    return jsonify({
        "levels": levels
    })

@app.route('/api/fitness_levels', methods=['GET'])
def get_fitness_levels():
    # Query Prolog for fitness levels
    results = list(prolog.query("fitness_level(Level)"))
    levels = [result['Level'] for result in results]
    
    return jsonify({
        "fitnessLevels": levels
    })

@app.route('/api/diet_types', methods=['GET'])
def get_diet_types():
    # Query Prolog for diet types
    results = list(prolog.query("diet_type(Type)"))
    types = [result['Type'] for result in results]
    
    return jsonify({
        "dietTypes": types
    })

@app.route('/api/injury_types', methods=['GET'])
def get_injury_types():
    # Query Prolog for injury types
    results = list(prolog.query("injury_type(Type)"))
    types = [result['Type'] for result in results]
    
    return jsonify({
        "injuryTypes": types
    })

@app.route('/api/recovery_statuses', methods=['GET'])
def get_recovery_statuses():
    # Query Prolog for recovery statuses
    results = list(prolog.query("recovery_status(Status)"))
    statuses = [result['Status'] for result in results]
    
    return jsonify({
        "recoveryStatuses": statuses
    })

if __name__ == '__main__':
    app.run(debug=True)