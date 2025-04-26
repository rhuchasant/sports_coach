% Sports Fitness Coach Expert System

% User profile facts
:- dynamic user_profile/7.
% user_profile(ID, Name, Age, Gender, Height, Weight, FitnessLevel).

% Sport selection facts
:- dynamic user_sport/3.
% user_sport(UserID, Sport, Level).

% Competition details
:- dynamic competition_details/4.
% competition_details(UserID, CompetitionType, Format, Level).

% Medical history
:- dynamic injury_history/3.
% injury_history(UserID, InjuryType, RecoveryStatus).

% Past achievements
:- dynamic achievement/4.
% achievement(UserID, CompetitionName, Position, Year).

% Diet preferences
:- dynamic diet_preference/3.
% diet_preference(UserID, DietType, Restrictions).

% Training schedule
:- dynamic training_schedule/2.
% training_schedule(UserID, ScheduleList).

% Sports categories
sport_category(cricket).
sport_category(football).
sport_category(swimming).
sport_category(running).
sport_category(tennis).
sport_category(basketball).
sport_category(weightlifting).
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
sport_format(running, sprint).
sport_format(running, marathon).
sport_format(running, middle_distance).

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

% Diet types
diet_type(vegetarian).
diet_type(vegan).
diet_type(keto).
diet_type(paleo).
diet_type(balanced).
diet_type(high_protein).
diet_type(no_restrictions).

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
    'Net practice: 3 times per week',
    'Fielding drills: 2 times per week',
    'Match simulation: Once a week'
]).

sport_specific_training(swimming, [
    'Technique drills: 4 times per week',
    'Endurance training: 3 times per week',
    'Sprint work: 2 times per week'
]).

sport_specific_training(running, [
    'Interval training: 2 times per week',
    'Long runs: 1-2 times per week',
    'Recovery runs: 2-3 times per week'
]).

% Default for other sports
sport_specific_training(_, [
    'Sport specific skills: 3 times per week',
    'Tactical training: 2 times per week',
    'Match/Competition practice: Once a week'
]).

% Fitness level training
fitness_level_training(beginner, [
    'Basic conditioning: 3 times per week',
    'Fundamental movement skills: 2 times per week',
    'Light cardio: 2-3 times per week'
]).

fitness_level_training(intermediate, [
    'Moderate strength training: 3 times per week',
    'Cardio workouts: 3-4 times per week',
    'Flexibility training: 2 times per week'
]).

fitness_level_training(advanced, [
    'High-intensity interval training: 2-3 times per week',
    'Advanced strength training: 3-4 times per week',
    'Sport-specific conditioning: 2 times per week',
    'Recovery sessions: 1-2 times per week'
]).

fitness_level_training(elite, [
    'Periodized training plan',
    'Advanced strength and power training: 4-5 times per week',
    'Sport-specific technical work: Daily',
    'Monitored recovery sessions: 2-3 times per week',
    'Performance testing: Monthly'
]).

% Diet recommendations based on sport and preferences
diet_recommendation(Sport, DietType, Recommendations) :-
    sport_specific_diet(Sport, SportDiet),
    diet_type_recommendations(DietType, DietRecommendations),
    append(SportDiet, DietRecommendations, Recommendations).

% Sport specific diet
sport_specific_diet(cricket, [
    'Focus on sustained energy release',
    'Hydration strategy for long matches',
    'Recovery nutrition after matches and training'
]).

sport_specific_diet(swimming, [
    'Higher caloric intake to support training volume',
    'Pre-training carbohydrates',
    'Post-training protein within 30 minutes'
]).

sport_specific_diet(running, [
    'Carbohydrate timing around workouts',
    'Iron-rich foods to support oxygen transport',
    'Hydration strategy based on sweat rate'
]).

% Default for other sports
sport_specific_diet(_, [
    'Balanced macronutrients',
    'Adequate protein for recovery',
    'Carbohydrates timed around training'
]).

% Diet type recommendations
diet_type_recommendations(vegetarian, [
    'Plant-based protein sources: legumes, tofu, tempeh',
    'Iron-rich foods: spinach, lentils, fortified cereals',
    'B12 supplementation may be necessary'
]).

