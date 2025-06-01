import { Ayat, Intention, VirtueAction, QuizQuestion, IslamicEvent } from "./types";

export const dailyAyat: Ayat[] = [
  {
    id: 1,
    surah: "Al-Baqarah",
    ayatNumber: 286,
    arabicText: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translation: "Allah does not burden a soul beyond what it can bear",
    explanation: "This verse reminds us that Allah never gives us more than we can handle. Whatever difficulties we face, we have the capacity to overcome them with Allah's help.",
    tags: ["ease", "difficulty", "burden"]
  },
  {
    id: 2,
    surah: "Al-Imran",
    ayatNumber: 139,
    arabicText: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
    translation: "Do not lose heart nor fall into despair, for you will triumph if you are believers",
    explanation: "This verse encourages believers to remain steadfast and optimistic, even in challenging times. Faith gives us the strength to overcome adversity.",
    tags: ["faith", "optimism", "perseverance"]
  },
  {
    id: 3,
    surah: "Al-Fatiha",
    ayatNumber: 5,
    arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "You alone we worship, and You alone we ask for help",
    explanation: "This verse is the essence of our relationship with Allah - we dedicate our worship to Him alone and rely solely on Him for assistance in all matters.",
    tags: ["worship", "help", "reliance"]
  },
  {
    id: 4,
    surah: "Al-Duha",
    ayatNumber: 5,
    arabicText: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَى",
    translation: "And verily, your Lord will give you so that you shall be well-pleased",
    explanation: "Allah promises to give the believer what will satisfy them. This reminds us to be patient, as relief and reward are coming.",
    tags: ["patience", "reward", "satisfaction"]
  },
  {
    id: 5,
    surah: "Al-Inshirah",
    ayatNumber: 5,
    arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship comes ease",
    explanation: "This beautiful verse reminds us that after every difficulty comes relief. It teaches us to remain hopeful during challenging times.",
    tags: ["hope", "ease", "difficulty"]
  }
];

export const dailyIntentions: Intention[] = [
  {
    id: 1,
    text: "Today I will try not to backbite or speak ill of others",
    category: "speech"
  },
  {
    id: 2,
    text: "I will be thankful in every situation today",
    category: "gratitude"
  },
  {
    id: 3,
    text: "I will perform all my prayers on time today",
    category: "worship"
  },
  {
    id: 4,
    text: "I will read at least one page of Quran today",
    category: "worship"
  },
  {
    id: 5,
    text: "I will give charity today, even if it's small",
    category: "charity"
  },
  {
    id: 6,
    text: "I will smile at everyone I meet today",
    category: "kindness"
  },
  {
    id: 7,
    text: "I will practice patience in difficult situations today",
    category: "character"
  }
];

export const virtueActions: VirtueAction[] = [
  {
    id: "prayer",
    name: "Daily Prayer",
    points: 5,
    description: "Complete one of the five daily prayers",
    icon: "pray"
  },
  {
    id: "jamaat",
    name: "Prayer in Congregation",
    points: 12,
    description: "Pray in congregation at the mosque",
    icon: "users"
  },
  {
    id: "tahajjud",
    name: "Tahajjud Prayer",
    points: 15,
    description: "Perform the night prayer",
    icon: "moon"
  },
  {
    id: "quran",
    name: "Quran Reading",
    points: 3,
    description: "Read a page of Quran",
    icon: "book-open"
  },
  {
    id: "sadaqah",
    name: "Charity",
    points: 10,
    description: "Give sadaqah (charity)",
    icon: "heart"
  },
  {
    id: "dhikr",
    name: "Dhikr",
    points: 2,
    description: "Complete a set of dhikr",
    icon: "repeat"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How many pillars of Islam are there?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "There are 5 pillars of Islam: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which surah is known as the heart of the Quran?",
    options: ["Al-Fatiha", "Yasin", "Al-Ikhlas", "Al-Baqarah"],
    correctAnswer: 1,
    explanation: "Surah Yasin is often referred to as the heart of the Quran due to its central message and importance.",
    difficulty: "medium"
  },
  {
    id: 3,
    question: "How many times is the word 'Allah' mentioned in the Quran?",
    options: ["980", "1,464", "2,698", "2,195"],
    correctAnswer: 2,
    explanation: "The word 'Allah' is mentioned 2,698 times in the Quran.",
    difficulty: "hard"
  }
];

export const islamicEvents: IslamicEvent[] = [
  {
    id: 1,
    name: "Ramadan",
    hijriDate: "1 Ramadan",
    gregorianDate: "2025-03-01", // Example date, would change yearly
    description: "The holy month of fasting, prayer, and reflection",
    importance: "major"
  },
  {
    id: 2,
    name: "Eid al-Fitr",
    hijriDate: "1 Shawwal",
    gregorianDate: "2025-04-01", // Example date, would change yearly
    description: "The festival of breaking the fast that marks the end of Ramadan",
    importance: "major"
  },
  {
    id: 3,
    name: "Eid al-Adha",
    hijriDate: "10 Dhul Hijjah",
    gregorianDate: "2025-06-07", // Example date, would change yearly
    description: "The festival of sacrifice that marks the end of Hajj",
    importance: "major"
  },
  {
    id: 4,
    name: "Day of Arafah",
    hijriDate: "9 Dhul Hijjah",
    gregorianDate: "2025-06-06", // Example date, would change yearly
    description: "The day when pilgrims gather at the plain of Arafat",
    importance: "major"
  },
  {
    id: 5,
    name: "Laylatul Qadr",
    hijriDate: "27 Ramadan (approx)",
    gregorianDate: "2025-03-27", // Example date, would change yearly
    description: "The Night of Power, better than a thousand months",
    importance: "major"
  }
];
