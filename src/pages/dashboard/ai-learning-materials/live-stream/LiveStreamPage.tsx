import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Video, 
  Users, 
  MessageSquare, 
  Send, 
  Settings, 
  VolumeX,
  Volume2,
  Maximize,
  Share2,
  ThumbsUp,
  RadioIcon as Radio,
  Clock,
  User,
  Shield,
  Bot,
  MessageCircle,
  Eye,
  FileQuestion,
  Code,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Hand,
  Smile,
  Copy,
  Check,
  Presentation,
  Palette,
  Minus,
  RotateCcw,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { cn } from "@/lib/utils";

interface LiveStreamData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  currentViewers: number;
  totalViews: number;
  duration: string;
  status: 'live' | 'ended' | 'scheduled';
  streamUrl: string;
  startTime: string;
  category: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'message' | 'question' | 'system' | 'ai-response';
  avatar?: string;
  isAI?: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

interface EmojiReaction {
  id: string;
  emoji: string;
  label: string;
}

interface BoardContent {
  id: string;
  type: 'concept' | 'diagram' | 'code' | 'formula';
  title: string;
  content: string;
  timestamp: string;
  teacherText: string;
}

const mockStreamData: LiveStreamData = {
  id: "6",
  title: "ورشة تطوير التطبيقات الحديثة",
  description: "ورشة عمل تفاعلية مباشرة حول تطوير التطبيقات الحديثة باستخدام React وNode.js مع التركيز على أفضل الممارسات والأدوات الحديثة",
  instructor: "د. أحمد محمد",
  instructorAvatar: "/avatars/instructor.jpg",
  currentViewers: 45,
  totalViews: 156,
  duration: "1:23:45",
  status: 'live',
  streamUrl: "https://example.com/stream",
  startTime: "2024-01-30 15:00",
  category: "البرمجة",
  tags: ["React", "Node.js", "JavaScript", "التطوير"],
  likes: 28,
  isLiked: false
};

const mockCommunityMessages: ChatMessage[] = [
  {
    id: "1",
    username: "سارة أحمد",
    message: "شرح ممتاز! هل يمكن شرح الـ hooks أكثر؟",
    timestamp: "15:32",
    type: 'question'
  },
  {
    id: "2", 
    username: "محمد علي",
    message: "شكراً للمعلومات المفيدة",
    timestamp: "15:30",
    type: 'message'
  },
  {
    id: "3",
    username: "النظام",
    message: "انضم 3 مشاركين جدد للبث",
    timestamp: "15:28",
    type: 'system'
  },
  {
    id: "4",
    username: "د. أحمد محمد",
    message: "سنقوم بشرح الـ hooks في الجزء القادم",
    timestamp: "15:33",
    type: 'message'
  }
];

const mockAIMessages: ChatMessage[] = [
  {
    id: "ai1",
    username: "مساعد البرمجة الذكي",
    message: "مرحباً! أنا هنا لمساعدتك في فهم المفاهيم البرمجية. ما الذي تود معرفته؟",
    timestamp: "15:25",
    type: 'ai-response',
    isAI: true
  },
  {
    id: "ai2",
    username: "أنت",
    message: "ما هي الـ hooks في React؟",
    timestamp: "15:31",
    type: 'message'
  },
  {
    id: "ai3",
    username: "مساعد البرمجة الذكي",
    message: "الـ hooks هي وظائف خاصة في React تسمح لك باستخدام ميزات React مثل الـ state والـ lifecycle methods في المكونات الوظيفية. أشهرها useState و useEffect.",
    timestamp: "15:31",
    type: 'ai-response',
    isAI: true
  }
];

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "ما هو الغرض الرئيسي من useState hook في React؟",
    options: [
      "لإدارة حالة المكون (Component State)",
      "لتنفيذ عمليات جانبية (Side Effects)",
      "لربط المراجع بعناصر DOM",
      "لتحسين الأداء (Performance Optimization)"
    ],
    correctAnswer: 0,
    explanation: "useState هو hook يُستخدم لإضافة حالة محلية (local state) للمكونات الوظيفية في React."
  },
  {
    id: "q2", 
    question: "متى يتم تنفيذ useEffect hook؟",
    options: [
      "قبل عرض المكون فقط",
      "بعد كل عملية عرض (render)",
      "عند تغيير الـ props فقط",
      "عند إنشاء المكون فقط"
    ],
    correctAnswer: 1,
    explanation: "useEffect يتم تنفيذه بعد كل عملية عرض (render) بشكل افتراضي، ويمكن التحكم بذلك باستخدام dependency array."
  },
  {
    id: "q3",
    question: "ما هي الطريقة الصحيحة لتحديث الحالة في useState؟",
    options: [
      "تعديل القيمة مباشرة: state = newValue",
      "استخدام setState function: setState(newValue)",
      "استخدام this.setState(): this.setState({newValue})",
      "تحديث الحالة تلقائياً"
    ],
    correctAnswer: 1,
    explanation: "في useState، نستخدم الدالة التي يتم إرجاعها (setState function) لتحديث الحالة بطريقة آمنة."
  },
  {
    id: "q4",
    question: "ما فائدة dependency array في useEffect؟",
    options: [
      "لا توجد فائدة محددة",
      "لتحديد متى يجب تنفيذ useEffect",
      "لتمرير البيانات للمكون",
      "لتحسين سرعة التطبيق فقط"
    ],
    correctAnswer: 1,
    explanation: "dependency array يحدد متى يجب إعادة تنفيذ useEffect. إذا كان فارغاً، ينفذ مرة واحدة فقط."
  }
];