diet_type_recommendations(vegan, [
    'Complete protein combinations',
    'B12, iron, zinc, and calcium supplementation',
    'Omega-3 from flaxseeds and walnuts'
]).

diet_type_recommendations(keto, [
    'High quality fats',
    'Moderate protein intake',
    'Electrolyte supplementation',
    'Cyclical approach may be better for athletes'
]).

diet_type_recommendations(high_protein, [
    '1.6-2.2g protein per kg bodyweight',
    'Distribution of protein throughout the day',
    'Quality protein sources post-workout'
]).

diet_type_recommendations(balanced, [
    '50-60% carbohydrates, 15-20% protein, 25-30% fats',
    'Variety of whole foods',
    'Timing nutrition around training sessions'
]).

% Injury-specific training modifications
modify_training_for_injury(InjuryType, RecoveryStatus, Modifications) :-
    injury_specific_modifications(InjuryType, InjuryMods),
    recovery_status_modifications(RecoveryStatus, StatusMods),
    append(InjuryMods, StatusMods, Modifications).

% Injury specific modifications
injury_specific_modifications(muscle_strain, [
    'Avoid movements that stress the affected muscle',
    'Focus on opposing muscle groups',
    'Include gentle mobility work when pain-free'
]).

injury_specific_modifications(sprain, [
    'Reduce high-impact activities',
    'Include proprioceptive training',
    'Progressive loading once initial healing occurs'
]).

injury_specific_modifications(fracture, [
    'Follow medical clearance strictly',
    'Begin with isometric exercises when cleared',
    'Progressive bone loading under supervision'
]).

injury_specific_modifications(tendonitis, [
    'Reduce volume on affected tendon',
    'Eccentric strengthening protocol',
    'Address biomechanical issues'
]).

% Recovery status modifications
recovery_status_modifications(fully_recovered, [
    'Gradual return to full training volume',
    'Preventative exercises to avoid recurrence'
]).

recovery_status_modifications(partially_recovered, [
    'Modified training intensity (70-80% of normal)',
    'Extra warm-up and cool-down',
    'Regular reassessment'
]).

recovery_status_modifications(in_recovery, [
    'Alternative training methods (e.g., pool-based)',
    'Focus on unaffected areas',
    'Pain monitoring (stay below 3/10 pain)'
]).

recovery_status_modifications(chronic, [
    'Pain management strategies',
    'Activity modification rather than cessation',
    'Address contributing factors (mobility, strength, technique)'
]).

% Generate a personalized training plan
generate_training_plan(UserID, TrainingPlan) :-
    user_profile(UserID, _, _, _, _, _, FitnessLevel),
    user_sport(UserID, Sport, _),
    training_recommendation(Sport, FitnessLevel, BaseRecommendations),
    
    % Check for injuries and modify if needed
    findall(Mod, (
        injury_history(UserID, InjuryType, RecoveryStatus),
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
    (diet_preference(UserID, DietType, Restrictions) ->
        diet_recommendation(Sport, DietType, BaseDiet)
    ;
        diet_recommendation(Sport, balanced, BaseDiet)
    ),
    
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
    retractall(user_sport(UserID, _, _)),
    assertz(user_sport(UserID, Sport, Level)).

set_competition(UserID, CompType, Format, Level) :-
    retractall(competition_details(UserID, _, _, _)),
    assertz(competition_details(UserID, CompType, Format, Level)).

add_injury(UserID, InjuryType, RecoveryStatus) :-
    assertz(injury_history(UserID, InjuryType, RecoveryStatus)).

add_achievement(UserID, CompetitionName, Position, Year) :-
    assertz(achievement(UserID, CompetitionName, Position, Year)).

set_diet(UserID, DietType, Restrictions) :-
    retractall(diet_preference(UserID, _, _)),
    assertz(diet_preference(UserID, DietType, Restrictions)).

get_full_plan(UserID, TrainingPlan, NutritionPlan) :-
    generate_training_plan(UserID, TrainingPlan),
    generate_nutrition_plan(UserID, NutritionPlan).