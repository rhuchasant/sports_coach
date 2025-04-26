% Sports Fitness Coach Expert System

% Dynamic predicate declarations
:- dynamic user_profile/7.
:- dynamic user_sport/3.
:- dynamic user_injury/6.
:- dynamic user_achievement/5.
:- dynamic user_diet/3.
:- dynamic user_training_schedule/2.
:- dynamic filter_diet_recommendations/3.
:- dynamic is_vegetarian_friendly/2.
:- dynamic contains_animal_products/1.
:- dynamic diet_recommendation/3.
:- dynamic sport_specific_diet/2.
:- dynamic diet_type_recommendations/2.
:- dynamic injury_recommendation/2.
:- dynamic get_injury_recommendations/2.

% User profile facts
% user_profile(ID, Name, Age, Gender, Height, Weight, FitnessLevel).

% Sport selection facts
% user_sport(UserID, Sport, Level).

% Competition details
:- dynamic competition_details/4.
% competition_details(UserID, CompetitionType, Format, Level).

% Medical history
% user_injury(UserID, Type, Date, Severity, RecoveryTime, Notes).

% Past achievements
% user_achievement(UserID, Title, Date, Category, Description).

% Diet preferences
% diet_preference(UserID, DietType, Restrictions).

% Training schedule
% training_schedule(UserID, ScheduleList).

% Sports categories
sport_category(running).
sport_category(swimming).
sport_category(cycling).
sport_category(weightlifting).
sport_category(yoga).
sport_category(basketball).
sport_category(soccer).
sport_category(tennis).
sport_category(cricket).
sport_category(football).
sport_category(gymnastics).

% Competition types
competition_type(olympics).
competition_type(commonwealth).
competition_type(world_championship).
competition_type(national).
competition_type(local).

% Sport formats
sport_format(cricket, t20).
sport_format(cricket, odi).
sport_format(cricket, test).
sport_format(swimming, freestyle).
sport_format(swimming, butterfly).
sport_format(swimming, backstroke).
sport_format(swimming, breaststroke).
sport_format(swimming, medley).
sport_format(running, sprint).
sport_format(running, marathon).
sport_format(running, middle_distance).
sport_format(running, cross_country).
sport_format(running, trail).
sport_format(cycling, road).
sport_format(cycling, mountain).
sport_format(cycling, track).
sport_format(cycling, time_trial).
sport_format(weightlifting, olympic).
sport_format(weightlifting, powerlifting).
sport_format(weightlifting, bodybuilding).
sport_format(yoga, hatha).
sport_format(yoga, vinyasa).
sport_format(yoga, ashtanga).
sport_format(yoga, iyengar).
sport_format(basketball, full_court).
sport_format(basketball, half_court).
sport_format(basketball, three_on_three).
sport_format(soccer, eleven_a_side).
sport_format(soccer, seven_a_side).
sport_format(soccer, five_a_side).
sport_format(tennis, singles).
sport_format(tennis, doubles).
sport_format(tennis, mixed_doubles).
sport_format(football, american).
sport_format(football, flag).
sport_format(football, touch).
sport_format(gymnastics, artistic).
sport_format(gymnastics, rhythmic).
sport_format(gymnastics, trampoline).
sport_format(gymnastics, acrobatic).

% Competition levels
competition_level(international).
competition_level(national).
competition_level(state).
competition_level(club).

% Fitness levels
fitness_level(beginner).
fitness_level(intermediate).
fitness_level(advanced).
fitness_level(elite).

% Diet types and restrictions
diet_type(vegetarian).
diet_type(vegan).
diet_type(keto).
diet_type(paleo).
diet_type(balanced).
diet_type(high_protein).
diet_type(no_restrictions).

diet_restriction(dairy_free).
diet_restriction(gluten_free).
diet_restriction(nut_free).
diet_restriction(soy_free).
diet_restriction(egg_free).

% Injury types
injury_type(muscle_strain).
injury_type(sprain).
injury_type(fracture).
injury_type(tendonitis).
injury_type(concussion).
injury_type(joint_pain).

% Recovery status
recovery_status(fully_recovered).
recovery_status(partially_recovered).
recovery_status(in_recovery).
recovery_status(chronic).

% Training recommendations based on sport and fitness level
training_recommendation(Sport, FitnessLevel, Recommendations) :-
    sport_specific_training(Sport, SportTraining),
    fitness_level_training(FitnessLevel, FitnessTraining),
    append(SportTraining, FitnessTraining, Recommendations).