const mockCodingChallenge: CodingChallenge = {
  id: "coding1",
  title: "إنشاء Counter Component باستخدام useState",
  description: "أنشئ مكون React يحتوي على عداد يمكن زيادته ونقصانه باستخدام useState hook.",
  initialCode: `import React, { useState } from 'react';

function Counter() {
  // أضف useState hook هنا
  
  return (
    <div>
      <h2>العداد: {/* اعرض قيمة العداد هنا */}</h2>
      <button onClick={/* دالة الزيادة */}>+</button>
      <button onClick={/* دالة النقصان */}>-</button>
    </div>
  );
}

export default Counter;`,
  expectedOutput: "مكون يعرض عداد مع أزرار للزيادة والنقصان",
  testCases: [
    {
      input: "النقر على زر + مرتين",
      expectedOutput: "العداد: 2"
    },
    {
      input: "النقر على زر - مرة واحدة",
      expectedOutput: "العداد: -1"
    }
  ]
};

const emojiReactions: EmojiReaction[] = [
  { id: "like", emoji: "👍", label: "إعجاب" },
  { id: "love", emoji: "❤️", label: "حب" },
  { id: "laugh", emoji: "😂", label: "ضحك" },
  { id: "wow", emoji: "😮", label: "إعجاب" },
  { id: "clap", emoji: "👏", label: "تصفيق" },
  { id: "think", emoji: "🤔", label: "تفكير" },
  { id: "fire", emoji: "🔥", label: "رائع" },
  { id: "party", emoji: "🎉", label: "احتفال" }
];

const mockBoardContent: BoardContent[] = [
  {
    id: "1",
    type: "concept",
    title: "React Hooks",
    content: "دوال بسيطة تدير الحالة والأحداث",
    timestamp: "12:35",
    teacherText: "دعونا نتحدث عن React Hooks"
  },
  {
    id: "2", 
    type: "code",
    title: "useState",
    content: "const [count, setCount] = useState(0)",
    timestamp: "12:37",
    teacherText: "useState للحفظ والتحديث"
  },
  {
    id: "3",
    type: "diagram", 
    title: "useEffect",
    content: "Component: Mount → Update → Unmount",
    timestamp: "12:40",
    teacherText: "useEffect لإدارة دورة الحياة"
  },
  {
    id: "4",
    type: "formula",
    title: "قواعد مهمة",
    content: "استخدم Hooks في أعلى المكون فقط!",
    timestamp: "12:42", 
    teacherText: "قواعد استخدام الـ hooks"
  }
];

