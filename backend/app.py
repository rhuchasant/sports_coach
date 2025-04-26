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
        print(f"Loading Prolog file: {prolog_file}")
        prolog.consult(prolog_file)
        print(f"Loaded Prolog knowledge base from {prolog_file}")
        
        # Test if predicates are loaded
        try:
            print("Testing if predicates are loaded...")
            # Test user_injury predicate
            test_query = "user_injury(_, _, _, _, _, _)"
            results = list(prolog.query(test_query))
            print(f"user_injury predicate test: {'Success' if results is not None else 'Failed'}")
            
            # Test user_achievement predicate
            test_query = "user_achievement(_, _, _, _, _)"
            results = list(prolog.query(test_query))
            print(f"user_achievement predicate test: {'Success' if results is not None else 'Failed'}")
            
            # Test add_injury predicate
            test_query = "add_injury(_, _, _, _, _, _)"
            results = list(prolog.query(test_query))
            print(f"add_injury predicate test: {'Success' if results is not None else 'Failed'}")
            
        except Exception as e:
            print(f"Error testing predicates: {str(e)}")
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
    try:
        data = request.json
        app.logger.info(f"Received sport data: {data}")
        
        user_id = data.get('userId')
        sport = data.get('sport')
        level = data.get('level', 'beginner')  # Default to beginner if not specified
        
        if not user_id or not sport:
            app.logger.error(f"Missing required fields: userId={user_id}, sport={sport}")
            return jsonify({'error': 'User ID and sport are required'}), 400
            
        # First check if user exists
        user_exists = list(prolog.query(f"user_profile('{user_id}', _, _, _, _, _, _)"))
        if not user_exists:
            app.logger.error(f"User not found: {user_id}")
            return jsonify({'error': 'User not found. Please complete your profile setup first.'}), 404
            
        # Check if sport is valid
        valid_sport = list(prolog.query(f"sport_category('{sport}')"))
        if not valid_sport:
            app.logger.error(f"Invalid sport: {sport}")
            return jsonify({'error': f'Invalid sport: {sport}'}), 400
            
        # Check if level is valid
        valid_level = list(prolog.query(f"fitness_level('{level}')"))
        if not valid_level:
            app.logger.error(f"Invalid level: {level}")
            return jsonify({'error': f'Invalid level: {level}'}), 400
            
        # Remove any existing sport for this user
        prolog.query(f"retractall(user_sport('{user_id}', _, _))")
        
        # Add the new sport with level
        query = f"set_sport('{user_id}', '{sport}', '{level}')"
        app.logger.info(f"Executing Prolog query: {query}")
        result = list(prolog.query(query))
        app.logger.info(f"Query result: {result}")
        
        # Verify the sport was added
        sport_verified = list(prolog.query(f"user_sport('{user_id}', Sport, Level)"))
        if not sport_verified:
            app.logger.error(f"Failed to verify sport setting for user {user_id}")
            return jsonify({'error': 'Failed to set sport'}), 500
            
        app.logger.info(f"Successfully set sport for user {user_id}: {sport} at level {level}")
        return jsonify({'message': f'Sport set to {sport} at {level} level'})
        
    except Exception as e:
        app.logger.error(f"Error setting sport: {str(e)}", exc_info=True)
        return jsonify({'error': 'An unexpected error occurred while setting your sport.'}), 500

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
        # Log the request
        app.logger.info(f"Fetching plan for user: {user_id}")
        
        # Check if user exists
        user_exists = list(prolog.query(f"user_profile('{user_id}', _, _, _, _, _, _)"))
        if not user_exists:
            app.logger.error(f"User not found: {user_id}")
            return jsonify({'error': 'User not found. Please complete your profile setup first.'}), 404
        
        # Get full plan including injury recommendations
        plan_results = list(prolog.query(f"get_full_plan('{user_id}', TrainingPlan, NutritionPlan, InjuryRecommendations)"))
        if not plan_results:
            app.logger.error(f"Could not generate plan for user: {user_id}")
            return jsonify({'error': 'Could not generate plan.'}), 400
            
        result = plan_results[0]
        training_plan = result['TrainingPlan']
        nutrition_plan = result['NutritionPlan']
        injury_recommendations = result['InjuryRecommendations']
        
        # Format plans for frontend
        formatted_training_plan = [
            {'description': str(item), 'details': []} 
            for item in training_plan
        ]
        formatted_nutrition_plan = [
            {'description': str(item), 'details': []} 
            for item in nutrition_plan
        ]
        formatted_injury_recommendations = [
            {'description': str(item), 'details': []} 
            for item in injury_recommendations
        ]
        
        # Log the formatted plans
        app.logger.info(f"Generated training plan: {formatted_training_plan}")
        app.logger.info(f"Generated nutrition plan: {formatted_nutrition_plan}")
        app.logger.info(f"Generated injury recommendations: {formatted_injury_recommendations}")
        
        return jsonify({
            'trainingPlan': formatted_training_plan,
            'nutritionPlan': formatted_nutrition_plan,
            'injuryRecommendations': formatted_injury_recommendations
        })
        
    except Exception as e:
        app.logger.error(f"Error generating plan: {str(e)}", exc_info=True)
        return jsonify({'error': 'An unexpected error occurred while generating your plan.'}), 500

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
    try:
        # Query Prolog for competition types
        results = list(prolog.query("competition_type(Type)"))
        types = [result['Type'] for result in results]
        
        return jsonify({
            "competitionTypes": types
        })
    except Exception as e:
        print(f"Error in get_competition_types: {str(e)}")
        return jsonify({
            "competitionTypes": ['olympics', 'commonwealth', 'world_championship', 'national', 'local']
        })

