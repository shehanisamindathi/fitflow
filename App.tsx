import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Linking,
  Alert,
  SafeAreaView,
} from 'react-native';

// Top level constants
const PRIVACY_URL = 'https://example.com/fitflow/privacy-policy';
const SUPPORT_EMAIL = 'support@fitflow-app.com';

// Theme tokens
const theme = {
  colors: {
    background: '#0B0F14',
    card: '#151B23',
    cardBorder: '#222C3A',
    accentGreen: '#00E676',
    cyan: '#22D3EE',
    orange: '#FF9800',
    pink: '#FF4081',
    white: '#FFFFFF',
    grey: '#8B98A8',
    darkInput: '#0F172A',
    badgeBg: '#1E293B',
    red: '#EF4444',
  },
  borderRadius: 16,
  minTouchTarget: 48,
  topPadding: 36,
  bottomTabBarPadding: 24,
};

// Types
export interface UserProfile {
  name: string;
  streakDays: number;
  goal: string;
  height: string;
  weight: string;
  targetWeight: string;
  calorieTarget: number;
}

export interface MealEntry {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface WorkoutItem {
  id: string;
  name: string;
  category: 'HIIT' | 'Strength' | 'Yoga & Flow' | 'Cardio';
  durationMinutes: number;
  calories: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isAiPrescribed: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  participantsCount: number;
  isJoined: boolean;
  badgeEmoji: string;
}

export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timeAgo: string;
}

type TabType = 'Home' | 'Workouts' | 'Nutrition' | 'Social' | 'Profile';
type StackType = null | 'LogMeal' | 'Challenges' | 'EditProfile' | 'Settings' | 'ReleaseNotes';

