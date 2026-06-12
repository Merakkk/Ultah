import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Cake,
  Gift,
  Music,
  Calendar,
  Clock,
  Sparkle,
  Smile,
  Edit2,
  Trash2,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ChevronRight,
  PartyPopper,
  Save,
  Check,
  Send,
  HelpCircle,
  Clock3,
} from 'lucide-react';
import { useAudioSynthesizer } from './audio';
import { PartnerConfig, MemoryItem, QuizQuestion } from './types';

// Default mock data that is charming and realistic
const DEFAULT_CONFIG: PartnerConfig = {
  partnerName: 'Rizka Amanda Santoso',
  nickname: 'Manda',
  birthDate: '2006-08-02', // Set to a tomorrow or nearby date for live demonstration
  anniversaryDate: '2026-02-06',
  traits: 'Pacar yang baik dan pengertian.',
  favMemories: 'Date paralayang, jatimpark, bioskop.',
  specialWish: 'Semoga kebeli BMW dan rumah di Ijen.',
  envelopeTheme: 'pink',
  bgPattern: 'hearts',
  letterContent: `Selamat ulang tahun manisku, sayangku, cintaku, duniaku, semestaku. ❤️

Aku bikin ini karena kita lagi LDR, jadi belum bisa merayakan hari spesialmu secara langsung.

Pertama, aku mau ngucapin selamat bertambah umur yang ke-20 tahun. Aku doain semoga kamu selalu diberikan kesehatan, kesabaran, rezeki yang lancar, serta segala hal yang sedang kamu usahakan bisa berjalan dengan baik dan terkabul sesuai harapanmu.

Kedua, makasih ya udah nemenin aku selama ini. Meskipun awalnya kita cuma kenal dari sebuah aplikasi, aku nggak pernah nyangka kalau akhirnya kita bisa sedekat ini dan menjalani hubungan bersama. Banyak hal yang sudah kita lewati, dan aku bersyukur karena ada kamu di setiap cerita itu.

Ketiga, aku juga mau minta maaf kalau selama ini masih banyak kurangnya aku sebagai pasangan. Terima kasih karena selalu berusaha memahami aku, sabar menghadapi sifat dan tingkahku, serta tetap bertahan sampai hari ini. Aku benar-benar menghargai semua itu.

Mungkin itu aja dari aku. Semoga di umur yang baru ini kamu semakin bahagia dan semakin dekat dengan semua impianmu. Dan semoga kita masih diberi banyak waktu untuk menciptakan lebih banyak cerita, kenangan, dan momen indah bersama.

Selamat ulang tahun, sayang. Aku sayang kamu. ❤️`,
  soundtrackType: 'romance',
};

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    date: '04 Juni 2026',
    title: 'Keliling Akuarium',
    description: 'Ikannya lucu, tapi lebih lucu kamu',
    imageUrl: '/akuarium.jpg',
  },
  {
    id: 'm2',
    date: '30 Mei 2026',
    title: 'Study for UAS',
    description: 'Mirror selfie at Arah Cafe',
    imageUrl: '/arah.jpg',
  },
  {
    id: 'm3',
    date: '10 Mei 2026',
    title: 'Nonton ASFW',
    description: 'First time ngerasain event fashion',
    imageUrl: '/asfw.jpg',
  },
  {
    id: 'm4',
    date: '04 Juni 2026',
    title: 'Bioskop 3D',
    description: 'Bikin pusing sama basah dikit',
    imageUrl: '/bioskop.jpg',
  },
  {
    id: 'm5',
    date: '04 Juni 2026',
    title: 'Jatimpark Date',
    description: 'First time merakasan JTP, next ajak lagi',
    imageUrl: '/jtp.jpg',
  },
  {
    id: 'm6',
    date: '02 April 2026',
    title: 'Mewarnai di Kayutangan',
    description: 'Ngga ada yang mau bawa balik hasilnya',
    imageUrl: '/kayut.jpg',
  },
  {
    id: 'm7',
    date: '18 April 2026',
    title: 'Sepedaan',
    description: 'Salah satu hari kita produktif',
    imageUrl: '/kota.jpg',
  },
  {
    id: 'm8',
    date: '18 Mei 2026',
    title: 'MCD',
    description: 'Malem-Malem ke MCD mam eskrim',
    imageUrl: '/mcd.jpg',
  },
  {
    id: 'm9',
    date: '07 Desember 2025',
    title: 'Keliling MOG',
    description: 'Minjem topi di OhSome buat mirror selfie',
    imageUrl: '/ohsome.jpeg',
  },
  {
    id: 'm10',
    date: ' 27 April 2026',
    title: 'Cafe di Merjo',
    description: 'Nemu cafe enak deket kos',
    imageUrl: '/paddy.jpeg',
  },
  {
    id: 'm11',
    date: '17 Februari 2026',
    title: 'Paralayang Date',
    description: 'Menerjang hujan dan badai demi citylight dan sunrise',
    imageUrl: '/paralayang.jpg',
  },
  {
    id: 'm12',
    date: '05 Maret 2026',
    title: 'Photobooth',
    description: 'Photobooth terbaik yang pernah dicoba',
    imageUrl: '/photo.jpeg',
  },
  {
    id: 'm13',
    date: '27 April 2026',
    title: 'Flowers',
    description: 'Mirror selfie pake bunga 10k, maaf murah',
    imageUrl: '/sr.jpeg',
  },
  {
    id: 'm14',
    date: '04 April 2026',
    title: 'Koma Titik',
    description: 'Penasaran sama matcha titik koma, btw udah berapa nih mirror selfie',
    imageUrl: '/titik.jpeg',
  },
  {
    id: 'm15',
    date: '14 Maret 2026',
    title: 'Awas Ombak!!',
    description: 'Nunggu sahur di tomoro kayutangan',
    imageUrl: '/tomoro.jpeg',
  },
];

const DEFAULT_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Dimana kita first date?',
    choices: ['Xia Dimsum', 'Lalapan Ayam', 'Dikichi', 'Mie Ayam Furab'],
    correctIndex: 1,
    successMessage: 'Anjay masih inget',
  },
  {
    id: 'q2',
    question: 'Kapan kita jadian?',
    choices: ['06 Februari 2026', '07 Februari 2026', '08 Februari 2026', '09 Februari 2026'],
    correctIndex: 0,
    successMessage: 'Kalau salah kebangetan sih',
  },
  {
    id: 'q3',
    question: 'Tempat nongki favorit?',
    choices: ['Alfamart', 'Gangnam Laundry', 'Indomaret', 'Depan UB'],
    correctIndex: 2,
    successMessage: 'Indormart Sigura the best',
  },
];