% Sport specific training
sport_specific_training(cricket, [
    'Net Practice (3x/week): Focus on batting technique, bowling accuracy, and fielding drills',
    'Strength Training (2x/week): Core exercises, rotational power, and explosive movements',
    'Cardio (2x/week): Interval training for match fitness and endurance',
    'Fielding Drills (2x/week): Catching practice, ground fielding, and throwing accuracy',
    'Match Simulation (1x/week): Practice match scenarios and pressure situations'
]).

sport_specific_training(swimming, [
    'Technique Drills (4x/week): Focus on stroke efficiency and breathing patterns',
    'Endurance Sets (3x/week): Long distance swims at moderate pace',
    'Sprint Training (2x/week): Short bursts at maximum effort with full recovery',
    'Dryland Training (2x/week): Core strength and shoulder stability exercises',
    'Recovery Swim (1x/week): Light swimming focusing on technique'
]).

sport_specific_training(running, [
    'Interval Training (2x/week): 400m repeats at 5K pace with 2min rest',
    'Long Runs (1-2x/week): Progressive distance building up to 90+ minutes',
    'Tempo Runs (1x/week): 20-30 minutes at half-marathon pace',
    'Hill Repeats (1x/week): 8-10 repeats on moderate incline',
    'Recovery Runs (2-3x/week): Easy pace focusing on form'
]).

% Default for other sports
sport_specific_training(_, [
    'Skill Development (3x/week): Sport-specific technique and movement patterns',
    'Strength Training (2x/week): Full-body exercises focusing on sport-specific movements',
    'Cardio Conditioning (2x/week): Sport-specific endurance training',
    'Flexibility Work (2x/week): Dynamic and static stretching',
    'Recovery Sessions (1x/week): Light activity and mobility work'
]).

% Fitness level training
fitness_level_training(beginner, [
    'Basic Conditioning (3x/week): Focus on proper form and technique',
    'Movement Skills (2x/week): Balance, coordination, and basic movement patterns',
    'Cardio Introduction (2-3x/week): Start with 20-30 minutes at moderate intensity',
    'Strength Foundation (2x/week): Bodyweight exercises and light resistance',
    'Recovery Focus (1x/week): Active recovery and mobility work'
]).

fitness_level_training(intermediate, [
    'Strength Training (3x/week): Progressive overload with compound movements',
    'Cardio Development (3-4x/week): Mix of endurance and interval training',
    'Flexibility Work (2x/week): Dynamic stretching and mobility exercises',
    'Skill Refinement (2x/week): Sport-specific technique improvement',
    'Recovery Protocol (1x/week): Foam rolling and active recovery'
]).

fitness_level_training(advanced, [
    'High-Intensity Training (2-3x/week): Complex movements and plyometrics',
    'Strength Focus (3-4x/week): Advanced lifting techniques and periodization',
    'Sport-Specific Conditioning (2x/week): Competition-specific drills and scenarios',
    'Recovery Optimization (1-2x/week): Advanced recovery techniques and mobility',
    'Performance Testing (Monthly): Regular assessment of progress and adjustments'
]).

% Diet recommendations based on sport and preferences
diet_recommendation(Sport, DietType, Recommendations) :-
    % Get sport-specific diet recommendations
    sport_specific_diet(Sport, SportDiet),
    
    % Get diet type recommendations
    diet_type_recommendations(DietType, DietRecommendations),
    
    % Filter sport-specific recommendations based on diet type
    filter_diet_recommendations(SportDiet, DietType, FilteredSportDiet),
    
    % Combine filtered recommendations
    append(FilteredSportDiet, DietRecommendations, Recommendations).

% Filter diet recommendations based on diet type
filter_diet_recommendations([], _, []).
filter_diet_recommendations([H|T], DietType, [H|FilteredT]) :-
    is_vegetarian_friendly(H, DietType),
    filter_diet_recommendations(T, DietType, FilteredT).
filter_diet_recommendations([H|T], DietType, FilteredT) :-
    \+ is_vegetarian_friendly(H, DietType),
    filter_diet_recommendations(T, DietType, FilteredT).

% CORRECTED: Check if a recommendation is vegetarian-friendly with clear cut rules
is_vegetarian_friendly(Recommendation, vegetarian) :-
    \+ contains_animal_products(Recommendation), !.
