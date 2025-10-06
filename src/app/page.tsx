'use client';

import React, { useState, useEffect, useId } from 'react';
import { 
  Home, 
  Dumbbell, 
  ChefHat, 
  Users, 
  Heart, 
  ShoppingBag,
  Trophy,
  Target,
  Flame,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Play,
  Clock,
  User,
  MessageCircle,
  ThumbsUp,
  Plus,
  Search,
  Filter,
  Calculator,
  Camera,
  Bell,
  Settings,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Mic,
  MicOff,
  Upload,
  BarChart3,
  Zap,
  Share2,
  Edit3,
  ChevronRight,
  Activity,
  CheckCircle,
  Pause,
  SkipForward,
  Volume2,
  Repeat,
  Music,
  Headphones,
  Shuffle,
  Droplets,
  Pill,
  AlarmClock,
  Timer,
  UserPlus,
  UserMinus,
  Eye,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  RefreshCw,
  Save,
  Edit,
  Weight,
  Ruler,
  TrendingDown,
  Mail,
  Lock,
  EyeOff,
  LogIn,
  UserCheck,
  LineChart,
  PieChart,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Info,
  ChevronLeft,
  Download,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  trainingFrequency: number;
  trainingLocation: string;
  experienceLevel: string;
  dietaryRestrictions: string[];
  trainingPreference: string;
  isCompleted: boolean;
  email?: string;
  phone?: string;
  city?: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isPaid: boolean;
  createdAt: string;
  loginMethod: 'email' | 'google';
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  duration: string;
  rest: string;
  completed: boolean;
  instructions: string;
  muscleGroup: string;
}

interface WorkoutSession {
  id: string;
  date: string;
  dayOfWeek: string;
  muscleGroup: string;
  exercises: Exercise[];
  totalTime: number;
  caloriesBurned: number;
  completed: boolean;
}

interface WeeklyPlan {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  difficulty: string;
  tags: string[];
  adaptedFor: string[];
}

interface NotificationSettings {
  supplement: {
    enabled: boolean;
    morningTime: string;
    lunchTime: string;
  };
  water: {
    enabled: boolean;
    frequency: number;
    startTime: string;
    endTime: string;
  };
}

interface CommunityUser {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
  posts: number;
  bio: string;
  goal: string;
  isFollowing: boolean;
}

interface Post {
  id: string;
  user: CommunityUser;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
  hashtags: string[];
}

interface ProgressPhoto {
  id: string;
  date: string;
  type: 'before' | 'after' | 'progress';
  url: string;
  weight?: number;
  notes?: string;
}

interface BodyMeasurement {
  id: string;
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  duration: string;
  image: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
}

