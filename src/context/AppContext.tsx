import React, { createContext, useState, useContext, ReactNode } from 'react';

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

interface AppContextType {
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  loggedMeals: MealEntry[];
  addMeal: (meal: Omit<MealEntry, 'id' | 'time'>) => void;
  workouts: WorkoutItem[];
  challenges: ChallengeItem[];
  toggleChallenge: (id: string) => void;
  posts: SocialPost[];
  toggleLikePost: (id: string) => void;
}

const initialUser: UserProfile = {
  name: 'Alex',
  streakDays: 7,
  goal: 'Weight Loss & Muscle Strength',
  height: '178 cm',
  weight: '74 kg',
  targetWeight: '70 kg',
  calorieTarget: 2200,
};

const initialMeals: MealEntry[] = [
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
];

const initialWorkouts: WorkoutItem[] = [
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
];

const initialChallenges: ChallengeItem[] = [
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
];

const initialPosts: SocialPost[] = [
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
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [loggedMeals, setLoggedMeals] = useState<MealEntry[]>(initialMeals);
  const [workouts] = useState<WorkoutItem[]>(initialWorkouts);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(initialChallenges);
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const addMeal = (meal: Omit<MealEntry, 'id' | 'time'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry: MealEntry = {
      ...meal,
      id: 'm_' + Date.now(),
      time: timeStr,
    };
    setLoggedMeals((prev) => [newEntry, ...prev]);
  };

  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isJoined;
          return {
            ...c,
            isJoined: nextState,
            participantsCount: nextState ? c.participantsCount + 1 : c.participantsCount - 1,
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

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        loggedMeals,
        addMeal,
        workouts,
        challenges,
        toggleChallenge,
        posts,
        toggleLikePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