is_vegetarian_friendly(Recommendation, vegan) :-
    \+ contains_animal_products(Recommendation), !.
is_vegetarian_friendly(_, DietType) :- 
    DietType \= vegetarian,
    DietType \= vegan.

% CORRECTED: Enhanced check for animal products
contains_animal_products(String) :-
    (   sub_string(String, _, _, _, "meat")
    ;   sub_string(String, _, _, _, "chicken")
    ;   sub_string(String, _, _, _, "beef")
    ;   sub_string(String, _, _, _, "pork")
    ;   sub_string(String, _, _, _, "fish")
    ;   sub_string(String, _, _, _, "seafood")
    ;   sub_string(String, _, _, _, "eggs")
    ;   sub_string(String, _, _, _, "dairy")
    ;   sub_string(String, _, _, _, "milk")
    ;   sub_string(String, _, _, _, "cheese")
    ;   sub_string(String, _, _, _, "yogurt")
    ;   sub_string(String, _, _, _, "whey")
    ;   sub_string(String, _, _, _, "animal protein")
    ;   sub_string(String, _, _, _, "turkey")
    ;   sub_string(String, _, _, _, "salmon")
    ;   sub_string(String, _, _, _, "hard-boiled eggs")
    ;   sub_string(String, _, _, _, "greek yogurt")
    ;   sub_string(String, _, _, _, "cottage cheese")
    ).

% Sport specific diet
sport_specific_diet(cricket, [
    'Pre-Match Nutrition: Complex carbs 3-4 hours before (brown rice, quinoa, whole grain bread), light snack 1 hour before (banana, dates)',
    'During Match: Hydration with electrolytes, quick energy sources like bananas, dates, or energy bars',
    'Post-Match Recovery: Plant-based protein shake within 30 minutes, balanced meal within 2 hours',
    'Training Days: Higher carb intake for energy, focus on plant proteins (lentils, beans, tofu)',
    'Rest Days: Slightly reduced calories, focus on nutrient-dense foods (nuts, seeds, whole grains)'
]).

sport_specific_diet(swimming, [
    'Pre-Training: Light meal 2-3 hours before, focus on easily digestible carbs (oatmeal, banana, toast)',
    'During Training: Hydration with electrolytes, quick energy if needed (dates, energy gels)',
    'Post-Training: Plant-based protein-rich recovery meal within 30 minutes',
    'High-Intensity Days: Increased carb intake for energy (sweet potatoes, quinoa, brown rice)',
    'Recovery Days: Focus on anti-inflammatory foods (berries, turmeric, leafy greens) and hydration'
]).

sport_specific_diet(running, [
    'Pre-Run: Light meal 2-3 hours before, focus on complex carbs (oatmeal, whole grain toast, banana)',
    'During Long Runs: Energy gels/bars every 45-60 minutes, regular hydration',
    'Post-Run Recovery: 4:1 carb to protein ratio within 30 minutes (smoothie with plant milk, banana, and protein powder)',
    'Training Days: Higher carb intake, focus on whole grains (quinoa, brown rice, whole wheat pasta)',
    'Rest Days: Balanced meals with emphasis on recovery foods (nuts, seeds, leafy greens)'
]).

% Diet type recommendations with specific food items
diet_type_recommendations(vegetarian, [
    'Protein Sources: Lentils (1 cup cooked = 18g protein), Chickpeas (1 cup = 15g), Tofu (100g = 8g), Tempeh (100g = 19g), Seitan (100g = 25g), Quinoa (1 cup = 8g)',
    'Iron Sources: Spinach (1 cup cooked = 6.4mg), Lentils (1 cup = 6.6mg), Quinoa (1 cup = 2.8mg), Fortified cereals (1 serving = 18mg), Pumpkin seeds (1/4 cup = 4.2mg)',
    'B12 Sources: Fortified plant milks, Nutritional yeast (2 tbsp = 8mcg), Fortified cereals',
    'Meal Examples: Lentil curry with brown rice, Tofu stir-fry with quinoa, Chickpea salad with whole grain bread, Tempeh tacos with black beans',
    'Snacks: Hummus with vegetables, Mixed nuts and seeds, Roasted chickpeas, Edamame beans'
]).