export default function ProShapeApp() {
  // Estados de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Estados básicos
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(8);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showWorkoutSession, setShowWorkoutSession] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CommunityUser | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutSession | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [personalizedRecipes, setPersonalizedRecipes] = useState<Recipe[]>([]);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([]);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  
  // IDs estáveis para componentes
  const workoutId = useId();
  const recipeId = useId();
  const postId = useId();
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    goal: '',
    trainingFrequency: 0,
    trainingLocation: '',
    experienceLevel: '',
    dietaryRestrictions: [],
    trainingPreference: '',
    isCompleted: false
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    supplement: {
      enabled: true,
      morningTime: '08:00',
      lunchTime: '12:00'
    },
    water: {
      enabled: true,
      frequency: 2,
      startTime: '07:00',
      endTime: '22:00'
    }
  });

  // Effect para verificar autenticação
  useEffect(() => {
    setIsClient(true);
    
    // Verificar se usuário está logado
    const savedAuth = localStorage.getItem('proshape-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setCurrentUser(authData);
        setIsAuthenticated(true);
        setShowAuth(false);
        
        // Carregar dados do usuário
        loadUserData();
      } catch (error) {
        console.error('Erro ao carregar autenticação:', error);
        localStorage.removeItem('proshape-auth');
      }
    }
  }, []);

  // Carregar dados do usuário
  const loadUserData = () => {
    // Carregar dados do localStorage apenas no cliente
    const savedProfile = localStorage.getItem('proshape-profile');
    
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        if (!profile.isCompleted) {
          setShowQuiz(true);
        } else {
          generatePersonalizedRecipes(profile);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setShowQuiz(true);
      }
    } else {
      setShowQuiz(true);
    }

    // Carregar histórico de treinos
    const savedHistory = localStorage.getItem('proshape-workout-history');
    if (savedHistory) {
      try {
        setWorkoutHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }

    // Carregar fotos de progresso
    const savedPhotos = localStorage.getItem('proshape-progress-photos');
    if (savedPhotos) {
      try {
        setProgressPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error('Erro ao carregar fotos:', error);
      }
    }

    // Carregar medidas corporais
    const savedMeasurements = localStorage.getItem('proshape-body-measurements');
    if (savedMeasurements) {
      try {
        setBodyMeasurements(JSON.parse(savedMeasurements));
      } catch (error) {
        console.error('Erro ao carregar medidas:', error);
      }
    }

    setupSmartNotifications();
  };

  // Função de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      // Simular validação de login
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verificar se é um usuário válido (simulação)
      if (authForm.email && authForm.password.length >= 6) {
        const userData: AuthUser = {
          id: `user-${Date.now()}`,
          name: authForm.name || authForm.email.split('@')[0],
          email: authForm.email,
          isPaid: true, // Para demo, todos são usuários pagos
          createdAt: new Date().toISOString(),
          loginMethod: 'email'
        };

        // Salvar dados de autenticação
        localStorage.setItem('proshape-auth', JSON.stringify(userData));
        setCurrentUser(userData);
        setIsAuthenticated(true);
        setShowAuth(false);
        
        // Carregar dados do usuário
        loadUserData();
        
        setUserPoints(prev => prev + 50); // Bônus de login
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro no login. Verifique suas credenciais.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Função de cadastro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      // Validações
      if (!authForm.name || !authForm.email || !authForm.password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (authForm.password !== authForm.confirmPassword) {
        throw new Error('Senhas não coincidem');
      }

      if (authForm.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Simular cadastro
      await new Promise(resolve => setTimeout(resolve, 2000));

      const userData: AuthUser = {
        id: `user-${Date.now()}`,
        name: authForm.name,
        email: authForm.email,
        isPaid: true, // Para demo, todos são usuários pagos
        createdAt: new Date().toISOString(),
        loginMethod: 'email'
      };

      // Salvar dados de autenticação
      localStorage.setItem('proshape-auth', JSON.stringify(userData));
      setCurrentUser(userData);
      setIsAuthenticated(true);
      setShowAuth(false);
      
      // Inicializar perfil do usuário
      const initialProfile = {
        ...userProfile,
        name: authForm.name
      };
      setUserProfile(initialProfile);
      
      // Mostrar quiz inicial
      setShowQuiz(true);
      setUserPoints(prev => prev + 100); // Bônus de cadastro
      
    } catch (error: any) {
      alert(error.message || 'Erro no cadastro. Tente novamente.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Login com Google (simulado)
  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    
    try {
      // Simular login com Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: AuthUser = {
        id: `google-user-${Date.now()}`,
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        isPaid: true,
        createdAt: new Date().toISOString(),
        loginMethod: 'google'
      };

      localStorage.setItem('proshape-auth', JSON.stringify(userData));
      setCurrentUser(userData);
      setIsAuthenticated(true);
      setShowAuth(false);
      
      // Inicializar perfil
      const initialProfile = {
        ...userProfile,
        name: userData.name
      };
      setUserProfile(initialProfile);
      setShowQuiz(true);
      setUserPoints(prev => prev + 75);
      
    } catch (error) {
      alert('Erro no login com Google. Tente novamente.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('proshape-auth');
    localStorage.removeItem('proshape-profile');
    localStorage.removeItem('proshape-workout-history');
    localStorage.removeItem('proshape-progress-photos');
    localStorage.removeItem('proshape-body-measurements');
    localStorage.removeItem('proshape-recipes');
    
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowAuth(true);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    
    // Reset todos os estados
    setUserProfile({
      name: '',
      age: 0,
      weight: 0,
      height: 0,
      goal: '',
      trainingFrequency: 0,
      trainingLocation: '',
      experienceLevel: '',
      dietaryRestrictions: [],
      trainingPreference: '',
      isCompleted: false
    });
    setWorkoutHistory([]);
    setProgressPhotos([]);
    setBodyMeasurements([]);
    setPersonalizedRecipes([]);
  };

  // Renderizar tela de autenticação
  const renderAuth = () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46b8836b-d8ef-48ff-99b1-8068e26be8d5.png" 
              alt="Pro Shape Logo" 
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Pro Shape</h1>
          <p className="text-slate-400 text-sm">by Olyna Suplementos</p>
        </div>

        {/* Tabs de Login/Cadastro */}
        <div className="flex bg-slate-700 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-slate-400 text-sm mb-2">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 text-sm mb-2">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={authForm.password}
                onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 pr-12 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                placeholder="Digite sua senha"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-slate-400 text-sm mb-2">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={authForm.confirmPassword}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                  placeholder="Confirme sua senha"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {authLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? <LogIn className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                <span>{authMode === 'login' ? 'Entrar' : 'Criar Conta'}</span>
              </>
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-600"></div>
          <span className="px-4 text-slate-400 text-sm">ou</span>
          <div className="flex-1 border-t border-slate-600"></div>
        </div>

        {/* Login com Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={authLoading}
          className="w-full bg-white text-slate-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continuar com Google</span>
        </button>

        {/* Informações sobre o app pago */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">App Premium</span>
          </div>
          <p className="text-slate-300 text-sm">
            Acesso completo a treinos personalizados, receitas adaptadas, comunidade exclusiva e integração com Spotify.
          </p>
        </div>

        {/* Termos */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="text-teal-400 hover:text-teal-300">Termos de Uso</a> e{' '}
          <a href="#" className="text-teal-400 hover:text-teal-300">Política de Privacidade</a>
        </p>
      </div>
    </div>
  );

  // Renderizar Tela de Perfil do Usuário
  const renderProfileScreen = () => (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Meu Perfil</h2>
                <p className="text-slate-400">Informações pessoais e configurações</p>
              </div>
            </div>
            <button
              onClick={() => setShowProfile(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="bg-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Informações Básicas</h3>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>{editingProfile ? 'Cancelar' : 'Editar'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Nome</label>
                {editingProfile ? (
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.name || currentUser?.name || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">E-mail</label>
                {editingProfile ? (
                  <input
                    type="email"
                    value={userProfile.email || currentUser?.email || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.email || currentUser?.email || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Idade</label>
                {editingProfile ? (
                  <input
                    type="number"
                    value={userProfile.age || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.age ? `${userProfile.age} anos` : 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Telefone</label>
                {editingProfile ? (
                  <input
                    type="tel"
                    value={userProfile.phone || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                    placeholder="(11) 99999-9999"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.phone || 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Peso Atual</label>
                {editingProfile ? (
                  <input
                    type="number"
                    value={userProfile.weight || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                    placeholder="Ex: 70"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.weight ? `${userProfile.weight} kg` : 'Não informado'}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Altura</label>
                {editingProfile ? (
                  <input
                    type="number"
                    value={userProfile.height || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none"
                    placeholder="Ex: 165"
                  />
                ) : (
                  <p className="text-white font-medium">{userProfile.height ? `${userProfile.height} cm` : 'Não informado'}</p>
                )}
              </div>
            </div>

            {editingProfile && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    saveProfile();
                    setEditingProfile(false);
                  }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-500 transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            )}
          </div>

          {/* Dados do Quiz Inicial */}
          <div className="bg-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Dados do Quiz Inicial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Objetivo Principal:</span>
                  <p className="text-white font-medium capitalize">{userProfile.goal?.replace('-', ' ') || 'Não definido'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Frequência de Treino:</span>
                  <p className="text-white font-medium">{userProfile.trainingFrequency ? `${userProfile.trainingFrequency} dias por semana` : 'Não definido'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Local de Treino:</span>
                  <p className="text-white font-medium capitalize">{userProfile.trainingLocation || 'Não definido'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Nível de Experiência:</span>
                  <p className="text-white font-medium capitalize">{userProfile.experienceLevel || 'Não definido'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Preferência de Treino:</span>
                  <p className="text-white font-medium">{userProfile.trainingPreference?.replace('-', ' ') || 'Não definido'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Restrições Alimentares:</span>
                  <p className="text-white font-medium">
                    {userProfile.dietaryRestrictions?.length > 0 
                      ? userProfile.dietaryRestrictions.join(', ') 
                      : 'Nenhuma'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-400/20 border border-teal-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="text-teal-400 font-bold text-lg">{userPoints}</p>
                  <p className="text-slate-400 text-sm">Pontos Totais</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-400/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-purple-400 font-bold text-lg">Nível {userLevel}</p>
                  <p className="text-slate-400 text-sm">Experiência</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 font-bold text-lg">{workoutHistory.filter(w => w.completed).length}</p>
                  <p className="text-slate-400 text-sm">Treinos Concluídos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowProfile(false);
                  setShowQuiz(true);
                  setQuizStep(0);
                }}
                className="flex items-center space-x-3 p-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-all text-left"
              >
                <RefreshCw className="w-6 h-6 text-teal-400" />
                <div>
                  <p className="text-white font-medium">Refazer Quiz</p>
                  <p className="text-slate-400 text-sm">Atualizar preferências e objetivos</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowProfile(false);
                  setShowEvolution(true);
                }}
                className="flex items-center space-x-3 p-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-all text-left"
              >
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Ver Evolução</p>
                  <p className="text-slate-400 text-sm">Acompanhar progresso e fotos</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar Tela de Evolução
  const renderEvolutionScreen = () => (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Minha Evolução</h2>
                <p className="text-slate-400">Acompanhe seu progresso e transformação</p>
              </div>
            </div>
            <button
              onClick={() => setShowEvolution(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-400/20 border border-teal-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Dumbbell className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="text-teal-400 font-bold text-lg">{workoutHistory.filter(w => w.completed).length}</p>
                  <p className="text-slate-400 text-sm">Treinos Concluídos</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-400/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Flame className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-orange-400 font-bold text-lg">
                    {workoutHistory.reduce((total, w) => total + (w.caloriesBurned || 0), 0)}
                  </p>
                  <p className="text-slate-400 text-sm">Calorias Queimadas</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 font-bold text-lg">
                    {workoutHistory.reduce((total, w) => total + (w.totalTime || 0), 0)}min
                  </p>
                  <p className="text-slate-400 text-sm">Tempo Total</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-400/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Camera className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-purple-400 font-bold text-lg">{progressPhotos.length}</p>
                  <p className="text-slate-400 text-sm">Fotos de Progresso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Peso */}
          <div className="bg-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-teal-400" />
                Evolução do Peso
              </h3>
              <button
                onClick={() => {
                  const weight = prompt('Digite seu peso atual (kg):');
                  if (weight && !isNaN(parseFloat(weight))) {
                    addBodyMeasurement({
                      date: new Date().toISOString().split('T')[0],
                      weight: parseFloat(weight)
                    });
                  }
                }}
                className="flex items-center space-x-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Peso</span>
              </button>
            </div>

            {bodyMeasurements.length > 0 ? (
              <div className="space-y-4">
                <div className="h-48 bg-slate-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-teal-400 mx-auto mb-2" />
                    <p className="text-slate-400">Gráfico de evolução do peso</p>
                    <p className="text-slate-500 text-sm">
                      Peso atual: {bodyMeasurements[bodyMeasurements.length - 1]?.weight}kg
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bodyMeasurements.slice(-3).map((measurement, index) => (
                    <div key={measurement.id} className="bg-slate-600 rounded-lg p-4">
                      <p className="text-slate-400 text-sm">{new Date(measurement.date).toLocaleDateString()}</p>
                      <p className="text-white font-bold text-lg">{measurement.weight}kg</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Weight className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">Nenhum registro de peso ainda</p>
                <p className="text-slate-500 text-sm">Adicione seu primeiro registro para começar a acompanhar sua evolução</p>
              </div>
            )}
          </div>

          {/* Fotos de Progresso */}
          <div className="bg-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Camera className="w-5 h-5 mr-2 text-purple-400" />
                Fotos de Progresso
              </h3>
              <button
                onClick={() => {
                  // Simular upload de foto
                  const newPhoto: ProgressPhoto = {
                    id: `photo-${Date.now()}`,
                    date: new Date().toISOString().split('T')[0],
                    type: 'progress',
                    url: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center`,
                    weight: userProfile.weight,
                    notes: 'Foto de progresso'
                  };
                  
                  const updatedPhotos = [...progressPhotos, newPhoto];
                  setProgressPhotos(updatedPhotos);
                  if (isClient) {
                    localStorage.setItem('proshape-progress-photos', JSON.stringify(updatedPhotos));
                  }
                  setUserPoints(prev => prev + 20);
                }}
                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Adicionar Foto</span>
              </button>
            </div>

            {progressPhotos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {progressPhotos.map((photo) => (
                  <div key={photo.id} className="bg-slate-600 rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] bg-slate-500 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">{new Date(photo.date).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          photo.type === 'before' ? 'bg-blue-500/20 text-blue-400' :
                          photo.type === 'after' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {photo.type === 'before' ? 'Antes' : photo.type === 'after' ? 'Depois' : 'Progresso'}
                        </span>
                      </div>
                      {photo.weight && (
                        <p className="text-white font-medium">{photo.weight}kg</p>
                      )}
                      {photo.notes && (
                        <p className="text-slate-400 text-sm mt-2">{photo.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Camera className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">Nenhuma foto de progresso ainda</p>
                <p className="text-slate-500 text-sm">Adicione fotos para acompanhar sua transformação visual</p>
              </div>
            )}
          </div>

          {/* Comparativo Antes e Depois */}
          {progressPhotos.filter(p => p.type === 'before').length > 0 && progressPhotos.filter(p => p.type === 'after').length > 0 && (
            <div className="bg-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-400" />
                Comparativo Antes e Depois
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="text-blue-400 font-medium mb-4">ANTES</h4>
                  <div className="aspect-[3/4] bg-slate-600 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-sm">
                    {progressPhotos.find(p => p.type === 'before')?.weight}kg
                  </p>
                </div>
                
                <div className="text-center">
                  <h4 className="text-green-400 font-medium mb-4">DEPOIS</h4>
                  <div className="aspect-[3/4] bg-slate-600 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-sm">
                    {progressPhotos.find(p => p.type === 'after')?.weight}kg
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Histórico de Treinos */}
          <div className="bg-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-teal-400" />
              Histórico de Treinos
            </h3>

            {workoutHistory.length > 0 ? (
              <div className="space-y-3">
                {workoutHistory.slice(-5).reverse().map((workout) => (
                  <div key={workout.id} className="bg-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{workout.muscleGroup}</p>
                        <p className="text-slate-400 text-sm">
                          {new Date(workout.date).toLocaleDateString()} • {workout.totalTime}min • {workout.caloriesBurned} cal
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {workout.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-orange-400" />
                        )}
                        <span className={`text-sm font-medium ${
                          workout.completed ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {workout.completed ? 'Concluído' : 'Em andamento'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Dumbbell className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">Nenhum treino realizado ainda</p>
                <p className="text-slate-500 text-sm">Complete seu primeiro treino para começar a acompanhar seu histórico</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar Tela do Spotify
  const renderSpotifyScreen = () => {
    const spotifyPlaylists: SpotifyPlaylist[] = [
      {
        id: 'playlist-1',
        name: 'Pro Shape Cardio',
        description: 'Músicas energéticas para treinos de cardio',
        trackCount: 25,
        duration: '1h 30min',
        image: '🔥'
      },
      {
        id: 'playlist-2',
        name: 'Pro Shape Força',
        description: 'Batidas pesadas para treinos de força',
        trackCount: 30,
        duration: '2h 15min',
        image: '💪'
      },
      {
        id: 'playlist-3',
        name: 'Pro Shape Relaxamento',
        description: 'Músicas calmas para alongamento',
        trackCount: 15,
        duration: '45min',
        image: '🧘'
      }
    ];

    const currentTracks: SpotifyTrack[] = [
      {
        id: 'track-1',
        name: 'Stronger',
        artist: 'Kelly Clarkson',
        duration: '3:42',
        isPlaying: isPlaying && currentTrack === 'track-1'
      },
      {
        id: 'track-2',
        name: 'Eye of the Tiger',
        artist: 'Survivor',
        duration: '4:05',
        isPlaying: isPlaying && currentTrack === 'track-2'
      },
      {
        id: 'track-3',
        name: 'Can\'t Hold Us',
        artist: 'Macklemore & Ryan Lewis',
        duration: '4:18',
        isPlaying: isPlaying && currentTrack === 'track-3'
      }
    ];

    const playTrack = (trackId: string) => {
      if (isPlaying && currentTrack === trackId) {
        setIsPlaying(false);
        setCurrentTrack('');
      } else {
        setIsPlaying(true);
        setCurrentTrack(trackId);
      }
    };

    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Spotify Pro Shape</h2>
                  <p className="text-slate-400">Música para potencializar seus treinos</p>
                </div>
              </div>
              <button
                onClick={() => setShowSpotify(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Status de Conexão */}
            <div className={`rounded-xl p-6 ${
              isSpotifyConnected 
                ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30'
                : 'bg-gradient-to-r from-slate-600/20 to-slate-500/20 border border-slate-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSpotifyConnected ? 'bg-green-500' : 'bg-slate-600'
                  }`}>
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isSpotifyConnected ? 'Conectado ao Spotify' : 'Conectar ao Spotify'}
                    </h3>
                    <p className={`text-sm ${isSpotifyConnected ? 'text-green-400' : 'text-slate-400'}`}>
                      {isSpotifyConnected 
                        ? 'Aproveite suas playlists durante os treinos'
                        : 'Conecte sua conta para acessar suas músicas'
                      }
                    </p>
                  </div>
                </div>
                
                {!isSpotifyConnected && (
                  <button
                    onClick={connectSpotify}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-all flex items-center space-x-2"
                  >
                    <Music className="w-5 h-5" />
                    <span>Conectar</span>
                  </button>
                )}
              </div>
            </div>

            {isSpotifyConnected && (
              <>
                {/* Player de Música */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Headphones className="w-5 h-5 mr-2 text-green-400" />
                    Player de Música
                  </h3>
                  
                  <div className="bg-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-medium">
                          {isPlaying ? currentTracks.find(t => t.id === currentTrack)?.name || 'Nenhuma música' : 'Nenhuma música tocando'}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {isPlaying ? currentTracks.find(t => t.id === currentTrack)?.artist || '' : 'Selecione uma música para começar'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <Shuffle className="w-5 h-5" />
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <SkipForward className="w-5 h-5 rotate-180" />
                        </button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <SkipForward className="w-5 h-5" />
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <Repeat className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400 text-sm">0:00</span>
                      <div className="flex-1 bg-slate-500 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {isPlaying ? currentTracks.find(t => t.id === currentTrack)?.duration || '0:00' : '0:00'}
                      </span>
                      <Volume2 className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Playlists Pro Shape */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Music className="w-5 h-5 mr-2 text-green-400" />
                    Playlists Pro Shape
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {spotifyPlaylists.map((playlist) => (
                      <div key={playlist.id} className="bg-slate-600 rounded-lg p-4 hover:bg-slate-500 transition-all cursor-pointer">
                        <div className="text-center mb-3">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">{playlist.image}</span>
                          </div>
                          <h4 className="text-white font-medium">{playlist.name}</h4>
                          <p className="text-slate-400 text-sm mt-1">{playlist.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-slate-400 text-sm">
                          <span>{playlist.trackCount} músicas</span>
                          <span>{playlist.duration}</span>
                        </div>
                        
                        <button className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-2">
                          <Play className="w-4 h-4" />
                          <span>Reproduzir</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lista de Músicas */}
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Music className="w-5 h-5 mr-2 text-green-400" />
                    Músicas Recomendadas
                  </h3>
                  
                  <div className="space-y-3">
                    {currentTracks.map((track) => (
                      <div key={track.id} className="flex items-center justify-between p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-all">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => playTrack(track.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              track.isPlaying 
                                ? 'bg-green-500 text-white' 
                                : 'bg-slate-500 text-slate-300 hover:bg-green-500 hover:text-white'
                            }`}
                          >
                            {track.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <div>
                            <p className="text-white font-medium">{track.name}</p>
                            <p className="text-slate-400 text-sm">{track.artist}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400 text-sm">{track.duration}</span>
                          <button className="text-slate-400 hover:text-white transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dicas de Uso */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-400" />
                    Dicas para Treinar com Música
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Cardio Intenso</p>
                          <p className="text-slate-400 text-sm">Use músicas com BPM alto (120-140) para manter o ritmo</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Treino de Força</p>
                          <p className="text-slate-400 text-sm">Músicas motivacionais ajudam a superar limites</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Alongamento</p>
                          <p className="text-slate-400 text-sm">Músicas calmas facilitam o relaxamento muscular</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Fones de Ouvido</p>
                          <p className="text-slate-400 text-sm">Use fones adequados para exercícios físicos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Plano Semanal de Treinos
  const renderWorkoutPlan = () => {
    const weeklyPlan = getWeeklyPlan(userProfile);
    const today = new Date().getDay();
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const planKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Plano Semanal de Treinos</h2>
                  <p className="text-slate-400">Escolha o grupo muscular para treinar hoje</p>
                </div>
              </div>
              <button
                onClick={() => setShowWorkoutPlan(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Plano Semanal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayNames.map((day, index) => {
                const planKey = planKeys[index];
                const muscleGroup = weeklyPlan[planKey];
                const isToday = index === today;
                const isRestDay = muscleGroup === 'Descanso';

                return (
                  <div
                    key={day}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      isToday
                        ? 'border-teal-400 bg-teal-400/10'
                        : isRestDay
                        ? 'border-slate-600 bg-slate-700'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500 cursor-pointer'
                    }`}
                    onClick={() => !isRestDay && startWorkoutByMuscleGroup(muscleGroup)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-bold ${isToday ? 'text-teal-400' : 'text-white'}`}>
                        {day}
                      </h3>
                      {isToday && (
                        <span className="bg-teal-400 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                          HOJE
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className={`font-medium ${isRestDay ? 'text-slate-400' : 'text-white'}`}>
                        {muscleGroup}
                      </p>
                      
                      {!isRestDay && (
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>
                            {userProfile.trainingPreference === 'curto-intenso' ? '30min' : '45min'}
                          </span>
                        </div>
                      )}

                      {isRestDay ? (
                        <div className="flex items-center space-x-2 text-slate-500 text-sm">
                          <Heart className="w-4 h-4" />
                          <span>Dia de recuperação</span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startWorkoutByMuscleGroup(muscleGroup);
                          }}
                          className={`w-full mt-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                            isToday
                              ? 'bg-teal-400 text-slate-900 hover:bg-teal-500'
                              : 'bg-slate-600 text-white hover:bg-slate-500'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          <span>Iniciar Treino</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seleção Manual de Grupo Muscular */}
            <div className="bg-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-400" />
                Treinar Grupo Muscular Específico
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Peito + Tríceps', icon: '💪', color: 'from-red-500 to-pink-500' },
                  { name: 'Costas + Bíceps', icon: '🏋️', color: 'from-blue-500 to-cyan-500' },
                  { name: 'Pernas + Glúteos', icon: '🦵', color: 'from-green-500 to-emerald-500' },
                  { name: 'Ombros + Trapézio', icon: '🤸', color: 'from-yellow-500 to-orange-500' },
                  { name: 'Braços + Core', icon: '💥', color: 'from-purple-500 to-pink-500' },
                  { name: 'Cardio + Core', icon: '🔥', color: 'from-orange-500 to-red-500' },
                  { name: 'HIIT', icon: '⚡', color: 'from-cyan-500 to-blue-500' },
                  { name: 'Corpo Inteiro', icon: '🎯', color: 'from-teal-500 to-green-500' }
                ].map((group) => (
                  <button
                    key={group.name}
                    onClick={() => startWorkoutByMuscleGroup(group.name)}
                    className={`bg-gradient-to-r ${group.color} p-4 rounded-xl text-white font-medium hover:scale-105 transition-all text-center`}
                  >
                    <div className="text-2xl mb-2">{group.icon}</div>
                    <div className="text-sm">{group.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dicas de Treino */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-400" />
                Dicas para Maximizar seus Treinos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Aquecimento</p>
                      <p className="text-slate-400 text-sm">Sempre faça 5-10 minutos de aquecimento antes do treino</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Hidratação</p>
                      <p className="text-slate-400 text-sm">Beba água antes, durante e após o exercício</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Descanso</p>
                      <p className="text-slate-400 text-sm">Respeite os intervalos entre séries e exercícios</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Progressão</p>
                      <p className="text-slate-400 text-sm">Aumente gradualmente a intensidade dos exercícios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Sessão de Treino
  const renderWorkoutSession = () => {
    if (!currentWorkout) return null;

    const completedExercises = currentWorkout.exercises.filter(ex => ex.completed).length;
    const totalExercises = currentWorkout.exercises.length;
    const progress = (completedExercises / totalExercises) * 100;

    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentWorkout.muscleGroup}</h2>
                  <p className="text-slate-400">
                    {completedExercises} de {totalExercises} exercícios concluídos
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowWorkoutSession(false);
                  setCurrentWorkout(null);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Barra de Progresso */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Progresso do Treino</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {currentWorkout.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className={`rounded-xl p-4 border-2 transition-all ${
                  exercise.completed
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-slate-600 bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      exercise.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-600 text-slate-300'
                    }`}>
                      {exercise.completed ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    <div>
                      <h3 className={`font-bold ${exercise.completed ? 'text-green-400' : 'text-white'}`}>
                        {exercise.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{exercise.muscleGroup}</p>
                    </div>
                  </div>
                  
                  {!exercise.completed && (
                    <button
                      onClick={() => completeExercise(exercise.id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-500 transition-all flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Concluir</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Séries</p>
                    <p className="text-white font-bold">{exercise.sets}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Repetições</p>
                    <p className="text-white font-bold">{exercise.reps}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Duração</p>
                    <p className="text-white font-bold">{exercise.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Descanso</p>
                    <p className="text-white font-bold">{exercise.rest}</p>
                  </div>
                </div>

                <div className="bg-slate-600 rounded-lg p-3">
                  <p className="text-slate-300 text-sm">
                    <strong>Instruções:</strong> {exercise.instructions}
                  </p>
                </div>
              </div>
            ))}

            {/* Resumo do Treino */}
            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-400/20 border border-teal-500/30 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-teal-400" />
                Resumo do Treino
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-teal-400 font-bold text-2xl">{currentWorkout.totalTime}min</p>
                  <p className="text-slate-400 text-sm">Tempo Estimado</p>
                </div>
                <div className="text-center">
                  <p className="text-orange-400 font-bold text-2xl">{currentWorkout.caloriesBurned}</p>
                  <p className="text-slate-400 text-sm">Calorias Queimadas</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 font-bold text-2xl">{totalExercises}</p>
                  <p className="text-slate-400 text-sm">Exercícios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Plano semanal de treinos
  const getWeeklyPlan = (profile: UserProfile): WeeklyPlan => {
    if (profile.goal === 'emagrecer') {
      return {
        monday: 'Cardio + Core',
        tuesday: 'Corpo Inteiro',
        wednesday: 'HIIT',
        thursday: 'Pernas + Glúteos',
        friday: 'Braços + Ombros',
        saturday: 'Cardio Leve',
        sunday: 'Descanso'
      };
    } else if (profile.goal === 'massa-magra') {
      return {
        monday: 'Peito + Tríceps',
        tuesday: 'Costas + Bíceps',
        wednesday: 'Pernas + Glúteos',
        thursday: 'Ombros + Trapézio',
        friday: 'Braços + Core',
        saturday: 'Cardio + Funcional',
        sunday: 'Descanso'
      };
    } else {
      return {
        monday: 'Corpo Inteiro',
        tuesday: 'Cardio',
        wednesday: 'Força',
        thursday: 'Flexibilidade',
        friday: 'Funcional',
        saturday: 'Ativo',
        sunday: 'Descanso'
      };
    }
  };

  // Exercícios por grupo muscular
  const getExercisesByMuscleGroup = (muscleGroup: string, profile: UserProfile): Exercise[] => {
    const exercises: Exercise[] = [];
    const isAdvanced = profile.experienceLevel === 'avancado';
    const sets = isAdvanced ? 4 : 3;
    const reps = isAdvanced ? '12-15' : '8-12';

    switch (muscleGroup) {
      case 'Peito + Tríceps':
        exercises.push(
          {
            id: `${workoutId}-chest-1`,
            name: 'Flexão de Braço',
            sets: sets,
            reps: reps,
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Manter corpo alinhado, descida controlada até o peito quase tocar o chão',
            muscleGroup: 'Peito'
          },
          {
            id: `${workoutId}-chest-2`,
            name: 'Flexão Diamante',
            sets: 3,
            reps: '6-10',
            duration: '30s',
            rest: '60s',
            completed: false,
            instructions: 'Mãos formando diamante, foco no tríceps',
            muscleGroup: 'Tríceps'
          },
          {
            id: `${workoutId}-chest-3`,
            name: 'Mergulho em Cadeira',
            sets: 3,
            reps: '10-15',
            duration: '40s',
            rest: '45s',
            completed: false,
            instructions: 'Usar cadeira estável, descer até 90 graus nos cotovelos',
            muscleGroup: 'Tríceps'
          }
        );
        break;

      case 'Costas + Bíceps':
        exercises.push(
          {
            id: `${workoutId}-back-1`,
            name: 'Remada com Garrafa',
            sets: sets,
            reps: reps,
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Usar garrafa de água como peso, puxar até o abdômen',
            muscleGroup: 'Costas'
          },
          {
            id: `${workoutId}-back-2`,
            name: 'Superman',
            sets: 3,
            reps: '12-20',
            duration: '30s',
            rest: '45s',
            completed: false,
            instructions: 'Deitado de barriga para baixo, elevar braços e pernas simultaneamente',
            muscleGroup: 'Costas'
          },
          {
            id: `${workoutId}-back-3`,
            name: 'Rosca com Garrafa',
            sets: 3,
            reps: '12-15',
            duration: '40s',
            rest: '45s',
            completed: false,
            instructions: 'Movimento controlado, contrair o bíceps no topo',
            muscleGroup: 'Bíceps'
          }
        );
        break;

      case 'Pernas + Glúteos':
        exercises.push(
          {
            id: `${workoutId}-legs-1`,
            name: 'Agachamento Livre',
            sets: sets,
            reps: reps,
            duration: '50s',
            rest: '60s',
            completed: false,
            instructions: 'Descer até 90 graus, força nos calcanhares, glúteos contraídos',
            muscleGroup: 'Pernas'
          },
          {
            id: `${workoutId}-legs-2`,
            name: 'Afundo Alternado',
            sets: 3,
            reps: '10 cada perna',
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Passo largo, joelho da frente a 90 graus',
            muscleGroup: 'Pernas'
          },
          {
            id: `${workoutId}-legs-3`,
            name: 'Elevação Pélvica',
            sets: 3,
            reps: '15-20',
            duration: '40s',
            rest: '45s',
            completed: false,
            instructions: 'Deitado, elevar quadril contraindo glúteos',
            muscleGroup: 'Glúteos'
          },
          {
            id: `${workoutId}-legs-4`,
            name: 'Panturrilha em Pé',
            sets: 3,
            reps: '20-25',
            duration: '30s',
            rest: '30s',
            completed: false,
            instructions: 'Subir na ponta dos pés, contração máxima no topo',
            muscleGroup: 'Panturrilha'
          }
        );
        break;

      case 'Ombros + Trapézio':
        exercises.push(
          {
            id: `${workoutId}-shoulders-1`,
            name: 'Elevação Lateral com Garrafa',
            sets: sets,
            reps: reps,
            duration: '40s',
            rest: '60s',
            completed: false,
            instructions: 'Braços ligeiramente flexionados, elevar até altura dos ombros',
            muscleGroup: 'Ombros'
          },
          {
            id: `${workoutId}-shoulders-2`,
            name: 'Desenvolvimento com Garrafa',
            sets: 3,
            reps: '10-12',
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Empurrar garrafas acima da cabeça, movimento controlado',
            muscleGroup: 'Ombros'
          },
          {
            id: `${workoutId}-shoulders-3`,
            name: 'Encolhimento de Ombros',
            sets: 3,
            reps: '15-20',
            duration: '30s',
            rest: '45s',
            completed: false,
            instructions: 'Elevar ombros em direção às orelhas, segurar 2 segundos',
            muscleGroup: 'Trapézio'
          }
        );
        break;

      case 'Braços + Core':
        exercises.push(
          {
            id: `${workoutId}-arms-1`,
            name: 'Flexão Fechada',
            sets: 3,
            reps: '8-12',
            duration: '40s',
            rest: '60s',
            completed: false,
            instructions: 'Mãos próximas, foco no tríceps',
            muscleGroup: 'Tríceps'
          },
          {
            id: `${workoutId}-arms-2`,
            name: 'Rosca Martelo',
            sets: 3,
            reps: '12-15',
            duration: '40s',
            rest: '45s',
            completed: false,
            instructions: 'Punhos neutros, movimento alternado',
            muscleGroup: 'Bíceps'
          },
          {
            id: `${workoutId}-arms-3`,
            name: 'Prancha',
            sets: 3,
            reps: '30-60s',
            duration: '60s',
            rest: '60s',
            completed: false,
            instructions: 'Corpo alinhado, core contraído',
            muscleGroup: 'Core'
          },
          {
            id: `${workoutId}-arms-4`,
            name: 'Abdominal Bicicleta',
            sets: 3,
            reps: '20 cada lado',
            duration: '45s',
            rest: '45s',
            completed: false,
            instructions: 'Cotovelo ao joelho oposto, movimento controlado',
            muscleGroup: 'Core'
          }
        );
        break;

      case 'Cardio + Core':
        exercises.push(
          {
            id: `${workoutId}-cardio-1`,
            name: 'Burpees',
            sets: 4,
            reps: '8-12',
            duration: '30s',
            rest: '60s',
            completed: false,
            instructions: 'Movimento completo: agachamento, prancha, flexão, salto',
            muscleGroup: 'Cardio'
          },
          {
            id: `${workoutId}-cardio-2`,
            name: 'Mountain Climbers',
            sets: 3,
            reps: '30s',
            duration: '30s',
            rest: '45s',
            completed: false,
            instructions: 'Posição de prancha, alternando joelhos ao peito rapidamente',
            muscleGroup: 'Cardio'
          },
          {
            id: `${workoutId}-cardio-3`,
            name: 'Prancha Lateral',
            sets: 3,
            reps: '20-30s cada lado',
            duration: '60s',
            rest: '45s',
            completed: false,
            instructions: 'Apoio no antebraço, corpo alinhado lateralmente',
            muscleGroup: 'Core'
          }
        );
        break;

      case 'HIIT':
        exercises.push(
          {
            id: `${workoutId}-hiit-1`,
            name: 'Jumping Jacks',
            sets: 4,
            reps: '30s',
            duration: '30s',
            rest: '30s',
            completed: false,
            instructions: 'Saltos abrindo e fechando pernas e braços',
            muscleGroup: 'Cardio'
          },
          {
            id: `${workoutId}-hiit-2`,
            name: 'High Knees',
            sets: 4,
            reps: '30s',
            duration: '30s',
            rest: '30s',
            completed: false,
            instructions: 'Corrida no lugar elevando joelhos ao máximo',
            muscleGroup: 'Cardio'
          },
          {
            id: `${workoutId}-hiit-3`,
            name: 'Squat Jumps',
            sets: 4,
            reps: '20s',
            duration: '20s',
            rest: '40s',
            completed: false,
            instructions: 'Agachamento com salto explosivo',
            muscleGroup: 'Pernas'
          }
        );
        break;

      case 'Corpo Inteiro':
        exercises.push(
          {
            id: `${workoutId}-full-1`,
            name: 'Agachamento',
            sets: 3,
            reps: '12-15',
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Movimento básico, descer até 90 graus',
            muscleGroup: 'Pernas'
          },
          {
            id: `${workoutId}-full-2`,
            name: 'Flexão',
            sets: 3,
            reps: '8-12',
            duration: '40s',
            rest: '60s',
            completed: false,
            instructions: 'Flexão tradicional, corpo alinhado',
            muscleGroup: 'Peito'
          },
          {
            id: `${workoutId}-full-3`,
            name: 'Prancha',
            sets: 3,
            reps: '30-45s',
            duration: '45s',
            rest: '60s',
            completed: false,
            instructions: 'Posição estática, core contraído',
            muscleGroup: 'Core'
          }
        );
        break;

      default:
        exercises.push(
          {
            id: `${workoutId}-default-1`,
            name: 'Caminhada Ativa',
            sets: 1,
            reps: '20-30min',
            duration: '30min',
            rest: '0s',
            completed: false,
            instructions: 'Caminhada em ritmo moderado, respiração controlada',
            muscleGroup: 'Cardio'
          }
        );
    }

    // Adicionar aquecimento no início
    exercises.unshift({
      id: `${workoutId}-warmup`,
      name: 'Aquecimento',
      sets: 1,
      reps: '1',
      duration: '5min',
      rest: '0s',
      completed: false,
      instructions: 'Movimentos articulares e ativação muscular',
      muscleGroup: 'Aquecimento'
    });

    // Adicionar alongamento no final
    exercises.push({
      id: `${workoutId}-stretch`,
      name: 'Alongamento',
      sets: 1,
      reps: '1',
      duration: '5min',
      rest: '0s',
      completed: false,
      instructions: 'Alongamento dos músculos trabalhados',
      muscleGroup: 'Alongamento'
    });

    return exercises;
  };

  // Dados estáticos para evitar problemas de hidratação
  const communityUsers: CommunityUser[] = [
    {
      id: 'user-1',
      name: 'Ana Silva',
      avatar: '👑',
      followers: 1250,
      following: 340,
      posts: 89,
      bio: 'Transformando minha vida com o Pro Shape! 💪 Projeto Verão 2024 em andamento',
      goal: 'Projeto Verão',
      isFollowing: false
    },
    {
      id: 'user-2',
      name: 'João Santos',
      avatar: '💪',
      followers: 890,
      following: 210,
      posts: 156,
      bio: 'Foco no ganho de massa magra. Treinos pesados e alimentação regrada!',
      goal: 'Ganho de massa',
      isFollowing: true
    },
    {
      id: 'user-3',
      name: 'Carla Mendes',
      avatar: '🔥',
      followers: 2100,
      following: 450,
      posts: 234,
      bio: 'Coach fitness | Emagrecimento saudável | Receitas fit incríveis',
      goal: 'Emagrecer',
      isFollowing: true
    }
  ];

  // Posts da comunidade com IDs estáveis
  const [communityPosts, setCommunityPosts] = useState<Post[]>([
    {
      id: 'post-1',
      user: communityUsers[2],
      content: 'Acabei de completar meu treino personalizado! 🔥 O app adaptou perfeitamente para minha rotina em casa!',
      likes: 24,
      comments: 8,
      isLiked: false,
      timestamp: '2h',
      hashtags: ['#ProShapeTeam', '#TreinoPersonalizado']
    },
    {
      id: 'post-2',
      user: communityUsers[1],
      content: 'As receitas adaptadas às minhas restrições estão incríveis! 🥞 Vegano nunca foi tão gostoso!',
      likes: 31,
      comments: 12,
      isLiked: true,
      timestamp: '4h',
      hashtags: ['#ReceitaPersonalizada', '#ProShapeVegano']
    }
  ]);

  // Configurar notificações inteligentes
  const setupSmartNotifications = () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  // Gerar treino personalizado baseado no grupo muscular selecionado
  const generateWorkoutByMuscleGroup = (muscleGroup: string): WorkoutSession => {
    const exercises = getExercisesByMuscleGroup(muscleGroup, userProfile);
    const today = new Date();
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    const totalTime = exercises.reduce((total, ex) => {
      const duration = parseInt(ex.duration) || 0;
      const restTime = parseInt(ex.rest) || 0;
      return total + (duration * ex.sets) + (restTime * (ex.sets - 1));
    }, 0) / 60; // Converter para minutos

    const caloriesBurned = Math.round(totalTime * (userProfile.weight || 70) * 0.1);

    return {
      id: `${workoutId}-session-${Date.now()}`,
      date: today.toISOString().split('T')[0],
      dayOfWeek: dayNames[today.getDay()],
      muscleGroup,
      exercises,
      totalTime: Math.round(totalTime),
      caloriesBurned,
      completed: false
    };
  };

  // Gerar receitas personalizadas
  const generatePersonalizedRecipes = (profile: UserProfile) => {
    const recipes: Recipe[] = [];
    
    if (profile.goal === 'emagrecer') {
      recipes.push(
        {
          id: `${recipeId}-recipe-1`,
          title: 'Smoothie Detox Queima Gordura',
          ingredients: [
            '1 folha de couve',
            '1/2 maçã verde',
            '1 fatia de abacaxi',
            '1 colher de chá de gengibre',
            '200ml de água de coco',
            profile.dietaryRestrictions.includes('lactose') ? '1 colher de proteína vegetal' : '1 colher de whey protein'
          ].filter(Boolean),
          instructions: [
            'Lave bem a couve e corte a maçã',
            'Adicione todos os ingredientes no liquidificador',
            'Bata por 2 minutos até ficar homogêneo',
            'Sirva imediatamente com gelo'
          ],
          calories: 95,
          protein: 8,
          carbs: 18,
          fat: 1,
          prepTime: 5,
          difficulty: 'Fácil',
          tags: ['detox', 'queima-gordura', 'low-cal'],
          adaptedFor: profile.dietaryRestrictions
        },
        {
          id: `${recipeId}-recipe-2`,
          title: 'Salada Power Emagrecimento',
          ingredients: [
            '2 xícaras de folhas verdes mistas',
            '1/2 pepino em fatias',
            '1 tomate cereja cortado',
            '1/4 de abacate',
            '1 colher de sopa de sementes de chia',
            '1 colher de sopa de azeite extra virgem',
            'Suco de 1/2 limão',
            'Sal e pimenta a gosto'
          ],
          instructions: [
            'Lave bem todas as folhas e vegetais',
            'Corte o pepino, tomate e abacate',
            'Monte a salada em uma tigela grande',
            'Tempere com azeite, limão, sal e pimenta',
            'Finalize com as sementes de chia'
          ],
          calories: 180,
          protein: 6,
          carbs: 12,
          fat: 14,
          prepTime: 10,
          difficulty: 'Fácil',
          tags: ['salada', 'detox', 'low-carb'],
          adaptedFor: profile.dietaryRestrictions
        }
      );
    } else if (profile.goal === 'massa-magra') {
      recipes.push(
        {
          id: `${recipeId}-recipe-3`,
          title: 'Panqueca Proteica Power',
          ingredients: [
            '2 ovos inteiros',
            '1 banana madura',
            '2 colheres de aveia',
            profile.dietaryRestrictions.includes('lactose') ? '1 colher de proteína vegetal' : '1 colher de whey protein',
            '1 pitada de canela'
          ].filter(Boolean),
          instructions: [
            'Amasse a banana em um bowl',
            'Adicione os ovos e misture bem',
            'Acrescente aveia, proteína e canela',
            'Aqueça a frigideira e faça as panquecas',
            'Sirva quente com frutas'
          ],
          calories: 280,
          protein: 25,
          carbs: 30,
          fat: 8,
          prepTime: 10,
          difficulty: 'Fácil',
          tags: ['proteica', 'massa-magra', 'pós-treino'],
          adaptedFor: profile.dietaryRestrictions
        },
        {
          id: `${recipeId}-recipe-4`,
          title: 'Frango Grelhado com Batata Doce',
          ingredients: [
            '150g de peito de frango',
            '1 batata doce média',
            '1 colher de sopa de azeite',
            '1 dente de alho picado',
            'Temperos: orégano, alecrim, sal e pimenta',
            '1 xícara de brócolis'
          ],
          instructions: [
            'Tempere o frango com alho e temperos',
            'Corte a batata doce em cubos',
            'Grelhe o frango por 6-8 minutos de cada lado',
            'Asse a batata doce no forno por 25 minutos',
            'Cozinhe o brócolis no vapor por 5 minutos',
            'Sirva tudo junto'
          ],
          calories: 420,
          protein: 35,
          carbs: 45,
          fat: 12,
          prepTime: 35,
          difficulty: 'Médio',
          tags: ['proteica', 'massa-magra', 'completa'],
          adaptedFor: profile.dietaryRestrictions
        }
      );
    }

    // Adicionar receitas universais
    recipes.push({
      id: `${recipeId}-recipe-5`,
      title: 'Vitamina Pós-Treino',
      ingredients: [
        '1 banana',
        '1 xícara de leite' + (profile.dietaryRestrictions.includes('lactose') ? ' vegetal' : ''),
        '1 colher de pasta de amendoim',
        '1 colher de mel',
        'Gelo a gosto'
      ],
      instructions: [
        'Adicione todos os ingredientes no liquidificador',
        'Bata por 1-2 minutos até ficar cremoso',
        'Sirva imediatamente'
      ],
      calories: 320,
      protein: 15,
      carbs: 45,
      fat: 12,
      prepTime: 5,
      difficulty: 'Fácil',
      tags: ['pós-treino', 'vitamina', 'energia'],
      adaptedFor: profile.dietaryRestrictions
    });

    setPersonalizedRecipes(recipes);
    if (isClient) {
      localStorage.setItem('proshape-recipes', JSON.stringify(recipes));
    }
  };

  // Iniciar treino por grupo muscular
  const startWorkoutByMuscleGroup = (muscleGroup: string) => {
    if (!userProfile.isCompleted) {
      setShowQuiz(true);
      return;
    }

    const workout = generateWorkoutByMuscleGroup(muscleGroup);
    setCurrentWorkout(workout);
    setShowWorkoutSession(true);
    setShowWorkoutPlan(false);
    setUserPoints(prev => prev + 30);
  };

  // Completar exercício
  const completeExercise = (exerciseId: string) => {
    if (!currentWorkout) return;

    const updatedWorkout = {
      ...currentWorkout,
      exercises: currentWorkout.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      )
    };

    setCurrentWorkout(updatedWorkout);
    setUserPoints(prev => prev + 10);

    const allCompleted = updatedWorkout.exercises.every(ex => ex.completed);
    if (allCompleted) {
      const completedWorkout = { ...updatedWorkout, completed: true };
      const newHistory = [...workoutHistory, completedWorkout];
      setWorkoutHistory(newHistory);
      if (isClient) {
        localStorage.setItem('proshape-workout-history', JSON.stringify(newHistory));
      }
      setUserPoints(prev => prev + 100);
      
      setTimeout(() => {
        setShowWorkoutSession(false);
        setCurrentWorkout(null);
      }, 2000);
    }
  };

  // Conectar com Spotify
  const connectSpotify = () => {
    setIsSpotifyConnected(true);
    setUserPoints(prev => prev + 25);
  };

  // Salvar perfil editado
  const saveProfile = () => {
    if (isClient) {
      localStorage.setItem('proshape-profile', JSON.stringify(userProfile));
    }
    setEditingProfile(false);
    setUserPoints(prev => prev + 10);
  };

  // Adicionar medida corporal
  const addBodyMeasurement = (measurement: Omit<BodyMeasurement, 'id'>) => {
    const newMeasurement = {
      ...measurement,
      id: `measurement-${Date.now()}`
    };
    const updatedMeasurements = [...bodyMeasurements, newMeasurement];
    setBodyMeasurements(updatedMeasurements);
    if (isClient) {
      localStorage.setItem('proshape-body-measurements', JSON.stringify(updatedMeasurements));
    }
    setUserPoints(prev => prev + 15);
  };

  // Funções da comunidade
  const followUser = (userId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.user.id === userId 
          ? { ...post, user: { ...post.user, isFollowing: !post.user.isFollowing } }
          : post
      )
    );
  };

  const likePost = (postId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    setUserPoints(prev => prev + 2);
  };

  const openUserProfile = (user: CommunityUser) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const tabs = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell },
    { id: 'recipes', label: 'Receitas', icon: ChefHat },
    { id: 'community', label: 'Comunidade', icon: Users },
    { id: 'health', label: 'Saúde', icon: Heart },
    { id: 'shop', label: 'Loja', icon: ShoppingBag },
  ];

  const quizQuestions = [
    {
      title: "Vamos nos conhecer!",
      subtitle: "Como você gostaria de ser chamado(a)?",
      type: "text",
      field: "name",
      placeholder: "Digite seu nome"
    },
    {
      title: "Qual sua idade?",
      subtitle: "Isso nos ajuda a personalizar seus treinos",
      type: "number",
      field: "age",
      placeholder: "Ex: 28"
    },
    {
      title: "Peso e altura atuais",
      subtitle: "Para calcularmos suas necessidades",
      type: "weight-height",
      fields: ["weight", "height"]
    },
    {
      title: "Qual seu objetivo principal?",
      subtitle: "Vamos focar no que mais importa para você",
      type: "select",
      field: "goal",
      options: [
        { value: "emagrecer", label: "Emagrecer", icon: "🔥" },
        { value: "massa-magra", label: "Ganhar massa magra", icon: "💪" },
        { value: "projeto-verao", label: "Projeto verão", icon: "☀️" },
        { value: "manter-saude", label: "Manter saúde", icon: "❤️" }
      ]
    },
    {
      title: "Quantos dias por semana você pode treinar?",
      subtitle: "Seja realista para mantermos a consistência",
      type: "select",
      field: "trainingFrequency",
      options: [
        { value: 2, label: "2-3 dias", icon: "📅" },
        { value: 4, label: "4-5 dias", icon: "🗓️" },
        { value: 6, label: "6-7 dias", icon: "💯" }
      ]
    },
    {
      title: "Onde você prefere treinar?",
      subtitle: "Vamos adaptar os exercícios ao seu ambiente",
      type: "select",
      field: "trainingLocation",
      options: [
        { value: "academia", label: "Academia", icon: "🏋️" },
        { value: "casa", label: "Em casa", icon: "🏠" },
        { value: "ar-livre", label: "Ao ar livre", icon: "🌳" }
      ]
    },
    {
      title: "Qual seu nível de experiência?",
      subtitle: "Para ajustarmos a intensidade dos treinos",
      type: "select",
      field: "experienceLevel",
      options: [
        { value: "iniciante", label: "Iniciante", icon: "🌱" },
        { value: "intermediario", label: "Intermediário", icon: "⚡" },
        { value: "avancado", label: "Avançado", icon: "🔥" }
      ]
    },
    {
      title: "Tem alguma restrição alimentar?",
      subtitle: "Vamos personalizar suas receitas",
      type: "multi-select",
      field: "dietaryRestrictions",
      options: [
        { value: "lactose", label: "Intolerante à lactose" },
        { value: "gluten", label: "Intolerante ao glúten" },
        { value: "vegetariano", label: "Vegetariano" },
        { value: "vegano", label: "Vegano" },
        { value: "nenhuma", label: "Nenhuma restrição" }
      ]
    },
    {
      title: "Qual seu estilo de treino preferido?",
      subtitle: "Para criarmos a rotina perfeita para você",
      type: "select",
      field: "trainingPreference",
      options: [
        { value: "curto-intenso", label: "Curto e intenso", icon: "⚡" },
        { value: "longo-leve", label: "Longo e moderado", icon: "🎯" }
      ]
    }
  ];

  const handleQuizNext = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const completedProfile = { ...userProfile, isCompleted: true };
      setUserProfile(completedProfile);
      if (isClient) {
        localStorage.setItem('proshape-profile', JSON.stringify(completedProfile));
      }
      setShowQuiz(false);
      generatePersonalizedRecipes(completedProfile);
      setUserPoints(prev => prev + 200);
    }
  };

  const handleQuizBack = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    }
  };

  const updateProfile = (field: string, value: any) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleAssistant = () => {
    setShowAssistant(!showAssistant);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  // Renderizar Quiz
  const renderQuiz = () => {
    const currentQuestion = quizQuestions[quizStep];
    
    return (
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Pergunta {quizStep + 1} de {quizQuestions.length}</span>
              <span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{currentQuestion.title}</h2>
          <p className="text-slate-400 mb-6">{currentQuestion.subtitle}</p>

          <div className="mb-6">
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                placeholder={currentQuestion.placeholder}
                value={userProfile[currentQuestion.field as keyof UserProfile] as string}
                onChange={(e) => updateProfile(currentQuestion.field, e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
              />
            )}

            {currentQuestion.type === 'number' && (
              <input
                type="number"
                placeholder={currentQuestion.placeholder}
                value={userProfile[currentQuestion.field as keyof UserProfile] as number || ''}
                onChange={(e) => updateProfile(currentQuestion.field, parseInt(e.target.value) || 0)}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
              />
            )}

            {currentQuestion.type === 'weight-height' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    placeholder="Ex: 70"
                    value={userProfile.weight || ''}
                    onChange={(e) => updateProfile('weight', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 165"
                    value={userProfile.height || ''}
                    onChange={(e) => updateProfile('height', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {currentQuestion.type === 'select' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateProfile(currentQuestion.field, option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      userProfile[currentQuestion.field as keyof UserProfile] === option.value
                        ? 'border-teal-400 bg-teal-400/10 text-white'
                        : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {option.icon && <span className="text-2xl">{option.icon}</span>}
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multi-select' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => {
                  const isSelected = userProfile.dietaryRestrictions.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = userProfile.dietaryRestrictions;
                        if (option.value === 'nenhuma') {
                          updateProfile('dietaryRestrictions', ['nenhuma']);
                        } else {
                          const filtered = current.filter(r => r !== 'nenhuma');
                          if (isSelected) {
                            updateProfile('dietaryRestrictions', filtered.filter(r => r !== option.value));
                          } else {
                            updateProfile('dietaryRestrictions', [...filtered, option.value]);
                          }
                        }
                      }}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-teal-400 bg-teal-400/10 text-white'
                          : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {isSelected && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleQuizBack}
              disabled={quizStep === 0}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            <button
              onClick={handleQuizNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-500 transition-all"
            >
              <span>{quizStep === quizQuestions.length - 1 ? 'Finalizar' : 'Próximo'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Banner Promocional Pro Shape
  const renderProShapeBanner = () => (
    <div className="bg-gradient-to-r from-[#E63E84] to-[#F5C542] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46b8836b-d8ef-48ff-99b1-8068e26be8d5.png" 
              alt="Pro Shape Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Pro Shape</h2>
            <p className="text-white/90 text-sm">by Olyna Suplementos</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3">
          Acelere seu emagrecimento com saúde e energia! 🔥
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#F5C542]" />
              <span className="text-sm">Auxilia no emagrecimento saudável</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-[#F5C542]" />
              <span className="text-sm">Potencializa a queima de gordura</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-[#F5C542]" />
              <span className="text-sm">Reduz inchaço e retenção de líquidos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-[#F5C542]" />
              <span className="text-sm">Garante mais energia e disposição</span>
            </div>
          </div>
        </div>

        <p className="text-white/90 mb-6">
          Reduza inchaço, queime gordura e conquiste o corpo dos seus sonhos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="https://produto.mercadolivre.com.br/MLB-4222092901-pro-shape-100-natural-termogenico-olyna-suplementos-_JM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-[#E63E84] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Reabasteça seu Pro Shape agora!</span>
          </a>
          
          <button className="bg-[#F5C542] text-[#E63E84] px-6 py-3 rounded-xl font-bold hover:bg-[#F5C542]/90 transition-all flex items-center justify-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Ver Promoções</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-xs text-white/80 text-center">
            ⭐ Produto 100% natural • Aprovado pela ANVISA • Frete grátis para todo Brasil
          </p>
        </div>
      </div>
    </div>
  );

  // Renderizar Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Banner Promocional Pro Shape */}
      {renderProShapeBanner()}

      <div className="bg-gradient-to-r from-cyan-500 to-teal-400 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Olá, {currentUser?.name || userProfile.name || 'Usuário'}! 👋
        </h1>
        <p className="text-cyan-100">
          {userProfile.goal ? `Foco no seu objetivo: ${userProfile.goal.replace('-', ' ')}` : 'Pronta para mais um dia de conquistas?'}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">{userPoints} pontos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Nível {userLevel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-green-300" />
            <span className="font-semibold">Premium</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowProfile(true)}
          className="bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-teal-500/50 transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Meu Perfil</h3>
              <p className="text-slate-400 text-sm">Configurações personalizadas</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowEvolution(true)}
          className="bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-teal-500/50 transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Minha Evolução</h3>
              <p className="text-slate-400 text-sm">Acompanhe seu progresso</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowWorkoutPlan(true)}
          className="bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-teal-500/50 transition-all text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-400 rounded-full flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Plano Semanal</h3>
              <p className="text-slate-400 text-sm">Treinos por grupo muscular</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setShowSpotify(true)}
          className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 rounded-2xl p-4 text-left hover:from-green-500/30 hover:to-green-400/30 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Spotify Pro Shape</h3>
              <p className="text-green-400 text-sm">
                {isSpotifyConnected ? 'Conectado • Playlists disponíveis' : 'Conecte para ouvir música durante treinos'}
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowNotifications(true)}
          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-4 text-left hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Notificações Inteligentes</h3>
              <p className="text-blue-400 text-sm">
                Suplemento: {notificationSettings.supplement.morningTime} e {notificationSettings.supplement.lunchTime} • 
                Água: a cada {notificationSettings.water.frequency}h
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-teal-400" />
          Treino de Hoje
        </h2>
        {userProfile.isCompleted ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {getWeeklyPlan(userProfile)[['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()] as keyof WeeklyPlan]}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {userProfile.trainingLocation === 'casa' ? 'Em casa' : userProfile.trainingLocation === 'academia' ? 'Academia' : 'Ao ar livre'} • 
                    {userProfile.trainingPreference === 'curto-intenso' ? ' 30min' : ' 45min'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const today = new Date().getDay();
                  const planKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
                  const todayPlan = getWeeklyPlan(userProfile)[planKeys[today]];
                  if (todayPlan !== 'Descanso') {
                    startWorkoutByMuscleGroup(todayPlan);
                  }
                }}
                className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-500 transition-all"
              >
                Iniciar Treino
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4">Complete seu perfil para ver o treino personalizado de hoje</p>
            <button 
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-medium"
            >
              Completar Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Renderizar conteúdo baseado na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'workouts':
        return (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Treinos Personalizados</h2>
            <p className="text-slate-400">Funcionalidade implementada - acesse via dashboard</p>
          </div>
        );
      case 'recipes':
        return (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Receitas Personalizadas</h2>
            <p className="text-slate-400">Funcionalidade implementada - acesse via dashboard</p>
          </div>
        );
      case 'community':
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Comunidade Pro Shape</h2>
            <p className="text-slate-400">Conecte-se com outros usuários</p>
          </div>
        );
      case 'health':
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Saúde & Bem-estar</h2>
            <p className="text-slate-400">Acompanhe sua evolução e saúde</p>
          </div>
        );
      case 'shop':
        return (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Loja Olyna</h2>
            <p className="text-slate-400 mb-6">Produtos Pro Shape e suplementos</p>
            <a 
              href="https://produto.mercadolivre.com.br/MLB-4222092901-pro-shape-100-natural-termogenico-olyna-suplementos-_JM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-500 transition-all"
            >
              <span>Comprar Pro Shape</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );
      default: return renderDashboard();
    }
  };

  // Não renderizar até que seja cliente (evita problemas de hidratação)
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46b8836b-d8ef-48ff-99b1-8068e26be8d5.png" 
              alt="Pro Shape Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-white">Carregando Pro Shape...</p>
        </div>
      </div>
    );
  }

  // Mostrar tela de autenticação se não estiver logado
  if (!isAuthenticated || showAuth) {
    return renderAuth();
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46b8836b-d8ef-48ff-99b1-8068e26be8d5.png" 
                  alt="Pro Shape Logo" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Pro Shape</h1>
                <p className="text-xs text-slate-400">by Olyna Suplementos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowProfile(true)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Meu Perfil"
              >
                <User className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => setShowNotifications(true)}
                className="text-slate-400 hover:text-white transition-colors relative"
                title="Configurar Notificações"
              >
                <Bell className="w-6 h-6" />
                {(notificationSettings.supplement.enabled || notificationSettings.water.enabled) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => setShowSpotify(true)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Spotify Pro Shape"
              >
                <Music className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  title="Sair"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-slate-800 rounded-2xl p-4 border border-slate-700 sticky top-24">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center justify-around py-2">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-teal-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showQuiz && renderQuiz()}
      {showProfile && renderProfileScreen()}
      {showEvolution && renderEvolutionScreen()}
      {showSpotify && renderSpotifyScreen()}
      {showWorkoutPlan && renderWorkoutPlan()}
      {showWorkoutSession && renderWorkoutSession()}
      
      {/* Assistente Inteligente */}
      <div className="fixed bottom-20 right-4 lg:bottom-4 lg:right-4 z-40">
        {showAssistant && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 w-80 mb-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Assistente Pro Shape</h3>
              <button
                onClick={toggleAssistant}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="bg-slate-700 rounded-lg p-3">
                <p className="text-white text-sm">
                  Olá {currentUser?.name || userProfile.name || 'usuário'}! Como posso ajudar você hoje?
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setShowWorkoutPlan(true)}
                  className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm border border-teal-500/30 hover:bg-teal-500/30 transition-all"
                >
                  Ver plano semanal
                </button>
                <button className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
                  Receita rápida
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleListening}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg font-medium transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-600 hover:to-cyan-500'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isListening ? 'Parar' : 'Falar'}</span>
              </button>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleAssistant}
          className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white p-4 rounded-full shadow-2xl hover:from-teal-600 hover:to-cyan-500 transition-all hover:scale-110"
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}