const formatToEditorialDate = (dateStr: string) => {
  try {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

const THEME_STYLES = {
  pink: {
    primary: 'bg-rose-950 hover:bg-rose-900 text-[#F4F1EA]',
    primaryText: 'text-rose-950',
    accent: 'border-rose-300 focus:ring-rose-950',
    blobColor: 'bg-rose-200/40',
    cardBorder: 'border-rose-950/10',
    envelopeBg: 'bg-gradient-to-br from-[#6E4F4C] to-[#5C3E3B]',
    gradientBg: 'from-[#F4F1EA] via-[#F1ECE2] to-[#ECE7DC]',
  },
  purple: {
    primary: 'bg-purple-950 hover:bg-purple-900 text-[#F4F1EA]',
    primaryText: 'text-purple-950',
    accent: 'border-purple-300 focus:ring-purple-950',
    blobColor: 'bg-purple-200/40',
    cardBorder: 'border-purple-950/10',
    envelopeBg: 'bg-gradient-to-br from-[#534C60] to-[#423C4F]',
    gradientBg: 'from-[#F4F1EA] via-[#ECE9E0] to-[#E5E1D8]',
  },
  amber: {
    primary: 'bg-amber-950 hover:bg-amber-900 text-[#F4F1EA]',
    primaryText: 'text-amber-950',
    accent: 'border-amber-300 focus:ring-amber-950',
    blobColor: 'bg-amber-200/40',
    cardBorder: 'border-amber-950/10',
    envelopeBg: 'bg-gradient-to-br from-[#806E56] to-[#6E5D46]',
    gradientBg: 'from-[#F4F1EA] via-[#F2ECE0] to-[#EBE4D5]',
  },
  emerald: {
    primary: 'bg-emerald-950 hover:bg-emerald-900 text-[#F4F1EA]',
    primaryText: 'text-emerald-950',
    accent: 'border-emerald-300 focus:ring-emerald-950',
    blobColor: 'bg-emerald-200/40',
    cardBorder: 'border-emerald-950/10',
    envelopeBg: 'bg-gradient-to-br from-[#4D5C4F] to-[#3C4A3E]',
    gradientBg: 'from-[#F4F1EA] via-[#ECECE2] to-[#E2E4DA]',
  },
  crimson: {
    primary: 'bg-red-950 hover:bg-red-900 text-[#F4F1EA]',
    primaryText: 'text-red-950',
    accent: 'border-red-300 focus:ring-red-950',
    blobColor: 'bg-[#B28D8A]/30',
    cardBorder: 'border-rose-950/10',
    envelopeBg: 'bg-gradient-to-br from-[#733F3B] to-[#5C2E2B]',
    gradientBg: 'from-[#F4F1EA] via-[#EFEAE0] to-[#E9E2D5]',
  },
};

export default function App() {
  const { startMusic, stopMusic, initAudio } = useAudioSynthesizer();

  // State Management
  const [config, setConfig] = useState<PartnerConfig>(() => {
    const saved = localStorage.getItem('partner_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('partner_memories');
    return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
  });

  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('partner_quiz');
    return saved ? JSON.parse(saved) : DEFAULT_QUIZ;
  });

  // UI Flow States
  const [isOpened, setIsOpened] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const isAdminMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true';
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthdayToday, setIsBirthdayToday] = useState(false);
  
  // Audio Playback UI State
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  // Interactive mini elements
  const [candleBlown, setCandleBlown] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showQuizResultMsg, setShowQuizResultMsg] = useState(false);

  // Floating decoration states
  const [heartsList, setHeartsList] = useState<{ id: number; x: number; y: number }[]>([]);
  
  // AI generator server API request states
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiErrorMessage, setAiErrorMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Auto-sync hardcoded code-level changes to localStorage so developers can see file updates instantly
  useEffect(() => {
    const rawMemories = JSON.stringify(DEFAULT_MEMORIES);
    const rawConfig = JSON.stringify(DEFAULT_CONFIG);
    const rawQuiz = JSON.stringify(DEFAULT_QUIZ);

    const keyMemSec = 'default_memories_sync_raw2';
    const keyConfSec = 'default_config_sync_raw2';
    const keyQuizSec = 'default_quiz_sync_raw2';

    const lastSavedMem = localStorage.getItem(keyMemSec);
    const lastSavedConf = localStorage.getItem(keyConfSec);
    const lastSavedQuiz = localStorage.getItem(keyQuizSec);

    let changed = false;

    if (lastSavedMem !== rawMemories) {
      localStorage.setItem(keyMemSec, rawMemories);
      localStorage.setItem('partner_memories', rawMemories);
      setMemories(DEFAULT_MEMORIES);
      changed = true;
    }
    if (lastSavedConf !== rawConfig) {
      localStorage.setItem(keyConfSec, rawConfig);
      localStorage.setItem('partner_config', rawConfig);
      setConfig(DEFAULT_CONFIG);
      changed = true;
    }
    if (lastSavedQuiz !== rawQuiz) {
      localStorage.setItem(keyQuizSec, rawQuiz);
      localStorage.setItem('partner_quiz', rawQuiz);
      setQuizzes(DEFAULT_QUIZ);
      changed = true;
    }

    if (changed) {
      console.log('Detected fresh code defaults. Synced localStorage with code values.');
    }
  }, []);

  // Persist edits inside localStorage
  useEffect(() => {
    localStorage.setItem('partner_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('partner_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('partner_quiz', JSON.stringify(quizzes));
  }, [quizzes]);

  // Audio control effect based on music state
  useEffect(() => {
    if (musicPlaying && isOpened) {
      startMusic(config.soundtrackType === 'silent' ? 'romance' : config.soundtrackType);
    } else {
      stopMusic();
    }
  }, [musicPlaying, config.soundtrackType, isOpened]);

  // Handle countdown calculation and anniversary tracker
  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate Countdown to next birthday
      const now = new Date();
      const currentYear = now.getFullYear();
      
      const birthDateObj = new Date(config.birthDate);
      let targetBirthday = new Date(currentYear, birthDateObj.getMonth(), birthDateObj.getDate(), 0, 0, 0);
      
      // If the birthday is already passed this year, countdown to next year
      if (now.getTime() > targetBirthday.getTime() + 86400000) { // allow full day celebration
        targetBirthday.setFullYear(currentYear + 1);
      }

      // Check if it is birthday today
      const isToday = now.getDate() === birthDateObj.getDate() && now.getMonth() === birthDateObj.getMonth();
      setIsBirthdayToday(isToday);

      const diff = targetBirthday.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown({ days: Math.max(0, d), hours: Math.max(0, h), minutes: Math.max(0, m), seconds: Math.max(0, s) });

      // Calculate Days/Hours Together (Anniversary tracker)
      const annivDate = new Date(config.anniversaryDate);
      const togetherDiff = now.getTime() - annivDate.getTime();
      const togetherD = Math.floor(togetherDiff / (1000 * 60 * 60 * 24));
      const togetherH = Math.floor((togetherDiff / (1000 * 60 * 60)) % 24);
      const togetherM = Math.floor((togetherDiff / (1000 * 60)) % 60);
      const togetherS = Math.floor((togetherDiff / 1000) % 60);

      setTimeTogether({ days: togetherD, hours: togetherH, minutes: togetherM, seconds: togetherS });

    }, 1000);

    return () => clearInterval(timer);
  }, [config.birthDate, config.anniversaryDate]);

  // Spawn visual hearts on double clicks / clicks
  const spawnHeart = (e?: React.MouseEvent) => {
    let x = Math.random() * window.innerWidth;
    let y = window.innerHeight;
    if (e) {
      x = e.clientX;
      y = e.clientY - 20;
    }
    const id = Date.now() + Math.random();
    setHeartsList((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHeartsList((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  };

  // Auto spawn occasional celebratory hearts
  useEffect(() => {
    if (isOpened && isBirthdayToday) {
      const heartInterval = setInterval(() => {
        spawnHeart();
      }, 1200);
      return () => clearInterval(heartInterval);
    }
  }, [isOpened, isBirthdayToday]);

  const handleOpenLetter = () => {
    initAudio();
    setIsOpened(true);
    setMusicPlaying(true);
    // Play celebratory sound or audio trigger
  };

  const currentTheme = THEME_STYLES[config.envelopeTheme] || THEME_STYLES.pink;

  // AI-powered wish generator
  const handleAIGenerate = async () => {
    setAiGenerating(true);
    setAiErrorMessage('');
    try {
      const response = await fetch('/api/generate-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerName: config.partnerName,
          nickname: config.nickname,
          traits: config.traits,
          memories: config.favMemories,
          dynamicOption: config.specialWish,
          tone: 'romantis dan hangat',
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setConfig((prev) => ({
          ...prev,
          letterContent: data.text,
        }));
      } else {
        setAiErrorMessage(data.error || 'Server gagal menghasilkan ucapan sayang.');
      }
    } catch (err: any) {
      setAiErrorMessage('Gagal menghubungi chatbot AI: ' + err.message);
    } finally {
      setAiGenerating(false);
    }
  };

  // Event handlers for quiz
  const handleOptionClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === quizzes[activeQuizIndex].correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      spawnHeart();
    }
    setShowQuizResultMsg(true);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setShowQuizResultMsg(false);
    if (activeQuizIndex < quizzes.length - 1) {
      setActiveQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
    setShowQuizResultMsg(false);
  };

  // Quick reset to default templates if user wants a clean slate
  const handleResetToDefault = () => {
    localStorage.removeItem('partner_config');
    localStorage.removeItem('partner_memories');
    localStorage.removeItem('partner_quiz');
    setConfig(DEFAULT_CONFIG);
    setMemories(DEFAULT_MEMORIES);
    setQuizzes(DEFAULT_QUIZ);
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
    }, 4000);
  };

  // Editor Helpers for arrays (Moments and Quiz)
  const handleUpdateMemory = (id: string, field: keyof MemoryItem, value: string) => {
    setMemories((prev) =>
      prev.map((mem) => (mem.id === id ? { ...mem, [field]: value } : mem))
    );
  };

  const handleAddMemory = () => {
    const newId = 'm_' + Date.now();
    const newMemo: MemoryItem = {
      id: newId,
      date: 'Tanggal Momen',
      title: 'Judul Cerita Manis',
      description: 'Gambarkan momen tak terlupakan kalian di sini...',
      imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
    };
    setMemories((prev) => [...prev, newMemo]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateQuiz = (id: string, updates: Partial<QuizQuestion>) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleUpdateQuizChoice = (id: string, choiceIndex: number, text: string) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const updatedChoices = [...q.choices];
          updatedChoices[choiceIndex] = text;
          return { ...q, choices: updatedChoices };
        }
        return q;
      })
    );
  };

  const balloons = [
    { color: 'bg-rose-400', label: 'Cinta', msg: '❤️ Thank you for being a part of my life.' },
    { color: 'bg-amber-400', label: 'Tawa', msg: '✨ I hope your smile and happiness keep growing every day.' },
    { color: 'bg-sky-400', label: 'Mimpi', msg: "🌟 I'm grateful for all the stories, memories, and moments we've shared together." },
    { color: 'bg-purple-400', label: 'Sabar', msg: '🌸 I hope we can keep moving forward together and create many more beautiful memories.' },
  ];

  return (
    <div
      id="root-container"
      className={`min-h-screen relative flex flex-col font-sans transition-all duration-75 select-none overflow-x-hidden bg-gradient-to-br ${currentTheme.gradientBg} text-slate-800`}
      onClick={() => spawnHeart()}
    >
      {/* Decorative ambient background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full filter blur-[120px] opacity-40 transition-colors duration-500 ${currentTheme.blobColor}`} />
        <div className={`absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-40 transition-colors duration-500 ${currentTheme.blobColor}`} />
        
        {/* Pattern styling based on user configuration */}
        {config.bgPattern === 'hearts' && (
          <div className="absolute inset-0 opacity-[0.06] flex flex-wrap gap-12 p-8 text-rose-500 text-3xl">
            {Array.from({ length: 48 }).map((_, i) => (
              <Heart key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}
        {config.bgPattern === 'stars' && (
          <div className="absolute inset-0 opacity-[0.06] flex flex-wrap gap-14 p-8 text-amber-500 text-3xl">
            {Array.from({ length: 48 }).map((_, i) => (
              <Sparkles key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        )}
        {config.bgPattern === 'floral' && (
          <div className="absolute inset-0 opacity-[0.06] flex flex-wrap gap-14 p-8 text-emerald-500 text-3xl">
            {Array.from({ length: 48 }).map((_, i) => (
              <Sparkle key={i} />
            ))}
          </div>
        )}
      </div>

      {/* Floating interactive spawned elements */}
      {heartsList.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-500 z-50 pointer-events-none"
          initial={{ opacity: 1, scale: 0.5, x: heart.x, y: heart.y }}
          animate={{ opacity: 0, scale: 1.5, y: heart.y - 150, rotate: Math.random() * 40 - 20 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          <Heart className="fill-current w-6 h-6 shadow-sm" />
        </motion.div>
      ))}

      {/* FLOATING ACTION UTILITIES */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Live Audio Control Panel */}
        {isOpened && (
          <motion.button
            id="audio-helper-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              setMusicPlaying((prev) => !prev);
              initAudio();
            }}
            className="p-3 bg-white/90 backdrop-blur border border-slate-200/80 rounded-full shadow-lg hover:shadow-xl transition-all text-slate-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Nyalakan/Matikan Musik Romantis"
          >
            {musicPlaying ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-1">
                <Volume2 className="w-5 h-5 text-rose-500 animate-bounce" />
                <span className="text-rose-500 font-mono">ON</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-1">
                <VolumeX className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400 font-mono">OFF</span>
              </span>
            )}
          </motion.button>
        )}

        {/* Dynamic Sunting/Kustomisasi Toggle Badge */}
        {isAdminMode && (
          <motion.button
            id="editor-center-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowEditor((prev) => !prev);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900 border border-slate-800 text-white font-medium text-xs sm:text-sm rounded-full shadow-xl hover:bg-slate-800 transition-all font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit2 className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>{showEditor ? 'Tutup Suntingan' : 'Sunting Data Pasangan 🎉'}</span>
          </motion.button>
        )}
      </div>

      {/* EDIT CONFIGURATION WORKSPACE DRAWER PANEL */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            id="customizer-panel-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white border-l border-slate-100 shadow-2xl z-50 flex flex-col text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-1.5 text-slate-900 font-serif">
                  <Compass className="w-5 h-5 text-indigo-500 animate-spin" />
                  Pusat Kustomisasi Pasangan
                </h3>
                <p className="text-xs text-slate-500">Sesuaikan website ultah impianmu seketika.</p>
              </div>
              <button
                id="close-customizer-btn"
                onClick={() => setShowEditor(false)}
                className="p-1 px-3 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded text-xs font-semibold"
              >
                Tutup
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-7">
              {/* Reset defaults */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-mono">Buka draf romantis bawaan?</span>
                  <button
                    id="reset-card-btn"
                    onClick={handleResetToDefault}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200/80 bg-white hover:bg-slate-50 rounded"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Atur Bawaan
                  </button>
                </div>
                {resetSuccess && (
                  <p className="text-[10px] text-emerald-600 font-medium font-serif italic text-right">
                    ✓ Berhasil dimuat ulang dari kode utama!
                  </p>
                )}
              </div>

              {/* SECTION A: BIODATA & DATE */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">A. DATA UTAMA PASANGAN</h4>
                
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap Pasangan</label>
                  <input
                    type="text"
                    value={config.partnerName}
                    onChange={(e) => setConfig((prev) => ({ ...prev, partnerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Contoh: Nabila Adinda Putri"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Panggilan Manis</label>
                    <input
                      type="text"
                      value={config.nickname}
                      onChange={(e) => setConfig((prev) => ({ ...prev, nickname: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Contoh: Dinda"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Melodi Pengiring</label>
                    <select
                      value={config.soundtrackType}
                      onChange={(e) => setConfig((prev) => ({ ...prev, soundtrackType: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="romance">Retro Romance (Canon)</option>
                      <option value="hbd">Happy Birthday Retro</option>
                      <option value="silent">Tanpa Musik (Hening)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Ultah</label>
                    <input
                      type="date"
                      value={config.birthDate}
                      onChange={(e) => setConfig((prev) => ({ ...prev, birthDate: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Jadian</label>
                    <input
                      type="date"
                      value={config.anniversaryDate}
                      onChange={(e) => setConfig((prev) => ({ ...prev, anniversaryDate: e.target.value }))}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Tema Warna Surat</label>
                    <select
                      value={config.envelopeTheme}
                      onChange={(e) => setConfig((prev) => ({ ...prev, envelopeTheme: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                    >
                      <option value="pink">Pink Soft Sweet</option>
                      <option value="purple">Violet Amethyst</option>
                      <option value="amber">Amber Sunrise</option>
                      <option value="emerald">Forest Emerald</option>
                      <option value="crimson">Crimson Passion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Dekorasi Latar</label>
                    <select
                      value={config.bgPattern}
                      onChange={(e) => setConfig((prev) => ({ ...prev, bgPattern: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                    >
                      <option value="hearts">Latar Hati Mengambang</option>
                      <option value="stars">Latar Gemintang Berkedip</option>
                      <option value="floral">Latar Daun Estetik</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: CUTE TRAITS FOR CHATBOT */}
              <div className="space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">B. SURAT UTAMA</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded leading-none">Terintegrasi AI Gemini</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Sifat & Kebiasaan Unik Pasangan</label>
                  <textarea
                    value={config.traits}
                    rows={2}
                    onChange={(e) => setConfig((prev) => ({ ...prev, traits: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
                    placeholder="Contoh: Suka merajuk manja kalau lapar, rajin merapikan rambut..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Momen Paling Indah / Lucu Berdua</label>
                  <textarea
                    value={config.favMemories}
                    rows={2}
                    onChange={(e) => setConfig((prev) => ({ ...prev, favMemories: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
                    placeholder="Contoh: Terjebak banjir naik motor rongsokan sambil main keciprat air..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Harapan Masa Depan Kita</label>
                  <input
                    type="text"
                    value={config.specialWish}
                    onChange={(e) => setConfig((prev) => ({ ...prev, specialWish: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
                    placeholder="Contoh: Bisa menabung beli rumah kecil lucu dan pelihara kucing..."
                  />
                </div>

                <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                      Ingin Ucapan Ditulis oleh AI?
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    AI Gemini akan merangkai kata-kata romantis super tulus secara otomatis berdasarkan sifat dan memori indah di atas.
                  </p>
                  
                  <button
                    id="generate-ai-text-btn"
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={aiGenerating}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs rounded transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    {aiGenerating ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Merenungkan Kata-kata Cinta...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>Buatkan Teks Ucapan dengan Gemini AI 💖</span>
                      </>
                    )}
                  </button>

                  {aiErrorMessage && (
                    <p className="text-[10px] text-rose-500 font-mono mt-1 text-center bg-white p-1.5 rounded">{aiErrorMessage}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Isi Surat Ucapan</label>
                  <textarea
                    value={config.letterContent}
                    rows={6}
                    onChange={(e) => setConfig((prev) => ({ ...prev, letterContent: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed font-serif focus:outline-none focus:border-rose-500"
                    placeholder="Tulis surat cintamu sendiri di sini..."
                  />
                </div>
              </div>

              {/* SECTION C: OUR MOMENTS CAROUSEL */}
              <div className="space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">C. GALERI MOMEN (MEMORIES)</h4>
                  <button
                    id="add-memory-btn"
                    onClick={handleAddMemory}
                    className="flex items-center gap-1 text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-2 py-1 rounded"
                  >
                    <Plus className="w-3 h-3" />
                    Tambah Foto
                  </button>
                </div>

                <div className="space-y-4">
                  {memories.map((memo, index) => (
                    <div key={memo.id} className="p-3 bg-slate-50 border border-slate-200/60 rounded-lg space-y-2 relative">
                      <button
                        onClick={() => handleDeleteMemory(memo.id)}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 bg-white/70 hover:bg-white rounded p-1"
                        title="Hapus Momen Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[10px] font-mono font-bold text-slate-400">Momen #{index + 1}</span>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-medium text-slate-500">Tanggal</label>
                          <input
                            type="text"
                            value={memo.date}
                            onChange={(e) => handleUpdateMemory(memo.id, 'date', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs bg-white focus:outline-none"
                            placeholder="Contoh: 10 Nov 2023"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-medium text-slate-500">Judul Momen</label>
                          <input
                            type="text"
                            value={memo.title}
                            onChange={(e) => handleUpdateMemory(memo.id, 'title', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs bg-white focus:outline-none"
                            placeholder="Contoh: Naik Komedi Putar"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-medium text-slate-500">Keterangan Cerita Singkat</label>
                        <textarea
                          value={memo.description}
                          rows={2}
                          onChange={(e) => handleUpdateMemory(memo.id, 'description', e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] bg-white leading-normal focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-medium text-slate-500">URL Gambar (Unsplash/Bebas)</label>
                        <input
                          type="text"
                          value={memo.imageUrl}
                          onChange={(e) => handleUpdateMemory(memo.id, 'imageUrl', e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-[10px] bg-white font-mono leading-none focus:outline-none"
                        />
                        <span className="text-[9px] text-slate-400 leading-none block mt-1">Masukkan URL foto kalian atau biarkan estetik bawaan.</span>
                      </div>
                    </div>
                  ))}
                  {memories.length === 0 && (
                    <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded">Belum ada foto momen yang terpasang.</p>
                  )}
                </div>
              </div>

              {/* SECTION D: RELATIONSHIP TRIVIA QUIZ */}
              <div className="space-y-4 border-t border-slate-100 pt-5 pb-8">
                <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">D. KUIS TRIVIA HUBUNGAN</h4>
                
                <div className="space-y-4">
                  {quizzes.map((q, qIdx) => (
                    <div key={q.id} className="p-3 bg-slate-50 border border-slate-200/60 rounded-lg space-y-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-400">Pertanyaan #{qIdx + 1}</span>
                      
                      <div>
                        <label className="block text-[9px] font-medium text-slate-500">Teks Pertanyaan</label>
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => handleUpdateQuiz(q.id, { question: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-xs bg-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-medium text-slate-500">Pilihan Jawaban (Isi 4)</label>
                        {q.choices.map((c, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              name={`correct_${q.id}`}
                              checked={q.correctIndex === cIdx}
                              onChange={() => handleUpdateQuiz(q.id, { correctIndex: cIdx })}
                              title="Set sebagai Jawaban Benar"
                            />
                            <input
                              type="text"
                              value={c}
                              onChange={(e) => handleUpdateQuizChoice(q.id, cIdx, e.target.value)}
                              className="flex-1 px-2 py-0.5 border border-slate-200 rounded text-[11px] bg-white focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[9px] font-medium text-slate-500">Pesan Jawaban Benar</label>
                        <input
                          type="text"
                          value={q.successMessage}
                          onChange={(e) => handleUpdateQuiz(q.id, { successMessage: e.target.value })}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Save/Apply Bottom Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                id="apply-changes-btn"
                onClick={() => setShowEditor(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                Selesai & Terapkan Perubahan!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE A: LOCKED GREATING COVER ENVELOPE (BEFORE BREAKING SEAL) */}
      <AnimatePresence>
        {!isOpened && (
          <div className="flex-1 w-full flex flex-col justify-between p-6 md:p-12 min-h-screen relative z-10 font-serif text-[#2D2A26] bg-[#F4F1EA]">
            {/* Editorial Header */}
            <header className="flex justify-between items-baseline w-full max-w-5xl mx-auto mb-4">
              <div className="text-[10px] sm:text-xs tracking-[0.25em] font-sans uppercase font-medium text-[#2D2A26]/80">Vol. 01 / Special Celebration</div>
              <div className="text-[10px] sm:text-xs tracking-[0.25em] font-sans uppercase font-medium text-[#2D2A26]/80">Est. {new Date(config.anniversaryDate).getFullYear()} / Indonesia</div>
            </header>
            
            <div className="editorial-line w-full max-w-5xl mx-auto mb-8 sm:mb-10"></div>

            {/* Main Editorial Grid Layout */}
            <main className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-5xl mx-auto flex-grow items-center">
              
              {/* Left Column: Vertical publication text info */}
              <div className="hidden lg:flex lg:col-span-1 h-full items-center justify-center py-6 border-r border-[#2D2A26]/10">
                <div className="vertical-text flex justify-between text-[10px] tracking-[0.4em] font-sans uppercase text-[#2D2A26]/60 h-64">
                  <span className="mb-8">A Love Story Archive</span>
                  <span>Issue Vol. 0{1 + new Date().getFullYear() - 2024}</span>
                </div>
              </div>

              {/* Middle Column: The Elegant Envelope & Title */}
              <div className="col-span-1 md:col-span-7 lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <span className="text-xs sm:text-sm italic text-[#2D2A26]/70 block font-serif"></span>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[#2D2A26] leading-none font-serif">
                    Untuk yang <br />
                    <span className="font-semibold italic">Tercinta {config.nickname}.</span>
                  </h1>
                  
                  <div className="editorial-line w-24 my-6"></div>
                  
                  <p className="text-md sm:text-lg lg:text-xl leading-relaxed text-[#2D2A26]/80 italic max-w-md font-serif">
                    "Selamat ulang tahun untuk seseorang yang selalu menemani hari-hari ku."
                  </p>
                </div>

                {/* Envelope card wrapped in minimal styling */}
                <motion.div
                  id="envelope-main-seal"
                  className="bg-white/40 backdrop-blur-sm border border-[#2D2A26]/15 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between max-w-md mt-6"
                >
                  {/* Countdown Tracker Box Inside */}
                    {!isBirthdayToday ? (
                      <div className="grid grid-cols-4 gap-2 px-2 max-w-xs mx-auto">
                        {[
                          { value: countdown.days, label: 'Hari' },
                          { value: countdown.hours, label: 'Jam' },
                          { value: countdown.minutes, label: 'Menit' },
                          { value: countdown.seconds, label: 'Detik' },
                        ].map((item, i) => (
                          <div key={i} className="p-2 sm:p-2.5 bg-white/60 border border-[#2D2A26]/10 rounded-xl flex flex-col items-center">
                            <span className="text-lg sm:text-xl font-bold text-[#2D2A26] font-sans tracking-tighter">{String(item.value).padStart(2, '0')}</span>
                            <span className="text-[8px] sm:text-[9px] text-[#2D2A26]/60 font-medium font-sans leading-none mt-1 uppercase tracking-wider">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-3 bg-[#2D2A26]/5 border border-[#2D2A26]/15 rounded-xl text-[#2D2A26] font-serif font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <PartyPopper className="w-4 h-4 text-[#2D2A26] animate-bounce" />
                        Hari Istimewa Telah Tiba! 🎉
                      </motion.div>
                    )}

                  {/* Physical envelope mockup base shape */}
                  <div className="my-6 relative flex justify-center items-center">
                    <motion.div
                      className={`w-40 h-28 rounded-xl shadow-md relative cursor-pointer overflow-hidden ${currentTheme.envelopeBg}`}
                      whileHover={{ scale: 1.03, rotate: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleOpenLetter}
                      title="Klik untuk membuka ucapan"
                    >
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        {/* Big glowing breaking wax seal heart */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 bg-[#F4F1EA] border border-[#2D2A26]/10 rounded-full shadow-sm flex items-center justify-center"
                        >
                          <Heart className="w-6 h-6 fill-[#2D2A26] text-[#2D2A26]" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/20" />
                      <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-white/10" />
                    </motion.div>
                  </div>

                  <div className="w-full">
                    <button
                      id="open-envelope-btn"
                      onClick={handleOpenLetter}
                      className={`w-full py-2.5 rounded-xl font-sans font-semibold text-white tracking-widest text-[11px] uppercase ${currentTheme.primary} shadow-sm hover:translate-y-[-1px] active:translate-y-0 transition-all flex items-center justify-center gap-2`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      BUKA AMPLOP SPESIAL
                    </button>
                    {!isBirthdayToday && (
                      <span className="text-[9px] text-[#2D2A26]/55 block mt-2 text-center font-sans tracking-wide">
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Custom stats metadata & photo placeholder */}
              <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col gap-6 justify-center h-full sm:pt-4 max-w-xs sm:max-w-sm md:max-w-none mx-auto w-full">
                {/* Elegant Rounded Image Placeholder Frame with Real Cover Image */}
                <div className="w-full aspect-[4/5] rounded-t-full relative overflow-hidden flex flex-col items-center justify-center border border-[#2D2A26]/15 bg-[#E5E1D8]/20 group shadow-inner">
                  {memories[0]?.imageUrl ? (
                    <img
                      src={memories[0].imageUrl}
                      alt="Cover Foto"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="p-6 text-center select-none flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border border-[#2D2A26]/10 flex items-center justify-center mb-2 bg-[#F4F1EA]">
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                      </div>
                      <span className="font-sans uppercase text-[9px] tracking-widest opacity-60 italic font-medium text-[#2D2A26]">Mencintaimu Tanpa Akhir</span>
                      <p className="font-serif text-[11px] italic text-[#2D2A26]/50 mt-1">"Sebuah arsip rasa yang kekal"</p>
                    </div>
                  )}
                </div>

                {/* Chic Metadata Box */}
                <div className="flex flex-col gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-[#2D2A26]/10">
                  <div className="flex justify-between text-[10px] font-sans uppercase tracking-widest text-[#2D2A26]">
                    <span>Hari Lahir</span>
                    <span className="font-semibold">{formatToEditorialDate(config.birthDate)}</span>
                  </div>
                  <div className="editorial-line opacity-50 my-0.5"></div>
                  <div className="flex justify-between text-[10px] font-sans uppercase tracking-widest text-[#2D2A26]">
                    <span>Hari Bersama</span>
                    <span className="font-semibold text-amber-900">{timeTogether.days} Hari</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl italic leading-none font-serif text-[#2D2A26]">Sehat selalu &<br />bahagia bersamaku.</p>
                  <p className="font-sans uppercase text-[8px] tracking-[0.25em] mt-3 opacity-60 text-[#2D2A26]">With All My Love, Your Boyfriend</p>
                </div>
              </div>
            </main>

            {/* Editorial Footer */}
            <footer className="mt-8 sm:mt-10 flex justify-between items-end w-full max-w-5xl mx-auto">
              <div className="w-full">
                <div className="editorial-line mb-3"></div>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>

      {/* STAGE B: MAIN REVEAL CELEBRATORY LAYOUT (ONCE LETTER IS OPENED) */}
      <AnimatePresence>
        {isOpened && (
          <div className="w-full flex-1 flex flex-col relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8 font-serif text-[#2D2A26]">
            
            {/* HERO SECTION - GREETING TITLE & ANIMATED BALLOONS */}
            <motion.div
              id="celebration-hero-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full bg-white/50 backdrop-blur-sm border border-[#2D2A26]/15 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
            >
              <div className="space-y-4 max-w-lg relative z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#2D2A26] tracking-tight leading-tight font-serif">
                  Selamat Hari Lahir, <br />
                  <span className={`font-semibold italic`}>
                    {config.partnerName}
                  </span>
                </h1>
 
                <p className="text-xs sm:text-sm text-[#2D2A26]/80 leading-relaxed font-serif italic">
                  "Today is a special day because it's the day you came into this world. I hope this new chapter of your life brings you happiness, peace, and countless reasons to smile."
                </p>
              </div>
 
              {/* Dynamic Interactive Birthday Candle simulation */}
              <div className="flex flex-col items-center justify-center p-6 bg-[#F4F1EA]/60 border border-[#2D2A26]/12 rounded-2xl relative min-w-[220px]">
                
                <div className="w-24 h-24 flex items-end justify-center relative pb-3">
                  {/* Birthday Cake Drawing Vector */}
                  <div className="w-20 h-10 bg-[#E5E1D8] border border-[#2D2A26]/20 rounded relative flex justify-around">
                    <div className="w-2 h-4 bg-amber-100/50 rounded-t" />
                    <div className="w-2 h-4 bg-amber-100/50 rounded-t" />
                    <div className="w-2 h-4 bg-amber-100/50 rounded-t" />
                  </div>
                  
                  {/* Single Big Candle */}
                  <div className="absolute bottom-10 w-3 h-10 bg-[#3C4A3E] rounded flex justify-center">
                    <div className="w-[1px] h-3 bg-[#E5E1D8]/70" />
                    
                    {/* Animated Flame */}
                    {!candleBlown ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, 5, -5, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="absolute top-[-18px] w-4 h-6 bg-gradient-to-t from-orange-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.4)] cursor-pointer"
                        title="Klik lilin untuk meniupnya!"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCandleBlown(true);
                          spawnHeart();
                        }}
                      />
                    ) : (
                      <div className="absolute top-[-4px] text-xs font-bold text-slate-400 font-mono select-none">💨</div>
                    )}
                  </div>
                </div>
 
                <div className="text-center mt-3">
                  {!candleBlown ? (
                    <button
                      id="blow-candle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCandleBlown(true);
                      }}
                      className="px-4 py-1.5 text-[9px] font-sans tracking-widest uppercase bg-[#2D2A26] hover:bg-[#44403c] text-[#F4F1EA] rounded-md transition-all flex items-center justify-center gap-1 shadow-sm border border-[#2D2A26]/10"
                    >
                      <span>Tiup Lilin Ultah 🎂</span>
                    </button>
                  ) : (
                    <div className="text-xs text-[#2D2A26] font-semibold font-serif flex flex-col items-center justify-center gap-1">
                      <span className="flex items-center gap-1 text-emerald-900 italic font-bold">
                        <PartyPopper className="w-3.5 h-3.5 text-emerald-800 animate-bounce" />
                        Lilin Berhasil Ditiup!
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCandleBlown(false);
                        }}
                        className="text-[9px] font-sans uppercase tracking-wider text-[#2D2A26]/60 underline mt-1 hover:text-[#2D2A26]"
                      >
                        Nyalakan Lagi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* BALLOON POPPING INTERACTIVE GAME */}
            <motion.div
              id="balloon-pop-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-white/50 backdrop-blur-sm border border-[#2D2A26]/15 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-4"
            >
              <div>
                <h3 className="text-xl font-serif font-black text-[#2D2A26] mt-2">Letuskan Balon🎈</h3>
                <p className="text-xs text-[#2D2A26]/75 max-w-md mx-auto font-serif italic">Ada pesan-pesan di setiap balon. Letuskan setiap balon!</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 max-w-2xl mx-auto">
                {balloons.map((b, idx) => {
                  const isPopped = poppedBalloons.includes(idx);
                  // Map cartoonish bright colors to elegant editorial dusty values
                  const elegantColors = [
                    'bg-[#7B5E59] hover:bg-[#6A4E49]', // Dusty copper rose
                    'bg-[#826E56] hover:bg-[#715E46]', // Antique gold
                    'bg-[#51647F] hover:bg-[#40536E]', // Slate blue
                    'bg-[#5D4A66] hover:bg-[#4C3955]', // Muted plum
                  ];
                  const balloonColorClass = elegantColors[idx] || 'bg-[#2D2A26]';
                  
                  return (
                    <motion.div
                      key={idx}
                      whileHover={!isPopped ? { scale: 1.03, y: -2 } : {}}
                      className={`p-4 rounded-xl border border-[#2D2A26]/10 transition-all relative flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
                        isPopped
                          ? 'bg-[#F4F1EA]/60 text-[#2D2A26]/60 italic font-serif'
                          : `${balloonColorClass} text-[#F4F1EA] shadow-sm`
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isPopped) {
                          setPoppedBalloons((prev) => [...prev, idx]);
                          spawnHeart();
                        }
                      }}
                    >
                      {!isPopped ? (
                        <div className="flex flex-col items-center space-y-2">
                          {/* Balloon String Icon View */}
                          <div className="w-10 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 shadow-inner">
                            <Heart className="w-4 h-4 fill-white text-transparent" />
                          </div>
                          <div className="w-1 h-1 bg-white/30 rounded-full" />
                          <div className="w-[1px] h-4 bg-white/30" />
                          <span className="text-[10px] font-sans font-medium tracking-widest uppercase bg-black/15 px-2 py-0.5 rounded">
                            {b.label}
                          </span>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-xs font-serif leading-relaxed px-1 text-center"
                        >
                          <p>"{b.msg}"</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>


            </motion.div>

            {/* ANNIVERSARY CALENDAR COUNTER GRAPH */}
            <motion.div
              id="anniversary-love-tracker-animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full bg-[#2D2A26] border border-[#2D2A26] text-[#F4F1EA] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden"
            >
              <div className="space-y-2 z-10 text-center md:text-left">
                <h3 className="text-xl font-serif font-semibold tracking-tight mt-2 text-[#F4F1EA]">Waktu Kita Bersama</h3>
                <p className="text-xs text-[#F4F1EA]/75 max-w-sm font-serif italic">
                  Time keeps passing, but every moment with you has been precious since we chose each other.
                </p>
              </div>

              {/* Dynamic Ticking Editorial Counters */}
              <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center z-10 w-full sm:w-auto">
                {[
                  { value: timeTogether.days, label: 'Hari' },
                  { value: timeTogether.hours, label: 'Jam' },
                  { value: timeTogether.minutes, label: 'Menit' },
                  { value: timeTogether.seconds, label: 'Detik' },
                ].map((item, index) => (
                  <div key={index} className="p-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center min-w-0 sm:min-w-[75px] backdrop-blur-sm">
                    <span className="text-lg sm:text-2xl font-bold font-sans text-rose-300 tracking-tight">{item.value}</span>
                    <span className="text-[8px] text-[#F4F1EA]/60 font-sans tracking-widest font-bold uppercase mt-1 text-center truncate w-full">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* POLAROID MEMORIES SHIELD GALERY */}
            <motion.div
              id="moments-timeline-carousel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full space-y-4"
            >
              <div className="text-center">
                <h2 className="text-2xl font-serif font-black text-[#2D2A26] mt-2">📸 Kumpulan Kenangan Indah</h2>
                <p className="text-xs text-[#2D2A26]/70 max-w-sm mx-auto font-serif italic">Potret kecil dari momen-momen berharga.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {memories.map((memo, index) => (
                  <motion.div
                    key={memo.id}
                    whileHover={{ scale: 1.01, y: -4, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                    className="bg-[#FDFDFB] border border-[#2D2A26]/12 p-4 pb-6 rounded-xl shadow-none flex flex-col justify-between hover:border-[#2D2A26]/25 transition-all"
                  >
                    {/* Retro polaroid mock */}
                    <div className="w-full aspect-[4/3] bg-[#F4F1EA] rounded-lg overflow-hidden mb-4 relative">
                      <img
                        src={memo.imageUrl}
                        alt={memo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[25%] hover:grayscale-0 transition-all duration-700"
                      />
                      <span className="absolute bottom-2 right-2 bg-[#2D2A26]/85 text-white font-sans text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {memo.date}
                      </span>
                    </div>

                    <div className="space-y-1 text-[#2D2A26]">
                      <h4 className="font-serif font-bold text-sm tracking-tight text-[#2D2A26]">{memo.title}</h4>
                      <p className="text-xs text-[#2D2A26]/75 leading-relaxed font-serif italic">"{memo.description}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {memories.length === 0 && (
                <p className="text-xs text-[#2D2A26]/60 italic text-center py-8 bg-[#FDFDFB] border border-dashed border-[#2D2A26]/20 rounded-xl">
                  Belum ada jepretan foto momen berharga yang disimpan.
                </p>
              )}
            </motion.div>

            {/* RELATIONSHIP KNOWLEDGE TRIVIA QUIZ */}
            <motion.div
              id="relationship-quiz-box-animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="w-full bg-white/40 backdrop-blur-sm border border-[#2D2A26]/15 rounded-2xl p-6 sm:p-8 shadow-sm relative"
            >
              <div className="text-center space-y-1.5 mb-6">
                <h3 className="text-xl font-serif font-black text-[#2D2A26] mt-2">Seberapa Kenal Kamu tentang Kita? 🤔</h3>
              </div>

              {quizzes.length > 0 && !quizFinished ? (
                <div className="max-w-xl mx-auto space-y-4">
                  {/* Progress steps dots */}
                  <div className="flex justify-center gap-1.5 mb-2">
                    {quizzes.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeQuizIndex ? 'bg-[#2D2A26] w-8' : i < activeQuizIndex ? 'bg-[#2D2A26]/40' : 'bg-[#2D2A26]/10'
                        }`}
                      />
                    ))}
                  </div>

                  {/* The Question */}
                  <div className="p-4 bg-[#F4F1EA]/60 border border-[#2D2A26]/10 rounded-xl text-center">
                    <p className="text-[9px] font-sans font-semibold text-[#2D2A26]/60 tracking-widest mb-1 uppercase">Pertanyaan {activeQuizIndex + 1} dari {quizzes.length}</p>
                    <h4 className="text-sm sm:text-base font-serif font-semibold text-[#2D2A26] leading-normal italic">"{quizzes[activeQuizIndex].question}"</h4>
                  </div>

                  {/* Multiple Choices List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {quizzes[activeQuizIndex].choices.map((choice, choiceIdx) => {
                      const isCorrect = choiceIdx === quizzes[activeQuizIndex].correctIndex;
                      const isSelected = selectedAnswer === choiceIdx;
                      
                      let choiceStyle = 'bg-white hover:bg-[#F4F1EA]/40 text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#2D2A26]/30';
                      
                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          // Correct Choice highlighted green
                          choiceStyle = 'bg-emerald-50 text-emerald-800 border-emerald-900/20 font-semibold';
                        } else if (isSelected) {
                          // Incorrect chosen highlighted red
                          choiceStyle = 'bg-rose-50 text-rose-800 border-rose-900/20 font-semibold';
                        } else {
                          choiceStyle = 'bg-transparent text-[#2D2A26]/40 border-[#2D2A26]/5 opacity-55';
                        }
                      }

                      return (
                        <motion.button
                          key={choiceIdx}
                          disabled={selectedAnswer !== null}
                          whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                          whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClick(choiceIdx);
                          }}
                          className={`p-3 border rounded-lg font-serif text-xs px-4 text-left transition-all ${choiceStyle} flex items-center justify-between gap-1.5`}
                        >
                          <span>{choice}</span>
                          {selectedAnswer !== null && isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanatory Message popup */}
                  <AnimatePresence>
                    {showQuizResultMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-[#F4F1EA]/70 border border-[#2D2A26]/10 rounded-xl flex flex-col items-center text-center space-y-2 mt-4"
                      >
                        <p className="text-xs leading-relaxed font-serif text-[#2D2A26]">
                          {selectedAnswer === quizzes[activeQuizIndex].correctIndex ? (
                            <span className="text-emerald-800 block font-bold italic font-serif">🎉 Bener Banget!</span>
                          ) : (
                            <span className="text-rose-800 block font-bold italic font-serif">😢 Dih Apaan Kok Salah?</span>
                          )}
                          <span className="text-[#2D2A26]/80 mt-1 block">
                            {selectedAnswer === quizzes[activeQuizIndex].correctIndex 
                              ? quizzes[activeQuizIndex].successMessage 
                              : `Jawaban benarnya adalah: "${quizzes[activeQuizIndex].choices[quizzes[activeQuizIndex].correctIndex]}". Udah ngga sayang ya?`}
                          </span>
                        </p>

                        <button
                          id="submit-quiz-trivia-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextQuiz();
                          }}
                          className="mt-2 py-1.5 px-4 bg-[#2D2A26] hover:bg-[#3C3834] text-white font-sans text-[9px] uppercase tracking-widest font-semibold rounded transition-all flex items-center gap-1.5"
                        >
                          <span>Pertanyaan Berikutnya</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="max-w-md mx-auto text-center p-6 bg-[#F4F1EA]/60 border border-[#2D2A26]/10 rounded-xl space-y-4">
                  <h4 className="text-lg font-serif font-black text-[#2D2A26]">Udah Habis Kuisnya</h4>
                  <div className="text-sm text-[#2D2A26]/80">
                    <p className="leading-relaxed font-serif">Skormu : <strong className="text-[#2D2A26] font-bold text-base">{quizScore}</strong> dari <strong className="font-semibold">{quizzes.length}</strong> pertanyaan.</p>
                    <p className="text-xs text-[#2D2A26]/70 mt-2 font-serif italic">
                      {quizScore === quizzes.length 
                        ? 'Wajar dapet skor bagus' 
                        : 'Segampang itu ngelupain? udah ngga sayang'}
                    </p>
                  </div>
                  <button
                    id="restart-quiz-trivia"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetQuiz();
                    }}
                    className="px-4 py-2 bg-[#2D2A26] hover:bg-[#3D3A36] text-[#F4F1EA] font-sans text-[9px] uppercase tracking-widest font-semibold rounded transition-all"
                  >
                    Ulangi Kuis Cinta
                  </button>
                </div>
              )}
            </motion.div>

            {/* HEARTWARMING MAIN LETTER BOX COMPONENT */}
            <motion.div
              id="main-wish-letter-animate-fade-in"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-[#FDFDFB] border border-[#2D2A26]/12 rounded-2xl p-6 sm:p-10 shadow-none relative flex flex-col space-y-6"
            >
              <div className="text-center space-y-1 mb-2 z-10">
                <h3 className="text-2xl font-serif font-black text-[#2D2A26] mt-2">Sepucuk Ucapan Dari Aku</h3>
              </div>

              {/* The Letter Text displaying cursive like serif */}
              <div className="text-[#2D2A26]/90 leading-relaxed font-serif text-sm sm:text-base border-y border-[#2D2A26]/15 py-6 whitespace-pre-wrap z-10 max-w-2xl mx-auto italic p-4 bg-[#F4F1EA]/40 rounded-xl">
                {config.letterContent}
              </div>

              {/* Small Love Signature Box */}
              <div className="text-right pr-4 z-10 space-y-1">
                <p className="text-[10px] text-[#2D2A26]/50 font-sans uppercase tracking-widest">Ur Boyfriend,</p>
                <div className="flex items-center justify-end gap-1.5">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-800 fill-rose-800" />
                  </motion.div>
                  <span className="font-serif font-semibold text-sm text-[#2D2A26]">Helris</span>
                </div>
              </div>
            </motion.div>

            {/* MUSIC PLAYER CONTROL BAR (Simulated / Audio synthesize tracker view) */}
            <motion.div
              id="audio-synth-music-track"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/40 border border-[#2D2A26]/12 py-3 px-5 rounded-xl shadow-none relative overflow-hidden flex items-center justify-between backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#2D2A26]/5 text-[#2D2A26] rounded-lg relative">
                  <Music className={`w-4 h-4 ${musicPlaying ? 'text-[#2D2A26] animate-spin' : 'text-[#2D2A26]/40'}`} />
                  {musicPlaying && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#2D2A26] rounded-full animate-ping" />
                  )}
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xs text-[#2D2A26] leading-snug">
                    {config.soundtrackType === 'hbd' ? 'Happy Birthday Retro Lullaby' : 'Romantic Chiptune (Canon)'}
                  </h5>
                  <p className="text-[9px] text-[#2D2A26]/60 font-sans uppercase tracking-wider">Web Audio Synthesizer (Chiptune 8-Bit)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="music-play-btn"
                  onClick={() => setMusicPlaying((prev) => !prev)}
                  className={`p-1.5 rounded-lg border ${
                    musicPlaying
                      ? 'bg-[#2D2A26] border-[#2D2A26]/10 text-[#F4F1EA] hover:bg-[#3d3a36]'
                      : 'bg-[#F4F1EA]/60 border-[#2D2A26]/10 text-[#2D2A26]/65 hover:bg-[#F4F1EA]'
                  } transition-all`}
                  title="Mainkan/Hentikan Musik Latar"
                >
                  {musicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* EXPLANATORY AND GUIDE FOOTER SECTION */}
            <div className="text-center pt-8 text-[10px] text-[#2D2A26]/60 space-y-2 pb-16">
              <p className="font-sans uppercase tracking-wider">
              </p>
              <p className="font-serif italic max-w-md mx-auto text-[#2D2A26]/80 text-[11px]">
                "Cinta sejati bukanlah tentang seberapa sering merayakan kemegahan, melainkan seberapa kokoh kita merawat rasa bersyukur dalam setiap kebersamaan kecil yang sederhana."
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