diet_type_recommendations(vegan, [
    'Protein Sources: Seitan (100g = 25g), Lentils (1 cup = 18g), Chickpeas (1 cup = 15g), Tofu (100g = 8g), Tempeh (100g = 19g), Edamame (1 cup = 17g), Black beans (1 cup = 15g)',
    'Calcium Sources: Fortified plant milks (1 cup = 300mg), Tofu (100g = 350mg), Kale (1 cup = 100mg), Almonds (1/4 cup = 96mg), Chia seeds (2 tbsp = 179mg), Tahini (2 tbsp = 130mg)',
    'Omega-3 Sources: Flaxseeds (1 tbsp = 2.5g), Chia seeds (1 tbsp = 2.5g), Walnuts (1/4 cup = 2.5g), Hemp seeds (2 tbsp = 1.2g), Algae oil supplements',
    'Meal Examples: Seitan stir-fry with brown rice, Lentil soup with whole grain bread, Chickpea curry with quinoa, Tofu scramble with vegetables, Black bean tacos with avocado',
    'Snacks: Hummus with vegetables, Trail mix with nuts and seeds, Roasted chickpeas, Edamame beans, Fruit with nut butter, Vegan protein smoothie with plant milk'
]).

diet_type_recommendations(keto, [
    'Fat Sources: Avocado (1 medium = 21g fat), Olive oil (1 tbsp = 14g), Coconut oil (1 tbsp = 14g), Nuts (1/4 cup almonds = 14g)',
    'Protein Sources: Eggs (2 large = 12g), Chicken breast (100g = 31g), Salmon (100g = 22g), Beef (100g = 26g)',
    'Low-Carb Vegetables: Spinach (1 cup = 1g net carbs), Broccoli (1 cup = 3g), Cauliflower (1 cup = 3g), Zucchini (1 cup = 3g)',
    'Meal Examples: Grilled salmon with roasted vegetables, Chicken stir-fry with cauliflower rice, Beef steak with avocado salad',
    'Snacks: Cheese cubes with nuts, Hard-boiled eggs, Avocado with salt and pepper'
]).

diet_type_recommendations(high_protein, [
    'Plant Protein Sources: Lentils (1 cup = 18g), Chickpeas (1 cup = 15g), Tofu (100g = 8g), Tempeh (100g = 19g), Seitan (100g = 25g), Quinoa (1 cup = 8g), Edamame (1 cup = 17g), Black beans (1 cup = 15g)',
    'Dairy Protein (if not restricted): Greek yogurt (170g = 17g), Cottage cheese (1 cup = 28g), Whey protein (1 scoop = 24g)',
    'Meal Examples: Tofu stir-fry with quinoa and vegetables, Lentil curry with brown rice, Chickpea salad with whole grain bread, Black bean tacos with avocado',
    'Snacks: Hummus with vegetables, Mixed nuts and seeds, Roasted chickpeas, Edamame beans'
]).

diet_type_recommendations(balanced, [
    'Carbohydrates: Brown rice (1 cup = 45g), Quinoa (1 cup = 39g), Sweet potato (1 medium = 27g), Oats (1/2 cup = 27g)',
    'Proteins: Chicken breast (100g = 31g), Salmon (100g = 22g), Lentils (1 cup = 18g), Greek yogurt (170g = 17g)',
    'Fats: Avocado (1 medium = 21g), Olive oil (1 tbsp = 14g), Nuts (1/4 cup = 14-18g), Seeds (1/4 cup = 12-15g)',
    'Meal Examples: Grilled chicken with brown rice and vegetables, Salmon with quinoa and roasted vegetables, Lentil soup with whole grain bread',
    'Snacks: Fruit with nut butter, Greek yogurt with granola, Hummus with vegetables'
]).

% Injury recovery recommendations
injury_recovery_recommendations(InjuryType, RecoveryStatus, Recommendations) :-
    injury_specific_recovery(InjuryType, InjuryRecs),
    recovery_phase_recommendations(RecoveryStatus, PhaseRecs),
    append(InjuryRecs, PhaseRecs, Recommendations).

% Injury-specific recovery recommendations
injury_specific_recovery(muscle_strain, [
    'Initial Phase (0-72 hours): RICE protocol (Rest, Ice, Compression, Elevation)',
    'Gentle stretching after 48 hours if pain-free',
    'Progressive loading starting with isometric exercises',
    'Focus on eccentric strengthening once pain-free',
    'Gradual return to sport-specific movements',
    'Regular foam rolling and massage for affected area',
    'Monitor for any pain or discomfort during movement'
]).