@app.route('/api/sport_formats/<sport>', methods=['GET'])
def get_sport_formats(sport):
    try:
        # Query Prolog for formats for a specific sport
        results = list(prolog.query(f"sport_format('{sport}', Format)"))
        formats = [result['Format'] for result in results]
        
        return jsonify({
            "formats": formats
        })
    except Exception as e:
        print(f"Error in get_sport_formats: {str(e)}")
        return jsonify({
            "formats": ['tournament', 'league', 'friendly']
        })

@app.route('/api/competition_levels', methods=['GET'])
def get_competition_levels():
    try:
        # Query Prolog for competition levels
        results = list(prolog.query("competition_level(Level)"))
        levels = [result['Level'] for result in results]
        
        return jsonify({
            "levels": levels
        })
    except Exception as e:
        print(f"Error in get_competition_levels: {str(e)}")
        return jsonify({
            "levels": ['international', 'national', 'state', 'club']
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

@app.route('/api/injuries/<user_id>', methods=['GET', 'POST'])
def handle_injuries(user_id):
    if request.method == 'GET':
        try:
            print(f"Fetching injuries for user {user_id}")
            # Query Prolog for user's injuries
            query = f"user_injury('{user_id}', Type, Date, Severity, RecoveryTime, Notes)"
            print(f"Executing query: {query}")
            results = list(prolog.query(query))
            print(f"Query results: {results}")
            
            injuries = [{
                'type': result['Type'],
                'date': result['Date'],
                'severity': result['Severity'],
                'recoveryTime': result['RecoveryTime'],
                'notes': result['Notes']
            } for result in results]
            
            return jsonify(injuries)
        except Exception as e:
            print(f"Error fetching injuries: {str(e)}")
            return jsonify([])
    
    elif request.method == 'POST':
        try:
            data = request.json
            print(f"Adding injury for user {user_id}: {data}")
            
            # Extract injury data
            injury_type = data.get('type', '')
            date = data.get('date', '')
            severity = data.get('severity', '')
            recovery_time = data.get('recoveryTime', '')
            notes = data.get('notes', '')
            
            # Assert injury in Prolog
            query = f"add_injury('{user_id}', '{injury_type}', '{date}', '{severity}', '{recovery_time}', '{notes}')"
            print(f"Executing query: {query}")
            results = list(prolog.query(query))
            print(f"Query results: {results}")
            
            return jsonify({
                'type': injury_type,
                'date': date,
                'severity': severity,
                'recoveryTime': recovery_time,
                'notes': notes
            })
        except Exception as e:
            print(f"Error adding injury: {str(e)}")
            return jsonify({
                "error": "Failed to add injury"
            }), 400

@app.route('/api/achievements/<user_id>', methods=['GET', 'POST'])
def handle_achievements(user_id):
    if request.method == 'GET':
        try:
            # Query Prolog for user's achievements
            query = f"user_achievement('{user_id}', Title, Date, Category, Description)"
            results = list(prolog.query(query))
            
            achievements = [{
                'title': result['Title'],
                'date': result['Date'],
                'category': result['Category'],
                'description': result['Description']
            } for result in results]
            
            return jsonify(achievements)
        except Exception as e:
            print(f"Error fetching achievements: {str(e)}")
            return jsonify([])
    
    elif request.method == 'POST':
        try:
            data = request.json
            
            # Extract achievement data
            title = data.get('title', '')
            date = data.get('date', '')
            category = data.get('category', '')
            description = data.get('description', '')
            
            # Assert achievement in Prolog
            query = f"add_achievement('{user_id}', '{title}', '{date}', '{category}', '{description}')"
            list(prolog.query(query))
            
            return jsonify({
                'title': title,
                'date': date,
                'category': category,
                'description': description
            })
        except Exception as e:
            print(f"Error adding achievement: {str(e)}")
            return jsonify({
                "error": "Failed to add achievement"
            }), 400

@app.route('/api/injury_recommendations/<user_id>', methods=['GET'])
def get_injury_recommendations(user_id):
    try:
        # Query Prolog for injury recommendations
        query = f"get_injury_recommendations('{user_id}', Recommendations)"
        result = list(prolog.query(query))
        
        if not result:
            return jsonify({'recommendations': []})
            
        recommendations = result[0]['Recommendations']
        return jsonify({'recommendations': recommendations})
        
    except Exception as e:
        app.logger.error(f"Error getting injury recommendations: {str(e)}")
        return jsonify({'error': 'Failed to get injury recommendations'}), 500

if __name__ == '__main__':
    app.run(debug=True)