export default function App(): React.JSX.Element {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [activeStack, setActiveStack] = useState<StackType>(null);
  const [isCameraScan, setIsCameraScan] = useState<boolean>(false);

  // App State
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex',
    streakDays: 7,
    goal: 'Weight Loss & Muscle Strength',
    height: '178 cm',
    weight: '74 kg',
    targetWeight: '70 kg',
    calorieTarget: 2200,
  });

  const [meals, setMeals] = useState<MealEntry[]>([
    {
      id: 'm1',
      title: 'Avocado Toast & Egg Whites',
      category: 'Breakfast',
      calories: 420,
      protein: 24,
      carbs: 38,
      fat: 16,
      time: '08:30 AM',
    },
    {
      id: 'm2',
      title: 'Grilled Chicken Quinoa Bowl',
      category: 'Lunch',
      calories: 610,
      protein: 48,
      carbs: 55,
      fat: 18,
      time: '01:15 PM',
    },
    {
      id: 'm3',
      title: 'Greek Yogurt & Berries',
      category: 'Snack',
      calories: 210,
      protein: 18,
      carbs: 22,
      fat: 4,
      time: '04:45 PM',
    },
  ]);

  const [workouts] = useState<WorkoutItem[]>([
    {
      id: 'w1',
      name: 'AI High-Burn Circuit',
      category: 'HIIT',
      durationMinutes: 30,
      calories: 380,
      level: 'Intermediate',
      isAiPrescribed: true,
    },
    {
      id: 'w2',
      name: 'Full Body Power Hypertrophy',
      category: 'Strength',
      durationMinutes: 45,
      calories: 420,
      level: 'Advanced',
      isAiPrescribed: false,
    },
    {
      id: 'w3',
      name: 'Morning Vinyasa Energy Flow',
      category: 'Yoga & Flow',
      durationMinutes: 25,
      calories: 160,
      level: 'Beginner',
      isAiPrescribed: true,
    },
    {
      id: 'w4',
      name: 'Endurance Tempo Run',
      category: 'Cardio',
      durationMinutes: 40,
      calories: 510,
      level: 'Intermediate',
      isAiPrescribed: false,
    },
    {
      id: 'w5',
      name: 'Core & Mobility Restoration',
      category: 'Yoga & Flow',
      durationMinutes: 20,
      calories: 140,
      level: 'Beginner',
      isAiPrescribed: false,
    },
  ]);

  const [challenges, setChallenges] = useState<ChallengeItem[]>([
    {
      id: 'c1',
      title: '10,000 Steps Daily Challenge',
      description: 'Hit 10k steps every day for 14 days straight to unlock the Stamina Badge.',
      participantsCount: 1420,
      isJoined: true,
      badgeEmoji: '👟',
    },
    {
      id: 'c2',
      title: '30-Day Core & Stability Blitz',
      description: '15 minutes of dedicated daily core work for rock-solid posture & stability.',
      participantsCount: 890,
      isJoined: false,
      badgeEmoji: '⚡',
    },
    {
      id: 'c3',
      title: 'Hydration Hero Quest',
      description: 'Log 3 Liters of water daily for 7 days to keep your metabolism primed.',
      participantsCount: 2150,
      isJoined: false,
      badgeEmoji: '💧',
    },
  ]);

  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: 'p1',
      author: 'Jordan Miller',
      handle: '@jordan_fit',
      avatar: 'JM',
      text: 'Just finished today’s AI Prescribed HIIT Flow! Smashed 380 kcal in 30 mins. Who else is hitting their targets today? 🚀🔥',
      likes: 24,
      comments: 5,
      isLiked: false,
      timeAgo: '2h ago',
    },
    {
      id: 'p2',
      author: 'Taylor Chen',
      handle: '@taylor_runner',
      avatar: 'TC',
      text: '7-day streak complete! 🎯 Staying consistent thanks to the daily flow recommendations on FitFlow.',
      likes: 41,
      comments: 8,
      isLiked: true,
      timeAgo: '5h ago',
    },
    {
      id: 'p3',
      author: 'Samantha Reed',
      handle: '@sam_wellness',
      avatar: 'SR',
      text: 'Prepared my post-workout chicken bowl! Perfect macro ratio for today’s lifting session 🥗💪',
      likes: 19,
      comments: 3,
      isLiked: false,
      timeAgo: '1d ago',
    },
  ]);

  // Filtering state for Workouts screen
  const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState<string>('All');

  // Form State for Log Meal
  const [mealCategory, setMealCategory] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Lunch');
  const [mealTitle, setMealTitle] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealProtein, setMealProtein] = useState('');
  const [mealCarbs, setMealCarbs] = useState('');
  const [mealFat, setMealFat] = useState('');

  // Form State for Edit Profile
  const [editName, setEditName] = useState(user.name);
  const [editGoal, setEditGoal] = useState(user.goal);
  const [editHeight, setEditHeight] = useState(user.height);
  const [editWeight, setEditWeight] = useState(user.weight);
  const [editTargetWeight, setEditTargetWeight] = useState(user.targetWeight);
  const [editCalorieTarget, setEditCalorieTarget] = useState(user.calorieTarget.toString());

  // Settings Support info toggle
  const [showSupportInfo, setShowSupportInfo] = useState(false);

  // Derived Values
  const caloriesEaten = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);
  const caloriesLeft = Math.max(user.calorieTarget - caloriesEaten, 0);

  // Handlers
  const openLogMeal = (cameraMode: boolean) => {
    setIsCameraScan(cameraMode);
    if (cameraMode) {
      setMealTitle('AI Scanned Salmon Quinoa Bowl');
      setMealCalories('580');
      setMealProtein('42');
      setMealCarbs('48');
      setMealFat('16');
    } else {
      setMealTitle('');
      setMealCalories('');
      setMealProtein('');
      setMealCarbs('');
      setMealFat('');
    }
    setActiveStack('LogMeal');
  };

  const handleSaveMeal = () => {
    if (!mealTitle.trim()) {
      Alert.alert('Missing Field', 'Please enter a meal name.');
      return;
    }
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMeal: MealEntry = {
      id: 'm_' + Date.now(),
      title: mealTitle.trim(),
      category: mealCategory,
      calories: parseInt(mealCalories, 10) || 0,
      protein: parseInt(mealProtein, 10) || 0,
      carbs: parseInt(mealCarbs, 10) || 0,
      fat: parseInt(mealFat, 10) || 0,
      time: timeStr,
    };
    setMeals([newMeal, ...meals]);
    setActiveStack(null);
  };

  const toggleChallengeJoin = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextJoined = !c.isJoined;
          return {
            ...c,
            isJoined: nextJoined,
            participantsCount: nextJoined ? c.participantsCount + 1 : c.participantsCount - 1,
          };
        }
        return c;
      })
    );
  };

  const toggleLikePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const openEditProfile = () => {
    setEditName(user.name);
    setEditGoal(user.goal);
    setEditHeight(user.height);
    setEditWeight(user.weight);
    setEditTargetWeight(user.targetWeight);
    setEditCalorieTarget(user.calorieTarget.toString());
    setActiveStack('EditProfile');
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return;
    }
    setUser({
      ...user,
      name: editName.trim(),
      goal: editGoal.trim(),
      height: editHeight.trim(),
      weight: editWeight.trim(),
      targetWeight: editTargetWeight.trim(),
      calorieTarget: parseInt(editCalorieTarget, 10) || 2200,
    });
    setActiveStack(null);
  };

  const handleOpenPrivacy = async () => {
    try {
      const supported = await Linking.canOpenURL(PRIVACY_URL);
      if (supported) {
        await Linking.openURL(PRIVACY_URL);
      } else {
        Alert.alert('Privacy Policy', `Opening URL: ${PRIVACY_URL}`);
      }
    } catch {
      Alert.alert('Privacy Policy', `Privacy policy link: ${PRIVACY_URL}`);
    }
  };

  // User Initial
  const userInitial = user.name.trim() ? user.name.trim()[0].toUpperCase() : 'A';

  // Workouts Filter
  const filteredWorkouts = workouts.filter((w) => {
    if (selectedWorkoutCategory === 'All') return true;
    return w.category === selectedWorkoutCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Render Active Stack Screen if open, else render Active Tab */}
        {activeStack === 'LogMeal' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.screenHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveStack(null)}
                accessibilityLabel="Back to Nutrition"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.screenTitle}>{isCameraScan ? 'AI Camera Meal Scan' : 'Log Meal Entry'}</Text>
            </View>

            {isCameraScan && (
              <View style={styles.cameraBox}>
                <Text style={styles.cameraIcon}>📸</Text>
                <Text style={styles.cameraTitle}>AI Vision Preview Box</Text>
                <Text style={styles.cameraSubtitle}>
                  Scanning dish macros... 96% confidence score.
                </Text>
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>✓ Salmon Quinoa Bowl Detected</Text>
                </View>
              </View>
            )}

            <Text style={styles.fieldLabel}>Meal Category</Text>
            <View style={styles.chipRow}>
              {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, mealCategory === cat && styles.chipActive]}
                  onPress={() => setMealCategory(cat)}
                  accessibilityLabel={`Select category ${cat}`}
                  accessibilityRole="button"
                >
                  <Text style={[styles.chipText, mealCategory === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Meal Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Grilled Chicken Bowl"
                placeholderTextColor={theme.colors.grey}
                value={mealTitle}
                onChangeText={setMealTitle}
                accessibilityLabel="Meal Name Input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Calories (kcal)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 550"
                placeholderTextColor={theme.colors.grey}
                keyboardType="numeric"
                value={mealCalories}
                onChangeText={setMealCalories}
                accessibilityLabel="Calories Input"
              />
            </View>

            <Text style={styles.fieldLabel}>Macros (Grams)</Text>
            <View style={styles.macroRow}>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Protein (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  placeholderTextColor={theme.colors.grey}
                  keyboardType="numeric"
                  value={mealProtein}
                  onChangeText={setMealProtein}
                  accessibilityLabel="Protein Input"
                />
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Carbs (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  placeholderTextColor={theme.colors.grey}
                  keyboardType="numeric"
                  value={mealCarbs}
                  onChangeText={setMealCarbs}
                  accessibilityLabel="Carbs Input"
                />
              </View>
              <View style={styles.macroCol}>
                <Text style={styles.macroLabel}>Fat (g)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  placeholderTextColor={theme.colors.grey}
                  keyboardType="numeric"
                  value={mealFat}
                  onChangeText={setMealFat}
                  accessibilityLabel="Fat Input"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSaveMeal}
              accessibilityLabel="Save Meal Entry"
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Save Meal Entry</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeStack === 'Challenges' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.screenHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveStack(null)}
                accessibilityLabel="Back to Social"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Community Challenges</Text>
            </View>

            <View style={styles.cardList}>
              {challenges.map((c) => (
                <View key={c.id} style={styles.card}>
                  <View style={styles.cardRow}>
                    <Text style={styles.emojiBadge}>{c.badgeEmoji}</Text>
                    <View style={styles.cardCol}>
                      <Text style={styles.cardTitle}>{c.title}</Text>
                      <Text style={styles.cardMetaText}>
                        👥 {c.participantsCount.toLocaleString()} Participants Joined
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cardDesc}>{c.description}</Text>

                  <TouchableOpacity
                    style={[styles.primaryButton, c.isJoined && styles.secondaryButton]}
                    onPress={() => toggleChallengeJoin(c.id)}
                    accessibilityLabel={c.isJoined ? `Leave challenge ${c.title}` : `Join challenge ${c.title}`}
                    accessibilityRole="button"
                  >
                    <Text style={[styles.primaryButtonText, c.isJoined && styles.secondaryButtonText]}>
                      {c.isJoined ? 'Joined ✓' : 'Join Challenge'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {activeStack === 'EditProfile' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.screenHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveStack(null)}
                accessibilityLabel="Back to Profile"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Edit Profile</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Name"
                placeholderTextColor={theme.colors.grey}
                accessibilityLabel="Full Name Input"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Fitness Goal</Text>
              <TextInput
                style={styles.textInput}
                value={editGoal}
                onChangeText={setEditGoal}
                placeholder="Fitness Goal"
                placeholderTextColor={theme.colors.grey}
                accessibilityLabel="Fitness Goal Input"
              />
            </View>

            <View style={styles.rowTwo}>
              <View style={styles.macroCol}>
                <Text style={styles.fieldLabel}>Height</Text>
                <TextInput
                  style={styles.textInput}
                  value={editHeight}
                  onChangeText={setEditHeight}
                  placeholder="Height"
                  placeholderTextColor={theme.colors.grey}
                  accessibilityLabel="Height Input"
                />
              </View>

              <View style={styles.macroCol}>
                <Text style={styles.fieldLabel}>Current Weight</Text>
                <TextInput
                  style={styles.textInput}
                  value={editWeight}
                  onChangeText={setEditWeight}
                  placeholder="Weight"
                  placeholderTextColor={theme.colors.grey}
                  accessibilityLabel="Current Weight Input"
                />
              </View>
            </View>

            <View style={styles.rowTwo}>
              <View style={styles.macroCol}>
                <Text style={styles.fieldLabel}>Target Weight</Text>
                <TextInput
                  style={styles.textInput}
                  value={editTargetWeight}
                  onChangeText={setEditTargetWeight}
                  placeholder="Target Weight"
                  placeholderTextColor={theme.colors.grey}
                  accessibilityLabel="Target Weight Input"
                />
              </View>

              <View style={styles.macroCol}>
                <Text style={styles.fieldLabel}>Calorie Target</Text>
                <TextInput
                  style={styles.textInput}
                  value={editCalorieTarget}
                  onChangeText={setEditCalorieTarget}
                  keyboardType="numeric"
                  placeholder="Calorie Target"
                  placeholderTextColor={theme.colors.grey}
                  accessibilityLabel="Calorie Target Input"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSaveProfile}
              accessibilityLabel="Save Profile Changes"
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Save Profile Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeStack === 'Settings' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.screenHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveStack(null)}
                accessibilityLabel="Back to Home"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Settings</Text>
            </View>

            <View style={styles.cardCenter}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>⚡</Text>
              </View>
              <Text style={styles.appNameText}>FitFlow</Text>
              <Text style={styles.appVersionText}>Version 2.0.0 (Code 1)</Text>
              <View style={styles.labPill}>
                <Text style={styles.labPillText}>UNIVERSITY HCI LAB EDITION</Text>
              </View>
            </View>

            <Text style={styles.sectionHeaderTitle}>Legal & Compliance</Text>
            <View style={styles.cardGroup}>
              <TouchableOpacity
                style={styles.listRow}
                onPress={handleOpenPrivacy}
                accessibilityLabel="View Privacy Policy"
                accessibilityRole="button"
              >
                <Text style={styles.rowIconText}>🔒</Text>
                <Text style={styles.rowLabelText}>View Privacy Policy</Text>
                <Text style={styles.rowChevronText}>→</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.listRow}
                onPress={() => setActiveStack('ReleaseNotes')}
                accessibilityLabel="Release Notes and Version History"
                accessibilityRole="button"
              >
                <Text style={styles.rowIconText}>📋</Text>
                <Text style={styles.rowLabelText}>Release Notes & Version History</Text>
                <Text style={styles.rowChevronText}>→</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.listRow}
                onPress={() => setShowSupportInfo(!showSupportInfo)}
                accessibilityLabel="Support Contact and Bug Reports"
                accessibilityRole="button"
              >
                <Text style={styles.rowIconText}>🎧</Text>
                <Text style={styles.rowLabelText}>Support Contact & Bug Reports</Text>
                <Text style={styles.rowChevronText}>{showSupportInfo ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {showSupportInfo && (
                <View style={styles.supportBox}>
                  <Text style={styles.supportLabel}>Support Email Address:</Text>
                  <Text style={styles.supportEmail}>{SUPPORT_EMAIL}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {activeStack === 'ReleaseNotes' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.screenHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setActiveStack('Settings')}
                accessibilityLabel="Back to Settings"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.screenTitle}>Release Notes</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardRowBetween}>
                <Text style={styles.cardTitleAccent}>v2.0.0 (Code 1)</Text>
                <Text style={styles.cardSubText}>October 2026</Text>
              </View>
              <Text style={styles.bulletText}>• Complete HCI Dark Theme UI (#0B0F14, neon green accents).</Text>
              <Text style={styles.bulletText}>• AI Daily Flow workout recommendation engine.</Text>
              <Text style={styles.bulletText}>• AI Camera vision meal scan preview capability.</Text>
              <Text style={styles.bulletText}>• Community challenges state persistence.</Text>
              <Text style={styles.bulletText}>• Full accessibilityLabel coverage across all buttons.</Text>
            </View>
          </ScrollView>
        )}

        {/* Render Tab Screens when no stack screen is active */}
        {activeStack === null && activeTab === 'Home' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.topHeaderRow}>
              <View>
                <Text style={styles.subGreeting}>GOOD DAY</Text>
                <Text style={styles.mainGreeting}>Welcome back, {user.name} 👋</Text>
              </View>
              <TouchableOpacity
                style={styles.gearButton}
                onPress={() => setActiveStack('Settings')}
                accessibilityLabel="Open Settings"
                accessibilityRole="button"
              >
                <Text style={styles.gearEmoji}>⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Streak Card */}
            <View style={styles.streakCard}>
              <Text style={styles.streakIcon}>🔥</Text>
              <View style={styles.streakTextCol}>
                <Text style={styles.streakTitle}>{user.streakDays} Day Active Streak!</Text>
                <Text style={styles.streakSub}>Consistency is key. Keep up the daily flow!</Text>
              </View>
            </View>

            {/* AI Daily Flow Card */}
            <View style={styles.aiCard}>
              <View style={styles.aiPill}>
                <Text style={styles.aiPillText}>🤖 AI RECOMMENDED</Text>
              </View>
              <Text style={styles.aiTitle}>AI Daily Flow: High-Burn Circuit</Text>
              <Text style={styles.aiSub}>Custom tailored based on your recovery & baseline goal.</Text>
              <View style={styles.aiStatsRow}>
                <View style={styles.miniTag}>
                  <Text style={styles.miniTagText}>⏱️ 30 Mins</Text>
                </View>
                <View style={styles.miniTag}>
                  <Text style={styles.miniTagText}>🔥 380 Kcal</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setActiveTab('Workouts')}
                accessibilityLabel="Start Today's AI Flow Workout"
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>Start Today's Flow ▶</Text>
              </TouchableOpacity>
            </View>

            {/* Daily Summary 2x2 Grid */}
            <Text style={styles.sectionHeaderTitle}>Daily Summary</Text>
            <View style={styles.grid2x2}>
              {/* Box 1: Burned */}
              <View style={styles.gridCard}>
                <View style={styles.cardRowBetween}>
                  <Text style={styles.gridIcon}>🔥</Text>
                  <Text style={styles.gridValText}>650 / 800</Text>
                </View>
                <Text style={styles.gridLabelText}>Calories Burned</Text>
                <View style={styles.track}>
                  <View style={[styles.fillBar, { width: '81%', backgroundColor: theme.colors.accentGreen }]} />
                </View>
              </View>

              {/* Box 2: Active Mins */}
              <View style={styles.gridCard}>
                <View style={styles.cardRowBetween}>
                  <Text style={styles.gridIcon}>⏱️</Text>
                  <Text style={styles.gridValText}>45 / 60</Text>
                </View>
                <Text style={styles.gridLabelText}>Active Minutes</Text>
                <View style={styles.track}>
                  <View style={[styles.fillBar, { width: '75%', backgroundColor: theme.colors.cyan }]} />
                </View>
              </View>

              {/* Box 3: Calories Eaten */}
              <View style={styles.gridCard}>
                <View style={styles.cardRowBetween}>
                  <Text style={styles.gridIcon}>🥗</Text>
                  <Text style={styles.gridValText}>
                    {caloriesEaten} / {user.calorieTarget}
                  </Text>
                </View>
                <Text style={styles.gridLabelText}>Calories Eaten</Text>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fillBar,
                      {
                        width: `${Math.min((caloriesEaten / user.calorieTarget) * 100, 100)}%`,
                        backgroundColor: theme.colors.orange,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Box 4: Water */}
              <View style={styles.gridCard}>
                <View style={styles.cardRowBetween}>
                  <Text style={styles.gridIcon}>💧</Text>
                  <Text style={styles.gridValText}>2.1 / 3.0 L</Text>
                </View>
                <Text style={styles.gridLabelText}>Water Intake</Text>
                <View style={styles.track}>
                  <View style={[styles.fillBar, { width: '70%', backgroundColor: theme.colors.pink }]} />
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        {activeStack === null && activeTab === 'Workouts' && (
          <View style={styles.screenWrapper}>
            <View style={styles.staticHeader}>
              <Text style={styles.screenTitle}>Workout Library</Text>
              <Text style={styles.screenSubTitle}>Filter training routines & AI flow workouts</Text>
            </View>

            {/* Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScrollView}>
              {['All', 'HIIT', 'Strength', 'Yoga & Flow', 'Cardio'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterChip, selectedWorkoutCategory === cat && styles.filterChipActive]}
                  onPress={() => setSelectedWorkoutCategory(cat)}
                  accessibilityLabel={`Filter by ${cat}`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[styles.filterChipText, selectedWorkoutCategory === cat && styles.filterChipTextActive]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.scrollListContainer} showsVerticalScrollIndicator={false}>
              {filteredWorkouts.map((w) => (
                <View key={w.id} style={styles.card}>
                  <View style={styles.cardRowBetween}>
                    <View style={styles.catBadge}>
                      <Text style={styles.catBadgeText}>{w.category.toUpperCase()}</Text>
                    </View>
                    {w.isAiPrescribed && (
                      <View style={styles.aiBadge}>
                        <Text style={styles.aiBadgeText}>🤖 AI PRESCRIBED</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.cardTitle}>{w.name}</Text>

                  <View style={styles.workoutMetaBox}>
                    <View style={styles.metaColItem}>
                      <Text style={styles.metaLabel}>DURATION</Text>
                      <Text style={styles.metaVal}>⏱️ {w.durationMinutes} mins</Text>
                    </View>
                    <View style={styles.metaColItem}>
                      <Text style={styles.metaLabel}>CALORIES</Text>
                      <Text style={styles.metaVal}>🔥 {w.calories} kcal</Text>
                    </View>
                    <View style={styles.metaColItem}>
                      <Text style={styles.metaLabel}>LEVEL</Text>
                      <Text style={styles.metaVal}>🎯 {w.level}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    accessibilityLabel={`Start ${w.name}`}
                    accessibilityRole="button"
                  >
                    <Text style={styles.secondaryButtonText}>Start Workout</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {activeStack === null && activeTab === 'Nutrition' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.staticHeader}>
              <Text style={styles.screenTitle}>Nutrition Tracker</Text>
              <Text style={styles.screenSubTitle}>Track daily calories, macros & AI meal logs</Text>
            </View>

            {/* Calorie Summary Card */}
            <View style={styles.card}>
              <Text style={styles.cardHeaderSmall}>CALORIE SUMMARY</Text>
              <View style={styles.rowThree}>
                <View style={styles.macroCol}>
                  <Text style={styles.summaryNum}>{user.calorieTarget}</Text>
                  <Text style={styles.summarySubLabel}>Target kcal</Text>
                </View>
                <View style={styles.macroCol}>
                  <Text style={[styles.summaryNum, { color: theme.colors.orange }]}>{caloriesEaten}</Text>
                  <Text style={styles.summarySubLabel}>Eaten kcal</Text>
                </View>
                <View style={styles.macroCol}>
                  <Text style={[styles.summaryNum, { color: theme.colors.accentGreen }]}>{caloriesLeft}</Text>
                  <Text style={styles.summarySubLabel}>Kcal Left</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.cardHeaderSmall}>MACRONUTRIENTS LOGGED</Text>
              <View style={styles.rowThree}>
                <View style={styles.macroBox}>
                  <Text style={[styles.macroValText, { color: theme.colors.accentGreen }]}>{totalProtein}g</Text>
                  <Text style={styles.macroLabelText}>Protein (150g)</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={[styles.macroValText, { color: theme.colors.cyan }]}>{totalCarbs}g</Text>
                  <Text style={styles.macroLabelText}>Carbs (220g)</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={[styles.macroValText, { color: theme.colors.orange }]}>{totalFat}g</Text>
                  <Text style={styles.macroLabelText}>Fat (65g)</Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => openLogMeal(true)}
              accessibilityLabel="Scan Meal with AI Camera"
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>📸 Scan Meal with AI Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { marginTop: 10 }]}
              onPress={() => openLogMeal(false)}
              accessibilityLabel="Add Meal Manually"
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>+ Add Manual</Text>
            </TouchableOpacity>

            {/* Today's Meals */}
            <Text style={styles.sectionHeaderTitle}>Today's Logged Meals</Text>
            <View style={styles.cardList}>
              {meals.map((m) => (
                <View key={m.id} style={styles.mealCard}>
                  <View style={styles.cardRowBetween}>
                    <View style={styles.catBadge}>
                      <Text style={styles.catBadgeText}>{m.category.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.mealTimeText}>{m.time}</Text>
                  </View>
                  <Text style={styles.mealTitleText}>{m.title}</Text>
                  <View style={styles.cardRowBetween}>
                    <Text style={styles.mealCalText}>🔥 {m.calories} kcal</Text>
                    <Text style={styles.mealMacroText}>
                      P:{m.protein}g | C:{m.carbs}g | F:{m.fat}g
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {activeStack === null && activeTab === 'Social' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.staticHeader}>
              <Text style={styles.screenTitle}>Social & Community</Text>
              <Text style={styles.screenSubTitle}>Connect with lab peers & fitness challenges</Text>
            </View>

            {/* Challenges Banner Button */}
            <TouchableOpacity
              style={styles.bannerCard}
              onPress={() => setActiveStack('Challenges')}
              accessibilityLabel="View Community Challenges"
              accessibilityRole="button"
            >
              <View style={styles.bannerTextCol}>
                <View style={styles.bannerBadge}>
                  <Text style={styles.bannerBadgeText}>🏆 ACTIVE CHALLENGES</Text>
                </View>
                <Text style={styles.bannerTitle}>Join HCI Lab Challenges</Text>
                <Text style={styles.bannerSub}>Compete on step goals, hydration & daily flows</Text>
              </View>
              <Text style={styles.bannerArrow}>→</Text>
            </TouchableOpacity>

            <Text style={styles.sectionHeaderTitle}>Community Feed</Text>
            <View style={styles.cardList}>
              {posts.map((p) => (
                <View key={p.id} style={styles.card}>
                  <View style={styles.postHeaderRow}>
                    <View style={styles.avatarMiniCircle}>
                      <Text style={styles.avatarMiniText}>{p.avatar}</Text>
                    </View>
                    <View>
                      <Text style={styles.postAuthorName}>{p.author}</Text>
                      <Text style={styles.postMetaText}>
                        {p.handle} • {p.timeAgo}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.postBodyText}>{p.text}</Text>

                  <View style={styles.postActionsRow}>
                    <TouchableOpacity
                      style={[styles.likeBtn, p.isLiked && styles.likeBtnActive]}
                      onPress={() => toggleLikePost(p.id)}
                      accessibilityLabel={`Like post by ${p.author}`}
                      accessibilityRole="button"
                    >
                      <Text style={styles.actionIconText}>{p.isLiked ? '❤️' : '🤍'}</Text>
                      <Text style={[styles.actionLabelText, p.isLiked && styles.likeTextActive]}>
                        {p.likes} Likes
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.commentBtn}>
                      <Text style={styles.actionIconText}>💬</Text>
                      <Text style={styles.actionLabelText}>{p.comments} Comments</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {activeStack === null && activeTab === 'Profile' && (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Profile Center Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatarBigCircle}>
                <Text style={styles.avatarBigText}>{userInitial}</Text>
              </View>
              <Text style={styles.profileNameText}>{user.name}</Text>
              <Text style={styles.profileGoalText}>{user.goal}</Text>

              <View style={styles.streakBadgePill}>
                <Text style={styles.streakBadgePillText}>🔥 {user.streakDays} Day Active Streak</Text>
              </View>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={openEditProfile}
                accessibilityLabel="Edit Profile"
                accessibilityRole="button"
              >
                <Text style={styles.secondaryButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Baseline Metrics Grid */}
            <Text style={styles.sectionHeaderTitle}>Baseline Metrics</Text>
            <View style={styles.cardList}>
              <View style={styles.metricItemCard}>
                <Text style={styles.metricLabelText}>PRIMARY GOAL</Text>
                <Text style={styles.metricValText}>{user.goal}</Text>
              </View>

              <View style={styles.rowTwo}>
                <View style={styles.metricHalfCard}>
                  <Text style={styles.metricLabelText}>HEIGHT</Text>
                  <Text style={styles.metricValText}>{user.height}</Text>
                </View>
                <View style={styles.metricHalfCard}>
                  <Text style={styles.metricLabelText}>CURRENT WEIGHT</Text>
                  <Text style={styles.metricValText}>{user.weight}</Text>
                </View>
              </View>

              <View style={styles.rowTwo}>
                <View style={styles.metricHalfCard}>
                  <Text style={styles.metricLabelText}>TARGET WEIGHT</Text>
                  <Text style={styles.metricValText}>{user.targetWeight}</Text>
                </View>
                <View style={styles.metricHalfCard}>
                  <Text style={styles.metricLabelText}>CALORIE TARGET</Text>
                  <Text style={styles.metricValText}>{user.calorieTarget} kcal</Text>
                </View>
              </View>
            </View>

            {/* 3 Achievement Badges */}
            <Text style={styles.sectionHeaderTitle}>Achievement Badges</Text>
            <View style={styles.cardList}>
              <View style={styles.badgeRowCard}>
                <Text style={styles.badgeEmojiText}>🌅</Text>
                <View style={styles.badgeColText}>
                  <Text style={styles.badgeTitleText}>Early Bird</Text>
                  <Text style={styles.badgeSubText}>Completed 5 morning workouts</Text>
                </View>
                <View style={styles.unlockedTagPill}>
                  <Text style={styles.unlockedTagText}>UNLOCKED</Text>
                </View>
              </View>

              <View style={styles.badgeRowCard}>
                <Text style={styles.badgeEmojiText}>🧘</Text>
                <View style={styles.badgeColText}>
                  <Text style={styles.badgeTitleText}>Flow Master</Text>
                  <Text style={styles.badgeSubText}>Completed 10 AI Daily Flows</Text>
                </View>
                <View style={styles.unlockedTagPill}>
                  <Text style={styles.unlockedTagText}>UNLOCKED</Text>
                </View>
              </View>

              <View style={styles.badgeRowCard}>
                <Text style={styles.badgeEmojiText}>💧</Text>
                <View style={styles.badgeColText}>
                  <Text style={styles.badgeTitleText}>Hydration Champ</Text>
                  <Text style={styles.badgeSubText}>Hit 3.0L water 7 days in a row</Text>
                </View>
                <View style={styles.unlockedTagPill}>
                  <Text style={styles.unlockedTagText}>UNLOCKED</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Bottom Tab Bar (Visible when no stack screen is active) */}
      {activeStack === null && (
        <View style={styles.tabBar}>
          {(
            [
              { key: 'Home', label: 'Home', emoji: '🏠' },
              { key: 'Workouts', label: 'Workouts', emoji: '🏋️' },
              { key: 'Nutrition', label: 'Nutrition', emoji: '🥗' },
              { key: 'Social', label: 'Social', emoji: '👥' },
              { key: 'Profile', label: 'Profile', emoji: '👤' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab.key)}
                accessibilityLabel={`Navigate to ${tab.label} tab`}
                accessibilityRole="button"
              >
                <View style={[styles.tabIconCircle, isActive && styles.tabIconCircleActive]}>
                  <Text style={styles.tabEmoji}>{tab.emoji}</Text>
                </View>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.topPadding,
  },
  mainContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  screenWrapper: {
    flex: 1,
  },
  scrollListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subGreeting: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.accentGreen,
    letterSpacing: 1.2,
  },
  mainGreeting: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.white,
    marginTop: 2,
  },
  gearButton: {
    width: theme.minTouchTarget,
    height: theme.minTouchTarget,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearEmoji: {
    fontSize: 20,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1.5,
    borderColor: theme.colors.orange,
    padding: 16,
    marginBottom: 16,
  },
  streakIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  streakTextCol: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.orange,
  },
  streakSub: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 2,
  },
  aiCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1.5,
    borderColor: theme.colors.accentGreen,
    padding: 16,
    marginBottom: 20,
  },
  aiPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  aiPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.accentGreen,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.white,
    marginBottom: 4,
  },
  aiSub: {
    fontSize: 13,
    color: theme.colors.grey,
    marginBottom: 12,
  },
  aiStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  miniTag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  miniTagText: {
    fontSize: 12,
    color: theme.colors.white,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: theme.colors.accentGreen,
    minHeight: theme.minTouchTarget,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#0B0F14',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: theme.colors.cardBorder,
    minHeight: theme.minTouchTarget,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.white,
    marginBottom: 12,
    marginTop: 8,
  },
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 14,
  },
  cardRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  gridIcon: {
    fontSize: 20,
  },
  gridValText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.white,
  },
  gridLabelText: {
    fontSize: 12,
    color: theme.colors.grey,
    marginBottom: 10,
  },
  track: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 3,
  },

  // Static Screen Headers & Workouts
  staticHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.white,
  },
  screenSubTitle: {
    fontSize: 13,
    color: theme.colors.grey,
    marginTop: 2,
  },
  chipsScrollView: {
    maxHeight: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accentGreen,
    borderColor: theme.colors.accentGreen,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.grey,
  },
  filterChipTextActive: {
    color: '#0B0F14',
    fontWeight: '700',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.white,
    marginBottom: 12,
  },
  catBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.cyan,
  },
  aiBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.accentGreen,
  },
  workoutMetaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.darkInput,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  metaColItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.grey,
    marginBottom: 2,
  },
  metaVal: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.white,
  },

  // Nutrition Screen
  cardHeaderSmall: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.grey,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  rowThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryNum: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.white,
  },
  summarySubLabel: {
    fontSize: 11,
    color: theme.colors.grey,
    marginTop: 2,
  },
  macroBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.darkInput,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 3,
  },
  macroValText: {
    fontSize: 15,
    fontWeight: '800',
  },
  macroLabelText: {
    fontSize: 10,
    color: theme.colors.grey,
    marginTop: 2,
  },
  mealCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 14,
    marginBottom: 10,
  },
  mealTimeText: {
    fontSize: 12,
    color: theme.colors.grey,
  },
  mealTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.white,
    marginVertical: 6,
  },
  mealCalText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.accentGreen,
  },
  mealMacroText: {
    fontSize: 12,
    color: theme.colors.grey,
  },

  // Social & Challenges
  bannerCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1.5,
    borderColor: theme.colors.cyan,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerBadge: {
    backgroundColor: 'rgba(34, 211, 238, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.cyan,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.white,
  },
  bannerSub: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 2,
  },
  bannerArrow: {
    fontSize: 24,
    color: theme.colors.cyan,
    marginLeft: 10,
  },
  postHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarMiniCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarMiniText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.accentGreen,
  },
  postAuthorName: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.white,
  },
  postMetaText: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 1,
  },
  postBodyText: {
    fontSize: 14,
    color: theme.colors.white,
    lineHeight: 20,
    marginBottom: 12,
  },
  postActionsRow: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.darkInput,
    paddingTop: 10,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  likeBtnActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  commentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionIconText: {
    fontSize: 16,
  },
  actionLabelText: {
    fontSize: 13,
    color: theme.colors.grey,
    fontWeight: '600',
  },
  likeTextActive: {
    color: theme.colors.red,
  },

  // Profile Screen
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarBigCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: theme.colors.accentGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarBigText: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.accentGreen,
  },
  profileNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.white,
  },
  profileGoalText: {
    fontSize: 13,
    color: theme.colors.grey,
    marginTop: 2,
    marginBottom: 10,
  },
  streakBadgePill: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)',
    borderWidth: 1,
    borderColor: theme.colors.orange,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  streakBadgePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.orange,
  },
  metricItemCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 14,
    marginBottom: 10,
  },
  metricHalfCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 14,
  },
  metricLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.grey,
    marginBottom: 4,
  },
  metricValText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.white,
  },
  badgeRowCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeEmojiText: {
    fontSize: 28,
    marginRight: 12,
  },
  badgeColText: {
    flex: 1,
  },
  badgeTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.white,
  },
  badgeSubText: {
    fontSize: 12,
    color: theme.colors.grey,
    marginTop: 2,
  },
  unlockedTagPill: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unlockedTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.accentGreen,
  },

  // Stack Screens (Log Meal, Challenges, Edit Profile, Settings)
  screenHeader: {
    marginBottom: 16,
  },
  backButton: {
    minHeight: 40,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  backButtonText: {
    color: theme.colors.accentGreen,
    fontSize: 15,
    fontWeight: '600',
  },
  cameraBox: {
    height: 160,
    backgroundColor: theme.colors.darkInput,
    borderRadius: theme.borderRadius,
    borderWidth: 2,
    borderColor: theme.colors.cyan,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  cameraIcon: {
    fontSize: 28,
  },
  cameraTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.cyan,
    marginTop: 4,
  },
  cameraSubtitle: {
    fontSize: 12,
    color: theme.colors.grey,
    textAlign: 'center',
    marginVertical: 4,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.grey,
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    flex: 1,
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: theme.colors.accentGreen,
    borderColor: theme.colors.accentGreen,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.grey,
  },
  chipTextActive: {
    color: '#0B0F14',
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 14,
  },
  textInput: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    color: theme.colors.white,
    minHeight: theme.minTouchTarget,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  macroCol: {
    flex: 1,
  },
  macroLabel: {
    fontSize: 11,
    color: theme.colors.grey,
    marginBottom: 4,
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  // Challenges Stack
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiBadge: {
    fontSize: 32,
    marginRight: 12,
  },
  cardCol: {
    flex: 1,
  },
  cardMetaText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.cyan,
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: theme.colors.grey,
    lineHeight: 18,
    marginBottom: 14,
  },

  // Settings Stack
  cardCenter: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderWidth: 1.5,
    borderColor: theme.colors.accentGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoEmoji: {
    fontSize: 28,
  },
  appNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.white,
  },
  appVersionText: {
    fontSize: 13,
    color: theme.colors.grey,
    marginTop: 2,
    marginBottom: 10,
  },
  labPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  labPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.cyan,
    letterSpacing: 0.8,
  },
  cardGroup: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    overflow: 'hidden',
    marginBottom: 20,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.minTouchTarget + 8,
    paddingHorizontal: 16,
  },
  rowIconText: {
    fontSize: 18,
    marginRight: 12,
  },
  rowLabelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.white,
  },
  rowChevronText: {
    fontSize: 16,
    color: theme.colors.grey,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.darkInput,
  },
  supportBox: {
    backgroundColor: theme.colors.darkInput,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
  },
  supportLabel: {
    fontSize: 12,
    color: theme.colors.grey,
  },
  supportEmail: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.accentGreen,
    marginTop: 4,
  },
  cardTitleAccent: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.accentGreen,
  },
  cardSubText: {
    fontSize: 12,
    color: theme.colors.grey,
  },
  bulletText: {
    fontSize: 13,
    color: theme.colors.grey,
    lineHeight: 20,
    marginTop: 6,
  },

  // Bottom Navigation Bar
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
    paddingBottom: theme.bottomTabBarPadding,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  tabIconCircleActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
  },
  tabEmoji: {
    fontSize: 17,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.grey,
  },
  tabLabelActive: {
    color: theme.colors.accentGreen,
    fontWeight: '700',
  },
  cardList: {
    gap: 12,
  },
});