injury_specific_recovery(sprain, [
    'Initial Phase (0-72 hours): RICE protocol and immobilization if needed',
    'Gentle range of motion exercises after 48 hours',
    'Proprioceptive training to restore joint awareness',
    'Progressive strengthening of surrounding muscles',
    'Balance and stability exercises',
    'Taping or bracing during return to activity',
    'Gradual reintroduction of sport-specific movements'
]).

injury_specific_recovery(fracture, [
    'Follow medical clearance strictly before starting rehabilitation',
    'Begin with isometric exercises when cleared',
    'Progressive bone loading under supervision',
    'Focus on maintaining fitness in unaffected areas',
    'Gradual return to weight-bearing activities',
    'Regular monitoring of healing progress',
    'Nutrition focus on calcium and vitamin D'
]).

injury_specific_recovery(tendonitis, [
    'Initial Phase: Reduce aggravating activities',
    'Eccentric strengthening protocol',
    'Address biomechanical issues',
    'Gradual return to activity with modified technique',
    'Regular stretching and mobility work',
    'Consider equipment modifications',
    'Monitor for any signs of recurrence'
]).

injury_specific_recovery(concussion, [
    'Complete rest until symptoms resolve',
    'Gradual return to activity following protocol',
    'Focus on cardiovascular fitness once cleared',
    'Avoid contact activities until fully cleared',
    'Monitor for any return of symptoms',
    'Consider cognitive rest if needed',
    'Regular follow-up with healthcare provider'
]).

% Recovery phase recommendations
recovery_phase_recommendations(in_recovery, [
    'Focus on maintaining general fitness',
    'Alternative training methods (e.g., pool-based)',
    'Regular monitoring of pain levels (stay below 3/10)',
    'Emphasis on proper technique and form',
    'Increased warm-up and cool-down time',
    'Regular communication with healthcare provider',
    'Nutrition focus on anti-inflammatory foods'
]).

recovery_phase_recommendations(partially_recovered, [
    'Modified training intensity (70-80% of normal)',
    'Gradual reintroduction of sport-specific movements',
    'Regular assessment of progress',
    'Focus on proper technique and form',
    'Increased recovery time between sessions',
    'Consider cross-training options',
    'Monitor for any signs of regression'
]).

recovery_phase_recommendations(fully_recovered, [
    'Gradual return to full training volume',
    'Continue preventive exercises',
    'Regular monitoring for any signs of recurrence',
    'Maintain proper warm-up and cool-down routines',
    'Consider ongoing maintenance program',
    'Regular assessment of movement patterns',
    'Focus on long-term injury prevention'
]).

% Modify the existing modify_training_for_injury predicate
modify_training_for_injury(InjuryType, RecoveryStatus, Modifications) :-
    injury_recovery_recommendations(InjuryType, RecoveryStatus, Recommendations),
    append([
        'Training Modifications:',
        '1. Reduce intensity and volume',
        '2. Focus on proper technique',
        '3. Increase recovery time',
        '4. Monitor pain levels',
        '5. Regular progress assessment'
    ], Recommendations, Modifications).

% Generate a personalized training plan
generate_training_plan(UserID, TrainingPlan) :-
    user_profile(UserID, _, _, _, _, _, FitnessLevel),
    user_sport(UserID, Sport, _),
    training_recommendation(Sport, FitnessLevel, BaseRecommendations),
    
    % Check for injuries and modify if needed
    findall(Mod, (
        user_injury(UserID, InjuryType, _, Severity, _, _),
        recovery_status(RecoveryStatus), % Make sure RecoveryStatus is bound
        modify_training_for_injury(InjuryType, RecoveryStatus, InjuryMods),
        member(Mod, InjuryMods)
    ), InjuryModifications),
    
    % Get competition information and adjust
    (competition_details(UserID, CompType, _, CompLevel) ->
        competition_adjustments(CompType, CompLevel, CompAdjustments)
    ;
        CompAdjustments = []
    ),
    
    % Combine all recommendations
    append(BaseRecommendations, InjuryModifications, Temp1),
    append(Temp1, CompAdjustments, TrainingPlan).

% Competition adjustments
competition_adjustments(olympics, international, [
    'Periodized peaking strategy for main event',
    'Simulation training for competition conditions',
    'Tapering protocol for peak performance'
]).