export default function LiveStreamPage() {
  const { id: _streamId } = useParams(); // ID للبث المحدد - سيُستخدم لاحقاً
  const [streamData, setStreamData] = useState<LiveStreamData>(mockStreamData);
  const [communityMessages, setCommunityMessages] = useState<ChatMessage[]>(mockCommunityMessages);
  const [aiMessages, setAIMessages] = useState<ChatMessage[]>(mockAIMessages);
  const [newCommunityMessage, setNewCommunityMessage] = useState("");
  const [newAIMessage, setNewAIMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState("community");
  
  // Quiz states
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCodingOpen, setIsCodingOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [codingAnswer, setCodingAnswer] = useState(mockCodingChallenge.initialCode);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  
  // Video control states
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Interactive board states
  const [isInteractiveBoardOpen, setIsInteractiveBoardOpen] = useState(false);
  const [boardContent, setBoardContent] = useState<BoardContent[]>(mockBoardContent);
  const [currentTeacherText, setCurrentTeacherText] = useState("مرحباً بكم في ورشة تطوير التطبيقات الحديثة");
  const [isProcessingTeacherSpeech, setIsProcessingTeacherSpeech] = useState(false);
  
  // Interactive drawing states
  const [selectedTool, setSelectedTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#ffffff');
  const [penSize, setPenSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  const sendCommunityMessage = () => {
    if (newCommunityMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "أنت",
        message: newCommunityMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ar', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'message'
      };
      setCommunityMessages(prev => [message, ...prev]);
      setNewCommunityMessage("");
    }
  };

  const sendAIMessage = async () => {
    if (newAIMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        username: "أنت",
        message: newAIMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ar', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'message'
      };
      
      setAIMessages(prev => [userMessage, ...prev]);
      setNewAIMessage("");

      // محاكاة رد الـ AI
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          username: "مساعد البرمجة الذكي",
          message: "شكراً لسؤالك! هذا سؤال ممتاز. دعني أوضح لك هذا المفهوم بطريقة بسيطة...",
          timestamp: new Date().toLocaleTimeString('ar', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'ai-response',
          isAI: true
        };
        setAIMessages(prev => [aiResponse, ...prev]);
      }, 1500);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setStreamData(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !isLiked
    }));
  };

  // Quiz functions
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < mockQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsQuizOpen(false);
  };

  const runCode = async () => {
    setIsCodeRunning(true);
    // محاكاة تنفيذ الكود
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCodeRunning(false);
    // إضافة رسالة للمجتمع حول تنفيذ الكود
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: "قمت بتنفيذ التحدي البرمجي! 🎉",
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'message'
    };
    setCommunityMessages(prev => [message, ...prev]);
  };

  const getQuizScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === mockQuizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  // Video control functions
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // إضافة رسالة للمجتمع
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: isMicOn ? "تم إغلاق المايك 🔇" : "تم تشغيل المايك 🎤",
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'system'
    };
    setCommunityMessages(prev => [message, ...prev]);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: isCameraOn ? "تم إغلاق الكاميرا 📹" : "تم تشغيل الكاميرا 📷",
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'system'
    };
    setCommunityMessages(prev => [message, ...prev]);
  };

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised);
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: isHandRaised ? "تم إنزال اليد" : "تم رفع اليد ✋",
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'system'
    };
    setCommunityMessages(prev => [message, ...prev]);
  };

  const sendEmojiReaction = (emoji: EmojiReaction) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: `${emoji.emoji} ${emoji.label}`,
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'message'
    };
    setCommunityMessages(prev => [message, ...prev]);
    setShowEmojiPicker(false);
  };

  const shareStreamLink = async () => {
    const streamUrl = `${window.location.origin}/dashboard/ai-learning-materials/live-stream/${streamData.id}`;
    
    try {
      await navigator.clipboard.writeText(streamUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const toggleInteractiveBoard = () => {
    setIsInteractiveBoardOpen(!isInteractiveBoardOpen);
    
    if (!isInteractiveBoardOpen) {
      // محاكاة بدء معالجة كلام المدرس
      setIsProcessingTeacherSpeech(true);
      
      // إضافة رسالة للدردشة
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "النظام",
        message: "📝 تم تفعيل السبورة البسيطة - ملخصات سريعة للدرس",
        timestamp: new Date().toLocaleTimeString('ar', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'system'
      };
      setCommunityMessages(prev => [message, ...prev]);

      // محاكاة معالجة الكلام وإضافة محتوى جديد
      setTimeout(() => {
        setIsProcessingTeacherSpeech(false);
        setCurrentTeacherText("الآن سنتعلم كيفية استخدام useCallback للتحسين");
        
        const newContent: BoardContent = {
          id: Date.now().toString(),
          type: "concept",
          title: "useCallback",
          content: "يحفظ الدالة في الذاكرة ويمنع إعادة إنشائها",
          timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          teacherText: "useCallback للتحسين"
        };
        
        setBoardContent(prev => [newContent, ...prev]);
      }, 3000);
    } else {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "النظام", 
        message: "📺 تم إغلاق السبورة - العودة لعرض البث الكامل",
        timestamp: new Date().toLocaleTimeString('ar', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'system'
      };
      setCommunityMessages(prev => [message, ...prev]);
    }
  };

  const clearWhiteboard = () => {
    const canvas = document.getElementById('interactive-whiteboard-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      
      if (selectedTool === 'pen') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = penColor;
      } else {
        ctx.globalCompositeOperation = 'destination-out';
      }
      
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardPageHeader
        icon={Video}
        title={streamData.title}
        actions={
          <div className="flex items-center gap-3">
            <Badge className="bg-red-100 text-red-700 animate-pulse font-noto">
              <Radio className="w-4 h-4 mr-1" />
              مباشر الآن
            </Badge>
            <Badge variant="outline" className="font-noto">
              <Users className="w-3 h-3 mr-1" />
              {streamData.currentViewers} مشاهد
            </Badge>
            <Badge variant="outline" className="font-noto">
              <Eye className="w-3 h-3 mr-1" />
              {streamData.totalViews} مشاهدة
            </Badge>
            
            {/* Interactive Quizzes Buttons */}
            <div className="flex items-center gap-2 mr-2 pl-2 border-r border-gray-200">
              {/* Regular Quiz Modal */}
              <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 font-noto">
                    <FileQuestion className="w-4 h-4 mr-2" />
                    اختبار سريع
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-noto">اختبار: مفاهيم React الأساسية</DialogTitle>
                  </DialogHeader>
                  
                  {!showResults ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-noto">
                          السؤال {currentQuestionIndex + 1} من {mockQuizQuestions.length}
                        </Badge>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${((currentQuestionIndex + 1) / mockQuizQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium font-noto">
                          {mockQuizQuestions[currentQuestionIndex].question}
                        </h3>
                        
                        <div className="space-y-2">
                          {mockQuizQuestions[currentQuestionIndex].options.map((option, optionIndex) => (
                            <label 
                              key={optionIndex}
                              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                checked={selectedAnswers[currentQuestionIndex] === optionIndex}
                                onChange={() => handleAnswerSelect(currentQuestionIndex, optionIndex)}
                                className="text-green-600"
                              />
                              <span className="font-noto">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          onClick={nextQuestion}
                          disabled={selectedAnswers[currentQuestionIndex] === undefined}
                          className="font-noto"
                        >
                          {currentQuestionIndex === mockQuizQuestions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-noto">
                          تم إنهاء الاختبار!
                        </h3>
                        <p className="text-gray-600 font-noto">
                          درجتك: {getQuizScore()} من {mockQuizQuestions.length}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {mockQuizQuestions.map((question, index) => (
                          <div key={question.id} className="text-left p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-start gap-2 mb-2">
                              {selectedAnswers[index] === question.correctAnswer ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium font-noto">{question.question}</p>
                                <p className="text-sm text-gray-600 mt-1 font-noto">
                                  إجابتك: {question.options[selectedAnswers[index]]}
                                </p>
                                {selectedAnswers[index] !== question.correctAnswer && (
                                  <p className="text-sm text-green-600 mt-1 font-noto">
                                    الإجابة الصحيحة: {question.options[question.correctAnswer]}
                                  </p>
                                )}
                                {question.explanation && (
                                  <p className="text-xs text-blue-600 mt-2 font-noto">
                                    💡 {question.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button onClick={resetQuiz} className="font-noto">
                        إغلاق
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Coding Challenge Modal */}
              <Dialog open={isCodingOpen} onOpenChange={setIsCodingOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="font-noto">
                    <Code className="w-4 h-4 mr-2" />
                    تحدي برمجي
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-noto">{mockCodingChallenge.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2 font-noto">وصف التحدي:</h4>
                      <p className="text-blue-800 font-noto">{mockCodingChallenge.description}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-gray-900 font-noto">الكود:</label>
                      <Textarea
                        value={codingAnswer}
                        onChange={(e) => setCodingAnswer(e.target.value)}
                        rows={15}
                        className="font-mono text-sm"
                        dir="ltr"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 font-noto">المخرجات المتوقعة:</h4>
                        <p className="text-sm text-gray-700 font-noto">{mockCodingChallenge.expectedOutput}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 font-noto">حالات الاختبار:</h4>
                        <div className="space-y-2">
                          {mockCodingChallenge.testCases.map((testCase, index) => (
                            <div key={index} className="text-sm">
                              <p className="text-gray-600 font-noto">المدخل: {testCase.input}</p>
                              <p className="text-gray-700 font-noto">النتيجة: {testCase.expectedOutput}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={runCode}
                        disabled={isCodeRunning}
                        className="bg-green-600 hover:bg-green-700 font-noto"
                      >
                        {isCodeRunning ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            جاري التنفيذ...
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            تنفيذ الكود
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setCodingAnswer(mockCodingChallenge.initialCode)}
                        className="font-noto"
                      >
                        إعادة تعيين
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCodingOpen(false)}
                        className="font-noto"
                      >
                        إغلاق
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {/* Video Container */}
              <div className={`relative bg-black rounded-t-lg ${isInteractiveBoardOpen ? 'aspect-[2/1]' : 'aspect-video'}`}>
                {isInteractiveBoardOpen ? (
                  // Split Screen Mode: Video + Interactive Board
                  <div className="flex h-full">
                    {/* Teacher Video (Left Half) */}
                    <div className="w-1/2 flex items-center justify-center border-r border-gray-700">
                      <div className="text-center text-white">
                        <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-md font-noto">المدرس</p>
                        <p className="text-xs opacity-75 font-noto">HD 1080p</p>
                      </div>
                    </div>
                    
                                            {/* Interactive Board (Right Half) - Interactive Drawing */}
                    <div className="w-1/2 bg-green-800 p-4 overflow-y-auto relative" 
                         style={{
                           backgroundImage: `
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                           `,
                           backgroundSize: '25px 25px'
                         }}>

                      {/* Board Header */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
                        <div className="flex items-center gap-3">
                          <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2">
                            <h3 className="text-white font-noto text-lg">السبورة التفاعلية</h3>
                          </div>
                        </div>
                        <Button
                          onClick={toggleInteractiveBoard}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          إغلاق
                        </Button>
                      </div>

                      {/* Drawing Tools */}
                      <div className="absolute top-20 left-4 bg-black bg-opacity-70 rounded-lg p-3 space-y-3 z-20">
                        {/* Tool Selection */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => setSelectedTool('pen')}
                            className={`w-full justify-start text-xs ${selectedTool === 'pen' ? 'bg-blue-600' : 'bg-gray-600'}`}
                            size="sm"
                          >
                            <Presentation className="w-3 h-3 mr-2" />
                            قلم
                          </Button>
                          <Button
                            onClick={() => setSelectedTool('eraser')}
                            className={`w-full justify-start text-xs ${selectedTool === 'eraser' ? 'bg-blue-600' : 'bg-gray-600'}`}
                            size="sm"
                          >
                            <Minus className="w-3 h-3 mr-2" />
                            ممحاة
                          </Button>
                        </div>

                        <div className="border-t border-gray-600 pt-3">
                          {/* Pen Color */}
                          <div className="space-y-2">
                            <span className="text-white text-xs font-noto">لون القلم:</span>
                            <div className="grid grid-cols-3 gap-1">
                              {['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'].map(color => (
                                <button
                                  key={color}
                                  onClick={() => setPenColor(color)}
                                  className={`w-4 h-4 rounded border ${penColor === color ? 'border-white border-2' : 'border-gray-400'}`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            
                            {/* Custom Color */}
                            <div className="flex items-center gap-2">
                              <Palette className="w-3 h-3 text-white" />
                              <input
                                type="color"
                                value={penColor}
                                onChange={(e) => setPenColor(e.target.value)}
                                className="w-6 h-4 rounded border-none cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Pen Size */}
                          <div className="space-y-2 mt-3">
                            <span className="text-white text-xs font-noto">حجم القلم:</span>
                            <input
                              type="range"
                              min="1"
                              max="15"
                              value={penSize}
                              onChange={(e) => setPenSize(parseInt(e.target.value))}
                              className="w-full"
                            />
                            <div className="text-center">
                              <span className="text-white text-xs">{penSize}px</span>
                            </div>
                          </div>

                          {/* Clear Board */}
                          <Button
                            onClick={clearWhiteboard}
                            className="w-full bg-red-600 hover:bg-red-700 mt-3 text-xs"
                            size="sm"
                          >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            مسح الكل
                          </Button>
                        </div>
                      </div>

                      {/* Interactive Drawing Canvas */}
                      <canvas
                        id="interactive-whiteboard-canvas"
                        width={400}
                        height={500}
                        className="absolute cursor-crosshair z-10"
                        style={{ 
                          top: '80px',
                          left: '180px',
                          right: '16px',
                          bottom: '16px',
                          width: 'calc(100% - 196px)',
                          height: 'calc(100% - 96px)'
                        }}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                      />
                      
                      <div className="h-full relative z-5">
                        {/* Current Topic - Chalk Box */}
                        
                        {/* Current Topic - Chalk Box */}
                        <div className="mb-8 relative">
                          <div className="border-2 border-dashed border-white/50 rounded-lg p-4 bg-green-700/30">
                            <div className="text-center">
                              <div className="text-yellow-300 text-2xl mb-2">📌</div>
                              <h4 className="text-white font-bold mb-2" 
                                  style={{
                                    fontFamily: 'cursive', 
                                    fontSize: '18px',
                                    transform: 'rotate(-0.5deg)'
                                  }}>
                                الموضوع الآن:
                              </h4>
                              <p className="text-yellow-100 leading-relaxed" 
                                 style={{
                                   fontFamily: 'cursive',
                                   fontSize: '16px',
                                   transform: 'rotate(0.3deg)'
                                 }}>
                                "{currentTeacherText}"
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Handwritten Notes */}
                        <div className="space-y-6">
                          {boardContent.map((content, index) => (
                            <div key={content.id} 
                                 className="relative"
                                 style={{
                                   transform: `rotate(${(index % 2 === 0 ? 0.5 : -0.5)}deg)`,
                                   marginLeft: `${index % 3 * 10}px`
                                 }}>
                              
                              {/* Note Background */}
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                
                                {/* Title with Icon */}
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-2xl">
                                    {content.type === 'concept' && '💡'}
                                    {content.type === 'code' && '💻'}
                                    {content.type === 'diagram' && '📊'}
                                    {content.type === 'formula' && '📐'}
                                  </span>
                                  <div>
                                    <h6 className="text-white font-bold text-lg" 
                                        style={{
                                          fontFamily: 'cursive',
                                          textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                                        }}>
                                      {content.title}
                                    </h6>
                                    <span className="text-yellow-200 text-xs opacity-75" 
                                          style={{fontFamily: 'monospace'}}>
                                      ⏰ {content.timestamp}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Content */}
                                <div className="text-white/90 leading-relaxed relative">
                                  <p style={{
                                    fontFamily: 'cursive',
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                  }}>
                                    {content.content}
                                  </p>
                                  
                                  {/* Underline Effect */}
                                  <div className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-yellow-300/60 transform skew-x-12"></div>
                                </div>
                              </div>
                              
                              {/* Chalk Smudge */}
                              <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                            </div>
                          ))}
                          
                          {/* Empty State - Clean Board */}
                          {boardContent.length === 0 && (
                            <div className="text-center py-12">
                              <div className="text-6xl mb-4 opacity-30">📋</div>
                              <p className="text-white/60 text-lg" style={{fontFamily: 'cursive'}}>
                                السبورة نظيفة... 
                              </p>
                              <p className="text-white/40 text-sm mt-2" style={{fontFamily: 'cursive'}}>
                                في انتظار الشرح ✏️
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Eraser in Corner */}
                        <div className="absolute bottom-4 right-4 opacity-40">
                          <div className="w-8 h-4 bg-pink-200 rounded-sm transform rotate-12 shadow-lg"></div>
                        </div>
                        
                        {/* Chalk Pieces */}
                        <div className="absolute bottom-6 left-6 opacity-30">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-white rounded-full"></div>
                            <div className="w-1 h-2 bg-yellow-200 rounded-full"></div>
                            <div className="w-1 h-4 bg-blue-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Full Screen Video Mode
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2 font-noto">فيديو البث المباشر</p>
                      <p className="text-sm opacity-75 font-noto">سيتم دمج مشغل فيديو حقيقي هنا</p>
                    </div>
                  </div>
                )}
                
                {/* Stream Info Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className="bg-red-600 text-white animate-pulse">
                    <Radio className="w-3 h-3 mr-1" />
                    مباشر
                  </Badge>
                  <Badge className="bg-black/50 text-white">
                    <Users className="w-3 h-3 mr-1" />
                    {streamData.currentViewers}
                  </Badge>
                </div>

                {/* Board Toggle in Video Area */}
                {!isInteractiveBoardOpen && (
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      onClick={toggleInteractiveBoard}
                      title="فتح السبورة"
                    >
                      <Presentation className="w-4 h-4 mr-1" />
                      سبورة
                    </Button>
                  </div>
                )}

                                  {/* Video Controls */}
                  <div className={`absolute bottom-4 left-4 ${isInteractiveBoardOpen ? 'right-1/2' : 'right-4'} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      {/* Audio Controls */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                        title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      
                      {/* Microphone Control */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-white hover:bg-white/20 ${isMicOn ? 'bg-green-600/50' : ''}`}
                        onClick={toggleMic}
                        title={isMicOn ? "إغلاق المايك" : "تشغيل المايك"}
                      >
                        {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </Button>
                      
                      {/* Camera Control */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-white hover:bg-white/20 ${isCameraOn ? 'bg-green-600/50' : ''}`}
                        onClick={toggleCamera}
                        title={isCameraOn ? "إغلاق الكاميرا" : "تشغيل الكاميرا"}
                      >
                        {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      </Button>
                      
                      {/* Fullscreen */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        title="ملء الشاشة"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Emoji Reactions */}
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          title="إرسال تفاعل"
                        >
                          <Smile className="w-4 h-4" />
                        </Button>
                        
                        {showEmojiPicker && (
                          <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg border p-3 grid grid-cols-4 gap-2 z-50">
                            {emojiReactions.map((reaction) => (
                              <button
                                key={reaction.id}
                                onClick={() => sendEmojiReaction(reaction)}
                                className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
                                title={reaction.label}
                              >
                                {reaction.emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Raise Hand */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-white hover:bg-white/20 ${isHandRaised ? 'bg-yellow-600/50' : ''}`}
                        onClick={toggleHandRaise}
                        title={isHandRaised ? "إنزال اليد" : "رفع اليد"}
                      >
                        <Hand className={`w-4 h-4 ${isHandRaised ? 'animate-bounce' : ''}`} />
                      </Button>
                      
                      {/* Interactive Board */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-white hover:bg-white/20 ${isInteractiveBoardOpen ? 'bg-blue-600/50' : ''}`}
                        onClick={toggleInteractiveBoard}
                        title={isInteractiveBoardOpen ? "إغلاق السبورة البسيطة" : "فتح السبورة البسيطة"}
                      >
                        <Presentation className={`w-4 h-4 ${isInteractiveBoardOpen ? 'text-blue-200' : ''}`} />
                      </Button>
                      
                      {/* Share */}
                      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            title="مشاركة البث"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="font-noto">مشاركة البث المباشر</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2 font-noto">رابط البث:</h4>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={`${window.location.origin}/dashboard/ai-learning-materials/live-stream/${streamData.id}`}
                                  readOnly
                                  className="font-mono text-xs"
                                />
                                <Button
                                  size="sm"
                                  onClick={shareStreamLink}
                                  className="flex-shrink-0"
                                >
                                  {linkCopied ? (
                                    <>
                                      <Check className="w-4 h-4 mr-1" />
                                      تم النسخ
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4 mr-1" />
                                      نسخ
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-sm text-gray-600 font-noto">
                                شارك هذا الرابط مع الأصدقاء للانضمام للبث المباشر
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {/* Settings */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        title="الإعدادات"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
              </div>

              {/* Stream Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600 font-noto">
                    {streamData.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1 font-noto">
                      <Clock className="w-4 h-4" />
                      {streamData.duration}
                    </span>
                    <Badge variant="outline" className="font-noto">
                      {streamData.category}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {streamData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-noto">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Instructor & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 font-noto">{streamData.instructor}</h4>
                        <p className="text-sm text-gray-500 font-noto">المحاضر</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleLike}
                        className={cn(
                          "font-noto",
                          isLiked && "bg-red-50 text-red-600 border-red-200"
                        )}
                      >
                        <ThumbsUp className={cn("w-4 h-4 mr-1", isLiked && "fill-current")} />
                        {streamData.likes}
                      </Button>
                      <Button size="sm" variant="outline" className="font-noto">
                        <Share2 className="w-4 h-4 mr-1" />
                        مشاركة
                      </Button>
                    </div>
                  </div>


                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-noto">
                <MessageSquare className="w-5 h-5" />
                التفاعل المباشر
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <Tabs value={activeChatTab} onValueChange={setActiveChatTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mx-4 mb-2">
                  <TabsTrigger value="community" className="flex items-center gap-2 font-noto">
                    <MessageCircle className="w-4 h-4" />
                    المجتمع
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-2 font-noto">
                    <Bot className="w-4 h-4" />
                    الذكاء الاصطناعي
                  </TabsTrigger>
                </TabsList>

                {/* Community Chat */}
                <TabsContent value="community" className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto px-4 space-y-3">
                    <div className="text-center py-2">
                      <Badge variant="outline" className="text-xs font-noto">
                        {communityMessages.length} رسالة
                      </Badge>
                    </div>
                    {communityMessages.map((message) => (
                      <div key={message.id} className={cn(
                        "flex gap-2 text-sm",
                        message.type === 'system' && "justify-center"
                      )}>
                        {message.type !== 'system' && (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        <div className={cn(
                          "flex-1",
                          message.type === 'system' && "text-center"
                        )}>
                          <div className={cn(
                            "p-2 rounded-lg",
                            message.type === 'question' && "bg-yellow-50 border border-yellow-200",
                            message.type === 'message' && "bg-gray-50",
                            message.type === 'system' && "bg-blue-50 text-blue-700 inline-block"
                          )}>
                            {message.type !== 'system' && (
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900 font-noto">
                                  {message.username}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {message.timestamp}
                                </span>
                              </div>
                            )}
                            <p className={cn(
                              "font-noto",
                              message.type === 'system' ? "text-xs" : "text-sm"
                            )}>
                              {message.message}
                            </p>
                            {message.type === 'question' && (
                              <div className="mt-2">
                                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                  سؤال
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="شارك مع المجتمع..."
                        value={newCommunityMessage}
                        onChange={(e) => setNewCommunityMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendCommunityMessage()}
                        className="font-noto"
                      />
                      <Button 
                        size="sm" 
                        onClick={sendCommunityMessage}
                        disabled={!newCommunityMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Shield className="w-3 h-3" />
                      <span className="font-noto">كن محترماً ومهذباً</span>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Chat */}
                <TabsContent value="ai" className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto px-4 space-y-3">
                    <div className="text-center py-2">
                      <Badge variant="outline" className="text-xs font-noto">
                        <Bot className="w-3 h-3 mr-1" />
                        مساعد ذكي متاح
                      </Badge>
                    </div>
                    {aiMessages.map((message) => (
                      <div key={message.id} className="flex gap-2 text-sm">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          message.isAI ? "bg-blue-100" : "bg-gray-200"
                        )}>
                          {message.isAI ? (
                            <Bot className="w-4 h-4 text-blue-600" />
                          ) : (
                            <User className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "p-3 rounded-lg",
                            message.isAI ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                          )}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={cn(
                                "font-medium font-noto",
                                message.isAI ? "text-blue-900" : "text-gray-900"
                              )}>
                                {message.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {message.timestamp}
                              </span>
                            </div>
                            <p className="text-sm font-noto">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="اسأل الذكاء الاصطناعي..."
                        value={newAIMessage}
                        onChange={(e) => setNewAIMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                        className="font-noto"
                      />
                      <Button 
                        size="sm" 
                        onClick={sendAIMessage}
                        disabled={!newAIMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                      <Bot className="w-3 h-3" />
                      <span className="font-noto">اسأل عن أي موضوع متعلق بالدرس</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}