competition_adjustments(commonwealth, international, [
    'Multi-event preparation strategies',
    'Climate adaptation if needed',
    'Performance peaking strategy'
]).

competition_adjustments(_, national, [
    'Competition-specific preparation',
    'Tactical preparation',
    'Light taper before events'
]).

% Generate a nutrition plan
generate_nutrition_plan(UserID, NutritionPlan) :-
    user_sport(UserID, Sport, _),
    user_diet(UserID, DietType, Restrictions),
    diet_recommendation(Sport, DietType, BaseDiet),
    
    % Add restriction-specific recommendations
    (Restrictions \= [] ->
        dietary_restriction_adjustments(Restrictions, RestrictionAdjustments)
    ;
        RestrictionAdjustments = []
    ),
    
    % Combine recommendations
    append(BaseDiet, RestrictionAdjustments, NutritionPlan).

% Dietary restriction adjustments
dietary_restriction_adjustments(gluten_free, [
    'Alternative grains: rice, quinoa, buckwheat',
    'Label checking for hidden gluten',
    'Focus on naturally gluten-free carb sources'
]).

dietary_restriction_adjustments(lactose_free, [
    'Plant-based calcium sources',
    'Lactose-free protein alternatives',
    'Consider calcium supplementation'
]).

% Interface predicates for API calls
new_user(ID, Name, Age, Gender, Height, Weight, FitnessLevel) :-
    assertz(user_profile(ID, Name, Age, Gender, Height, Weight, FitnessLevel)).

set_sport(UserID, Sport, Level) :-
    sport_category(Sport),
    fitness_level(Level),
    retractall(user_sport(UserID, _, _)),
    assertz(user_sport(UserID, Sport, Level)).

set_competition(UserID, CompType, Format, Level) :-
    retractall(competition_details(UserID, _, _, _)),
    assertz(competition_details(UserID, CompType, Format, Level)).

% Add injury with new structure
add_injury(UserID, Type, Date, Severity, RecoveryTime, Notes) :-
    assertz(user_injury(UserID, Type, Date, Severity, RecoveryTime, Notes)).

% Add achievement with new structure
add_achievement(UserID, Title, Date, Category, Description) :-
    assertz(user_achievement(UserID, Title, Date, Category, Description)).

set_diet(UserID, DietType, Restrictions) :-
    diet_type(DietType),
    retractall(user_diet(UserID, _, _)),
    assertz(user_diet(UserID, DietType, Restrictions)).

% Get full plan for a user
get_full_plan(UserID, TrainingPlan, NutritionPlan, InjuryRecommendations) :-
    % Get user's fitness level
    (user_profile(UserID, _, _, _, _, _, FitnessLevel) -> true; FitnessLevel = beginner),
    
    % Get user's sport
    (user_sport(UserID, Sport, _) -> true; Sport = general),
    
    % Get user's diet preferences
    (user_diet(UserID, DietType, _) -> true; DietType = balanced),
    
    % Generate training plan
    training_recommendation(Sport, FitnessLevel, TrainingPlan),
    
    % Generate nutrition plan
    diet_recommendation(Sport, DietType, NutritionPlan),
    
    % Get injury recommendations if user has injuries
    (user_injury(UserID, _, _, _, _, _) ->
        get_injury_recommendations(UserID, InjuryRecommendations)
    ;
        InjuryRecommendations = ["No current injuries. Continue with regular training and recovery protocols."]
    ).

% Default training recommendations for general sport
training_recommendation(general, FitnessLevel, Plan) :-
    fitness_level_training(FitnessLevel, Plan).

% Default diet recommendations for balanced diet
diet_recommendation(_, balanced, [
    "Eat a balanced diet with carbohydrates, proteins, and healthy fats",
    "Stay hydrated with at least 2-3 liters of water daily",
    "Include plenty of fruits and vegetables in your meals"
]).

% Helper predicate to get the last element of a list
last([X], X).
last([_|T], X) :- last(T, X).

% Helper predicates for plan generation
get_training_plan(UserID, Plan) :-
    user_profile(UserID, _, _, _, _, _, FitnessLevel),
    user_sport(UserID, Sport, _),
    training_recommendation(Sport, FitnessLevel, Plan).

get_nutrition_plan(UserID, Plan) :-
    user_sport(UserID, Sport, _),
    user_diet(UserID, DietType, _),
    diet_recommendation(Sport, DietType, Plan).

% Sports categories
sport(running).
sport(swimming).
sport(cycling).
sport(weightlifting).
sport(yoga).
sport(basketball).
sport(soccer).
sport(tennis).

% Diet preferences
diet_preference(vegetarian).
diet_preference(vegan).
diet_preference(keto).
diet_preference(paleo).
diet_preference(mediterranean).
diet_preference(standard).
diet_preference(high_protein).

% Training plan rules
training_plan(beginner, running, Plan) :-
    Plan = [
        'Start with 20-30 minutes of light jogging, 3 times per week',
        'Include 5-10 minutes of dynamic stretching before each run',
        'Focus on maintaining a comfortable pace where you can hold a conversation',
        'Take rest days between running sessions',
        'Gradually increase duration by 5 minutes each week'
    ].

training_plan(intermediate, running, Plan) :-
    Plan = [
        'Run 4-5 times per week, mixing different types of runs',
        'Include one long run (60+ minutes) per week',
        'Add interval training: 8x400m with 90s rest',
        'Incorporate hill repeats once per week',
        'Include strength training 2-3 times per week'
    ].

training_plan(advanced, running, Plan) :-
    Plan = [
        'Run 5-6 times per week with structured workouts',
        'Long runs of 90+ minutes at moderate pace',
        'Speed work: 6x800m at 5K pace with 2min rest',
        'Tempo runs: 20-30 minutes at half-marathon pace',
        'Cross-training and strength training 2-3 times per week'
    ].

training_plan(beginner, swimming, Plan) :-
    Plan = [
        'Start with 20-30 minute sessions, 2-3 times per week',
        'Focus on basic freestyle technique',
        'Include rest periods between laps',
        'Practice breathing techniques',
        'Gradually increase distance each week'
    ].

training_plan(intermediate, swimming, Plan) :-
    Plan = [
        'Swim 3-4 times per week for 45-60 minutes',
        'Mix different strokes: freestyle, backstroke, breaststroke',
        'Include interval training: 10x100m with 30s rest',
        'Practice flip turns and starts',
        'Add dryland exercises 2 times per week'
    ].

training_plan(advanced, swimming, Plan) :-
    Plan = [
        'Swim 5-6 times per week with structured workouts',
        'Long sets: 10x200m at race pace',
        'Speed work: 20x50m sprints with 20s rest',
        'Technique drills for all strokes',
        'Strength training 3 times per week'
    ].

% Nutrition plan rules - these are redundant with diet_type_recommendations above
% but kept for compatibility
nutrition_plan(beginner, vegetarian, Plan) :-
    Plan = [
        'Focus on plant-based protein sources: beans, lentils, tofu',
        'Include whole grains: quinoa, brown rice, whole wheat',
        'Eat 5-6 small meals throughout the day',
        'Stay hydrated with 2-3 liters of water daily',
        'Include healthy fats: avocados, nuts, seeds'
    ].

nutrition_plan(intermediate, vegetarian, Plan) :-
    Plan = [
        'Increase protein intake with tempeh, seitan, and protein shakes',
        'Time carbohydrates around workouts',
        'Include recovery meals within 30 minutes post-workout',
        'Monitor iron and B12 levels',
        'Plan meals in advance for consistency'
    ].

nutrition_plan(advanced, vegetarian, Plan) :-
    Plan = [
        'Optimize protein timing: 20-30g every 3-4 hours',
        'Use supplements: B12, iron, omega-3s',
        'Implement carb cycling based on training intensity',
        'Track macronutrients for optimal performance',
        'Include anti-inflammatory foods: turmeric, ginger, berries'
    ].

nutrition_plan(beginner, keto, Plan) :-
    Plan = [
        'Focus on healthy fats: avocados, olive oil, nuts',
        'Include moderate protein: eggs, fish, poultry',
        'Limit carbs to 20-50g per day',
        'Stay hydrated and replenish electrolytes',
        'Include low-carb vegetables: leafy greens, broccoli'
    ].

nutrition_plan(intermediate, keto, Plan) :-
    Plan = [
        'Time carb intake around workouts',
        'Include MCT oil for energy',
        'Monitor ketone levels',
        'Plan meals to maintain ketosis',
        'Include electrolyte supplements'
    ].

nutrition_plan(advanced, keto, Plan) :-
    Plan = [
        'Implement targeted keto for high-intensity workouts',
        'Use exogenous ketones for performance',
        'Optimize fat intake for energy needs',
        'Include collagen for joint health',
        'Monitor micronutrient levels'
    ].

% Injury recommendations based on injury type and severity
injury_recommendation(Type, Severity, Recommendations) :-
    injury_type_recommendation(Type, TypeRecs),
    severity_recommendation(Severity, SeverityRecs),
    append(TypeRecs, SeverityRecs, Recommendations).

% Injury type specific recommendations
injury_type_recommendation('Knee', [
    'Focus on strengthening quadriceps and hamstrings',
    'Include low-impact exercises like swimming or cycling',
    'Avoid high-impact activities like running or jumping',
    'Use proper form during squats and lunges',
    'Consider using knee braces during training'
]).

injury_type_recommendation('Shoulder', [
    'Strengthen rotator cuff muscles',
    'Include shoulder mobility exercises',
    'Avoid overhead movements initially',
    'Focus on proper posture during exercises',
    'Gradually increase range of motion'
]).

injury_type_recommendation('Back', [
    'Strengthen core muscles',
    'Maintain proper posture during exercises',
    'Include flexibility exercises for spine',
    'Avoid heavy lifting initially',
    'Focus on proper form in all movements'
]).

injury_type_recommendation('Ankle', [
    'Strengthen calf muscles',
    'Include balance exercises',
    'Use proper footwear with good support',
    'Avoid uneven surfaces initially',
    'Consider ankle braces during training'
]).

injury_type_recommendation('Elbow', [
    'Strengthen forearm muscles',
    'Include wrist flexibility exercises',
    'Avoid repetitive movements',
    'Use proper grip techniques',
    'Gradually increase resistance'
]).

% Severity level recommendations
severity_recommendation('mild', [
    'Start with light intensity exercises',
    'Focus on proper form and technique',
    'Gradually increase intensity over 2-3 weeks',
    'Include regular rest days',
    'Monitor for any discomfort'
]).

severity_recommendation('moderate', [
    'Begin with rehabilitation exercises',
    'Focus on mobility before strength',
    'Gradually progress over 4-6 weeks',
    'Include more rest days initially',
    'Consider consulting a physiotherapist'
]).

severity_recommendation('severe', [
    'Start with very light rehabilitation',
    'Focus on mobility and flexibility first',
    'Progress very gradually over 8-12 weeks',
    'Include frequent rest periods',
    'Consult with a medical professional before starting'
]).

% Injury-specific recommendations
injury_recommendation(sprained_ankle, [
    "Focus on ankle strengthening exercises like calf raises and resistance band exercises",
    "Use proper ankle support during training and consider taping for high-impact activities"
]).

injury_recommendation(shoulder_impingement, [
    "Incorporate rotator cuff strengthening exercises with light resistance",
    "Avoid overhead movements until pain subsides and focus on proper shoulder mechanics"
]).

injury_recommendation(hamstring_strain, [
    "Gradually increase hamstring flexibility through controlled stretching",
    "Strengthen hamstrings with eccentric exercises like Nordic curls"
]).

injury_recommendation(knee_tendonitis, [
    "Reduce high-impact activities and focus on quadriceps strengthening",
    "Use proper warm-up and cool-down routines, including foam rolling"
]).

injury_recommendation(back_strain, [
    "Focus on core strengthening exercises to support the lower back",
    "Maintain proper posture during exercises and daily activities"
]).

% Get specific injury recommendations
get_injury_recommendations(UserId, Recommendations) :-
    findall(
        Recs,
        (user_injury(UserId, Type, _, _, _, _),
         injury_recommendation(Type, Recs)),
        InjuryRecs
    ),
    (InjuryRecs = [] ->
        Recommendations = ["No current injuries. Continue with regular training and recovery protocols."]
    ;
        flatten(InjuryRecs, AllRecs),
        % Take only the first 2-3 recommendations
        (length(AllRecs, L), L > 3 ->
            take(3, AllRecs, Recommendations)
        ;
            Recommendations = AllRecs
        )
    ).

% Helper predicate to take N elements from a list
take(0, _, []).
take(N, [H|T], [H|R]) :-
    N > 0,
    N1 is N - 1,
    take(N1, T, R).