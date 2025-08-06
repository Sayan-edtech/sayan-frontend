import { useState } from "react";
import { 
  Users, 
  RadioIcon as Radio,
  Camera,
  Mic,
  MicOff,
  CameraOff,
  MessageSquare,
  Send,
  Hand,
  UserCheck,
  Monitor,
  StopCircle,
  Play,
  Share2,
  Settings,
  Presentation,
  Eye,
  Heart,
  FileQuestion,
  Clock,
  BookOpen,
  Code,
  CheckCircle,
  Filter,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Palette,
  Minus,
  RotateCcw,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

interface Student {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  hasMic: boolean;
  hasCamera: boolean;
  handRaised: boolean;
  joinTime: string;
  isMuted: boolean;
  lastEmoji?: string;
  emojiTimestamp?: string;
  quizStatus: 'not-started' | 'in-progress' | 'completed' | 'not-participating';
  isPresenting: boolean;
  lastInteractionTime?: string;
  handRaisedTime?: string;
  quizCompletedTime?: string;
}

interface ChatMessage {
  id: string;
  studentId: string;
  studentName: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system' | 'reaction';
}

interface StreamStats {
  viewers: number;
  likes: number;
  duration: string;
  isLive: boolean;
}

interface QuizDraft {
  id: string;
  title: string;
  questionsCount: number;
  lastModified: string;
  category: string;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  code?: string;
  expectedOutput?: string;
  points: number;
}

interface NewQuiz {
  title: string;
  description: string;
  type: 'multiple-choice' | 'coding';
  timeLimit: number;
  questions: QuizQuestion[];
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "أحمد محمد",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: false,
    hasCamera: true,
    handRaised: true,
    joinTime: "14:30",
    isMuted: false,
    lastEmoji: "👍",
    emojiTimestamp: "14:35",
    quizStatus: 'completed',
    isPresenting: false,
    lastInteractionTime: "14:35",
    handRaisedTime: "14:34",
    quizCompletedTime: "14:32"
  },
  {
    id: "2", 
    name: "فاطمة علي",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: true,
    hasCamera: false,
    handRaised: false,
    joinTime: "14:28",
    isMuted: true,
    lastEmoji: "❤️",
    emojiTimestamp: "14:33",
    quizStatus: 'in-progress',
    isPresenting: false,
    lastInteractionTime: "14:33",
    handRaisedTime: undefined,
    quizCompletedTime: undefined
  },
  {
    id: "3",
    name: "محمد السعيد",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: false,
    hasCamera: true,
    handRaised: false,
    joinTime: "14:25",
    isMuted: false,
    quizStatus: 'not-started',
    isPresenting: false,
    lastInteractionTime: "14:25",
    handRaisedTime: undefined,
    quizCompletedTime: undefined
  },
  {
    id: "4",
    name: "نور الهدى",
    avatar: "/api/placeholder/40/40", 
    isOnline: false,
    hasMic: false,
    hasCamera: false,
    handRaised: false,
    joinTime: "14:20",
    isMuted: false,
    quizStatus: 'not-participating',
    isPresenting: false,
    lastInteractionTime: "14:20",
    handRaisedTime: undefined,
    quizCompletedTime: undefined
  },
  {
    id: "5",
    name: "عبدالله أحمد",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: false,
    hasCamera: false,
    handRaised: true,
    joinTime: "14:32",
    isMuted: true,
    lastEmoji: "🤔",
    emojiTimestamp: "14:36",
    quizStatus: 'in-progress',
    isPresenting: false,
    lastInteractionTime: "14:36",
    handRaisedTime: "14:36",
    quizCompletedTime: undefined
  },
  {
    id: "6",
    name: "سارة أحمد",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: true,
    hasCamera: true,
    handRaised: false,
    joinTime: "14:12",
    isMuted: false,
    lastEmoji: "🎉",
    emojiTimestamp: "14:37",
    quizStatus: 'completed',
    isPresenting: true,
    lastInteractionTime: "14:37",
    handRaisedTime: undefined,
    quizCompletedTime: "14:31"
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    studentId: "2",
    studentName: "فاطمة علي",
    message: "شكراً على الشرح الرائع! 👏",
    timestamp: "14:35",
    type: "message"
  },
  {
    id: "2", 
    studentId: "1",
    studentName: "أحمد محمد",
    message: "هل يمكن إعادة شرح الجزء الأخير؟",
    timestamp: "14:33",
    type: "message"
  },
  {
    id: "3",
    studentId: "system",
    studentName: "النظام",
    message: "انضم عبدالله أحمد للبث",
    timestamp: "14:32",
    type: "system"
  },
  {
    id: "4",
    studentId: "3",
    studentName: "محمد السعيد",
    message: "ممتاز! واضح جداً",
    timestamp: "14:30",
    type: "message"
  }
];

const mockQuizDrafts: QuizDraft[] = [
  {
    id: "1",
    title: "اختبار React Hooks الأساسية",
    questionsCount: 5,
    lastModified: "2024-01-15",
    category: "البرمجة"
  },
  {
    id: "2", 
    title: "مراجعة JavaScript ES6",
    questionsCount: 8,
    lastModified: "2024-01-10",
    category: "البرمجة"
  },
  {
    id: "3",
    title: "أساسيات CSS Grid",
    questionsCount: 4,
    lastModified: "2024-01-08",
    category: "تطوير الويب"
  }
];

export default function NewLiveStreamPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [streamStats, setStreamStats] = useState<StreamStats>({
    viewers: 5,
    likes: 12,
    duration: "00:15:32",
    isLive: true
  });
  
  // Teacher controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // Quiz states
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [selectedQuizDraft, setSelectedQuizDraft] = useState<string>("");
  const [activeTab, setActiveTab] = useState("chat");
  const [sortBy, setSortBy] = useState<string>("join-time");
  
  // Whiteboard states
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [quizCreationStep, setQuizCreationStep] = useState<'select' | 'create' | 'preview'>('select');
  const [newQuiz, setNewQuiz] = useState<NewQuiz>({
    title: '',
    description: '',
    type: 'multiple-choice',
    timeLimit: 10,
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: '',
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const toggleStudentMic = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, hasMic: !student.hasMic }
        : student
    ));
    
    const student = students.find(s => s.id === studentId);
    if (student) {
      const systemMessage: ChatMessage = {
        id: Date.now().toString(),
        studentId: "system",
        studentName: "النظام",
        message: `${student.hasMic ? 'تم إغلاق' : 'تم تشغيل'} مايك ${student.name}`,
        timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        type: "system"
      };
      setChatMessages(prev => [systemMessage, ...prev]);
    }
  };

  const clearHandRaise = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, handRaised: false }
        : student
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        studentId: "teacher",
        studentName: "المدرب",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        type: "message"
      };
      setChatMessages(prev => [message, ...prev]);
      setNewMessage("");
    }
  };

  const endStream = () => {
    setStreamStats(prev => ({ ...prev, isLive: false }));
    // في التطبيق الحقيقي، سيتم إنهاء البث والتوجه لصفحة أخرى
  };

  const sendQuizToStudents = (quizType: 'new' | 'draft') => {
    const quizTitle = quizType === 'new' ? newQuiz.title || 'اختبار جديد' : 
                     mockQuizDrafts.find(q => q.id === selectedQuizDraft)?.title || 'اختبار من المسودات';
    
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      studentId: "system",
      studentName: "النظام",
      message: `📝 تم إطلاق "${quizTitle}" - ${newQuiz.questions.length} سؤال - مدة: ${newQuiz.timeLimit} دقيقة`,
      timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
      type: "system"
    };
    
    setChatMessages(prev => [systemMessage, ...prev]);
    setIsQuizDialogOpen(false);
    setSelectedQuizDraft("");
    resetQuizCreation();
    
    // في التطبيق الحقيقي، سيتم إرسال الاختبار للطلاب
  };

  const resetQuizCreation = () => {
    setQuizCreationStep('select');
    setNewQuiz({
      title: '',
      description: '',
      type: 'multiple-choice',
      timeLimit: 10,
      questions: []
    });
    setCurrentQuestion({
      id: '',
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    });
    setEditingQuestionIndex(null);
  };

  const startQuizCreation = (type: 'multiple-choice' | 'coding') => {
    setNewQuiz(prev => ({ ...prev, type }));
    setCurrentQuestion(prev => ({ ...prev, type }));
    setQuizCreationStep('create');
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;
    
    const questionToAdd = {
      ...currentQuestion,
      id: Date.now().toString()
    };

    if (editingQuestionIndex !== null) {
      const updatedQuestions = [...newQuiz.questions];
      updatedQuestions[editingQuestionIndex] = questionToAdd;
      setNewQuiz(prev => ({ ...prev, questions: updatedQuestions }));
      setEditingQuestionIndex(null);
    } else {
      setNewQuiz(prev => ({ ...prev, questions: [...prev.questions, questionToAdd] }));
    }

    // Reset current question
    setCurrentQuestion({
      id: '',
      type: newQuiz.type,
      question: '',
      options: newQuiz.type === 'multiple-choice' ? ['', '', '', ''] : undefined,
      correctAnswer: newQuiz.type === 'multiple-choice' ? 0 : undefined,
      code: newQuiz.type === 'coding' ? '' : undefined,
      expectedOutput: newQuiz.type === 'coding' ? '' : undefined,
      points: 1
    });
  };

  const editQuestion = (index: number) => {
    setCurrentQuestion(newQuiz.questions[index]);
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index);
    setNewQuiz(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const updateCurrentQuestion = (field: keyof QuizQuestion, value: any) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const updateQuizOption = (index: number, value: string) => {
    const updatedOptions = [...(currentQuestion.options || [])];
    updatedOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  const getSortedStudents = () => {
    const onlineStudents = students.filter(s => s.isOnline);
    
    switch (sortBy) {
      case 'last-interaction':
        return onlineStudents.sort((a, b) => {
          const timeA = a.lastInteractionTime || a.joinTime;
          const timeB = b.lastInteractionTime || b.joinTime;
          return timeB.localeCompare(timeA);
        });
      
      case 'hand-raised':
        return onlineStudents.sort((a, b) => {
          if (a.handRaised && !b.handRaised) return -1;
          if (!a.handRaised && b.handRaised) return 1;
          if (a.handRaised && b.handRaised) {
            const timeA = a.handRaisedTime || a.joinTime;
            const timeB = b.handRaisedTime || b.joinTime;
            return timeB.localeCompare(timeA);
          }
          return 0;
        });
      
      case 'quiz-completed':
        return onlineStudents.sort((a, b) => {
          if (a.quizStatus === 'completed' && b.quizStatus !== 'completed') return -1;
          if (a.quizStatus !== 'completed' && b.quizStatus === 'completed') return 1;
          if (a.quizStatus === 'completed' && b.quizStatus === 'completed') {
            const timeA = a.quizCompletedTime || a.joinTime;
            const timeB = b.quizCompletedTime || b.joinTime;
            return timeB.localeCompare(timeA);
          }
          return 0;
        });
      
      case 'join-time':
      default:
        return onlineStudents.sort((a, b) => b.joinTime.localeCompare(a.joinTime));
    }
  };

  const toggleWhiteboard = () => {
    setIsWhiteboardOpen(!isWhiteboardOpen);
  };

  const clearWhiteboard = () => {
    const canvas = document.getElementById('whiteboard-canvas') as HTMLCanvasElement;
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
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (selectedTool === 'pen') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = penColor;
      } else if (selectedTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = penSize * 2; // Make eraser bigger
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleCanvasMouseUp = () => {
    const canvas = document.getElementById('whiteboard-canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
    setIsDrawing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardPageHeader
        icon={Radio}
        title="بث مباشر - ورشة تطوير التطبيقات الحديثة"
        actions={
          <div className="flex items-center gap-3">
            <Badge className="bg-red-100 text-red-700 animate-pulse font-noto">
              <Radio className="w-4 h-4 mr-1" />
              {streamStats.isLive ? 'مباشر الآن' : 'انتهى البث'}
            </Badge>
            <Badge variant="outline" className="font-noto">
              <Users className="w-3 h-3 mr-1" />
              {streamStats.viewers} مشاهد
            </Badge>
            <Badge variant="outline" className="font-noto">
              <Heart className="w-3 h-3 mr-1" />
              {streamStats.likes} إعجاب
            </Badge>
            <Badge variant="outline" className="font-noto">
              <Eye className="w-3 h-3 mr-1" />
              {streamStats.duration}
            </Badge>
            
            {/* Whiteboard Button */}
            <Button
              onClick={toggleWhiteboard}
              size="sm"
              className={`${isWhiteboardOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white font-noto`}
              title={isWhiteboardOpen ? "إغلاق السبورة التفاعلية" : "فتح السبورة التفاعلية"}
            >
              <Presentation className="w-4 h-4 mr-2" />
              {isWhiteboardOpen ? 'إغلاق السبورة' : 'السبورة التفاعلية'}
            </Button>
            
            {/* Quiz Button */}
            <Dialog open={isQuizDialogOpen} onOpenChange={(open) => {
              setIsQuizDialogOpen(open);
              if (!open) resetQuizCreation();
            }}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 font-noto">
                  <FileQuestion className="w-4 h-4 mr-2" />
                  إرسال اختبار
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-noto">
                    {quizCreationStep === 'select' && 'إرسال اختبار للطلاب'}
                    {quizCreationStep === 'create' && `إنشاء اختبار ${newQuiz.type === 'multiple-choice' ? 'اختيار من متعدد' : 'برمجي'}`}
                    {quizCreationStep === 'preview' && 'معاينة الاختبار'}
                  </DialogTitle>
                </DialogHeader>
                
                {/* Step 1: Selection */}
                {quizCreationStep === 'select' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Multiple Choice Quiz */}
                      <Button
                        onClick={() => startQuizCreation('multiple-choice')}
                        className="w-full justify-start h-auto p-6"
                        variant="outline"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium font-noto text-lg">اختبار اختيار من متعدد</h4>
                            <p className="text-sm text-gray-500 font-noto">أسئلة مع خيارات متعددة وإجابة واحدة صحيحة</p>
                          </div>
                        </div>
                      </Button>
                      
                      {/* Coding Quiz */}
                      <Button
                        onClick={() => startQuizCreation('coding')}
                        className="w-full justify-start h-auto p-6"
                        variant="outline"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium font-noto text-lg">اختبار برمجي</h4>
                            <p className="text-sm text-gray-500 font-noto">تحديات برمجية مع كود للاختبار</p>
                          </div>
                        </div>
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500 font-noto">أو</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 font-noto">
                        اختيار من المسودات السابقة:
                      </label>
                      <Select value={selectedQuizDraft} onValueChange={setSelectedQuizDraft}>
                        <SelectTrigger className="font-noto">
                          <SelectValue placeholder="اختر مسودة..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockQuizDrafts.map((draft) => (
                            <SelectItem key={draft.id} value={draft.id}>
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <div>
                                  <div className="font-medium font-noto">{draft.title}</div>
                                  <div className="text-xs text-gray-500 font-noto">
                                    {draft.questionsCount} أسئلة • {draft.category}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedQuizDraft && (
                        <Button
                          onClick={() => sendQuizToStudents('draft')}
                          className="w-full font-noto"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          إرسال المسودة المحددة
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Create Quiz */}
                {quizCreationStep === 'create' && (
                  <div className="space-y-6">
                    {/* Quiz Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quiz-title" className="font-noto">عنوان الاختبار</Label>
                        <Input
                          id="quiz-title"
                          placeholder="مثال: اختبار React الأساسي"
                          value={newQuiz.title}
                          onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                          className="font-noto"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-limit" className="font-noto">المدة الزمنية (دقيقة)</Label>
                        <Input
                          id="time-limit"
                          type="number"
                          min="1"
                          max="60"
                          value={newQuiz.timeLimit}
                          onChange={(e) => setNewQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 10 }))}
                          className="font-noto"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quiz-description" className="font-noto">وصف الاختبار</Label>
                      <Textarea
                        id="quiz-description"
                        placeholder="وصف مختصر عن محتوى الاختبار..."
                        value={newQuiz.description}
                        onChange={(e) => setNewQuiz(prev => ({ ...prev, description: e.target.value }))}
                        className="font-noto"
                        rows={2}
                      />
                    </div>

                    <Separator />

                    {/* Questions List */}
                    {newQuiz.questions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium font-noto">الأسئلة المضافة ({newQuiz.questions.length})</h4>
                        <div className="space-y-2">
                          {newQuiz.questions.map((question, index) => (
                            <div key={question.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {question.type === 'multiple-choice' ? 'اختيار متعدد' : 'برمجي'}
                                  </Badge>
                                  <span className="text-sm text-gray-500">{question.points} نقطة</span>
                                </div>
                                <p className="text-sm font-noto text-gray-800 truncate">{question.question}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => editQuestion(index)}
                                >
                                  تعديل
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteQuestion(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Question Form */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h4 className="font-medium font-noto">
                        {editingQuestionIndex !== null ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
                      </h4>
                      
                      <div className="space-y-2">
                        <Label className="font-noto">نص السؤال</Label>
                        <Textarea
                          placeholder="اكتب السؤال هنا..."
                          value={currentQuestion.question}
                          onChange={(e) => updateCurrentQuestion('question', e.target.value)}
                          className="font-noto"
                          rows={2}
                        />
                      </div>

                      {newQuiz.type === 'multiple-choice' && (
                        <div className="space-y-3">
                          <Label className="font-noto">الخيارات</Label>
                          {currentQuestion.options?.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="correct-answer"
                                  checked={currentQuestion.correctAnswer === index}
                                  onChange={() => updateCurrentQuestion('correctAnswer', index)}
                                  className="text-green-600"
                                />
                                <span className="text-sm text-gray-600">صحيح</span>
                              </div>
                              <Input
                                placeholder={`الخيار ${index + 1}`}
                                value={option}
                                onChange={(e) => updateQuizOption(index, e.target.value)}
                                className="font-noto"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {newQuiz.type === 'coding' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="font-noto">الكود الأولي</Label>
                            <Textarea
                              placeholder="function solution() {&#10;  // اكتب الكود هنا&#10;}"
                              value={currentQuestion.code || ''}
                              onChange={(e) => updateCurrentQuestion('code', e.target.value)}
                              className="font-noto font-mono text-sm"
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-noto">النتيجة المتوقعة</Label>
                            <Textarea
                              placeholder="النتيجة المتوقعة من تشغيل الكود"
                              value={currentQuestion.expectedOutput || ''}
                              onChange={(e) => updateCurrentQuestion('expectedOutput', e.target.value)}
                              className="font-noto font-mono text-sm"
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label className="font-noto">النقاط:</Label>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={currentQuestion.points}
                            onChange={(e) => updateCurrentQuestion('points', parseInt(e.target.value) || 1)}
                            className="w-20"
                          />
                        </div>
                        <div className="flex gap-2 mr-auto">
                          {editingQuestionIndex !== null && (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingQuestionIndex(null);
                                setCurrentQuestion({
                                  id: '',
                                  type: newQuiz.type,
                                  question: '',
                                  options: newQuiz.type === 'multiple-choice' ? ['', '', '', ''] : undefined,
                                  correctAnswer: newQuiz.type === 'multiple-choice' ? 0 : undefined,
                                  code: newQuiz.type === 'coding' ? '' : undefined,
                                  expectedOutput: newQuiz.type === 'coding' ? '' : undefined,
                                  points: 1
                                });
                              }}
                            >
                              إلغاء
                            </Button>
                          )}
                          <Button
                            onClick={addQuestion}
                            disabled={!currentQuestion.question.trim()}
                            className="font-noto"
                          >
                            {editingQuestionIndex !== null ? 'حفظ التعديل' : 'إضافة السؤال'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setQuizCreationStep('select')}
                        className="font-noto"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        رجوع
                      </Button>
                      <Button
                        onClick={() => setQuizCreationStep('preview')}
                        disabled={newQuiz.questions.length === 0 || !newQuiz.title.trim()}
                        className="font-noto"
                      >
                        معاينة الاختبار
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Preview & Launch */}
                {quizCreationStep === 'preview' && (
                  <div className="space-y-6">
                    {/* Quiz Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium font-noto text-lg mb-2">{newQuiz.title}</h3>
                      {newQuiz.description && (
                        <p className="text-sm text-gray-600 font-noto mb-3">{newQuiz.description}</p>
                      )}
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="font-noto">📝 {newQuiz.questions.length} سؤال</span>
                        <span className="font-noto">⏱️ {newQuiz.timeLimit} دقيقة</span>
                        <span className="font-noto">🎯 {newQuiz.questions.reduce((sum, q) => sum + q.points, 0)} نقطة</span>
                        <span className="font-noto">
                          {newQuiz.type === 'multiple-choice' ? '✅ اختيار من متعدد' : '💻 برمجي'}
                        </span>
                      </div>
                    </div>

                    {/* Questions Preview */}
                    <div className="space-y-4">
                      <h4 className="font-medium font-noto">الأسئلة:</h4>
                      {newQuiz.questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              س{index + 1}
                            </Badge>
                            <div className="flex-1">
                              <p className="font-noto text-gray-800 mb-2">{question.question}</p>
                              
                              {question.type === 'multiple-choice' && question.options && (
                                <div className="space-y-2">
                                  {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded border-2 ${
                                        question.correctAnswer === optionIndex 
                                          ? 'bg-green-100 border-green-500' 
                                          : 'border-gray-300'
                                      }`}>
                                        {question.correctAnswer === optionIndex && (
                                          <CheckCircle className="w-3 h-3 text-green-600" />
                                        )}
                                      </div>
                                      <span className="text-sm font-noto">{option}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {question.type === 'coding' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                  <div>
                                    <p className="text-xs text-gray-500 font-noto mb-2">الكود الأولي:</p>
                                    <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto">
                                      {question.code}
                                    </pre>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 font-noto mb-2">النتيجة المتوقعة:</p>
                                    <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto">
                                      {question.expectedOutput}
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {question.points} نقطة
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Launch Controls */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setQuizCreationStep('create')}
                        className="font-noto"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        تعديل
                      </Button>
                      <Button
                        onClick={() => sendQuizToStudents('new')}
                        className="bg-green-600 hover:bg-green-700 font-noto"
                      >
                        🚀 إطلاق الاختبار
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {/* Main Stream Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Chat & Participants Tabs */}
        <div className="xl:col-span-1 order-2 xl:order-1">
          <Card className="h-[600px] flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="flex-shrink-0 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat" className="font-noto">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    الدردشة
                    <Badge variant="secondary" className="mr-2 text-xs">
                      {chatMessages.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="participants" className="font-noto">
                    <Users className="w-4 h-4 mr-2" />
                    المشاركون
                    <Badge variant="secondary" className="mr-2 text-xs">
                      {students.filter(s => s.isOnline).length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                <div className="flex-1 flex flex-col">
                  {/* Messages */}
                  <ScrollArea className="flex-1 px-4">
                    <div className="space-y-3 py-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="text-xs">
                              {message.studentId === "teacher" ? "🧑‍🏫" : 
                               message.studentId === "system" ? "⚙️" : 
                               message.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-medium font-noto ${
                                message.studentId === "teacher" ? "text-blue-600" :
                                message.studentId === "system" ? "text-gray-500" :
                                "text-gray-900"
                              }`}>
                                {message.studentName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {message.timestamp}
                              </span>
                            </div>
                            <p className={`text-sm font-noto ${
                              message.type === "system" ? "text-gray-500 italic" : "text-gray-700"
                            }`}>
                              {message.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="اكتب رسالة..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="font-noto"
                      />
                      <Button 
                        size="sm" 
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Participants Tab */}
              <TabsContent value="participants" className="flex-1 mt-0">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    {/* Filter Section */}
                    <div className="mb-4 pb-3 border-b">
                      <div className="flex items-center gap-3">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 font-noto">ترتيب المشاركين:</span>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-48 h-8 text-sm font-noto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="join-time">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span className="font-noto">حسب وقت الانضمام</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="last-interaction">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" />
                                <span className="font-noto">آخر تفاعل</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="hand-raised">
                              <div className="flex items-center gap-2">
                                <Hand className="w-3 h-3" />
                                <span className="font-noto">رفع اليد أولاً</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="quiz-completed">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                <span className="font-noto">إكمال الاختبار</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Badge variant="outline" className="mr-auto text-xs">
                          {students.filter(s => s.isOnline).length} متصل
                        </Badge>
                      </div>
                    </div>

                    {/* Students Grid - 3 per row */}
                    <div className="grid grid-cols-3 gap-3">
                      {getSortedStudents().map((student) => (
                        <div key={student.id} className="group">
                          {/* Student Video Card */}
                          <div className={`relative aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 ${
                            student.isPresenting ? 'border-blue-500' : 
                            student.handRaised ? 'border-yellow-500' : 'border-gray-300'
                          }`}>
                            
                            {/* Video/Avatar Display */}
                            {student.hasCamera ? (
                              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback className="text-xs">{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black bg-opacity-20" />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback className="text-sm">{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                            )}

                            {/* Status Overlays */}
                            <div className="absolute top-1 left-1 flex gap-1">
                              {/* Mic Status */}
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                student.isMuted || !student.hasMic ? 'bg-red-500' : 'bg-green-500'
                              }`}>
                                {student.isMuted || !student.hasMic ? 
                                  <MicOff className="w-2 h-2 text-white" /> : 
                                  <Mic className="w-2 h-2 text-white" />
                                }
                              </div>

                              {/* Hand Raised */}
                              {student.handRaised && (
                                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                                  <Hand className="w-2 h-2 text-white" />
                                </div>
                              )}

                              {/* Presenting */}
                              {student.isPresenting && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Monitor className="w-2 h-2 text-white" />
                                </div>
                              )}
                            </div>

                            {/* Quiz Status */}
                            <div className="absolute top-1 right-1">
                              <div className={`w-3 h-3 rounded-full ${
                                student.quizStatus === 'completed' ? 'bg-green-500' :
                                student.quizStatus === 'in-progress' ? 'bg-yellow-500' :
                                student.quizStatus === 'not-started' ? 'bg-gray-400' :
                                'bg-red-500'
                              }`} 
                                   title={`اختبار: ${
                                     student.quizStatus === 'completed' ? 'مكتمل' :
                                     student.quizStatus === 'in-progress' ? 'جاري' :
                                     student.quizStatus === 'not-started' ? 'لم يبدأ' :
                                     'غير مشارك'
                                   }`} />
                            </div>

                            {/* Last Emoji */}
                            {student.lastEmoji && (
                              <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded-full w-5 h-5 flex items-center justify-center">
                                <span className="text-xs">{student.lastEmoji}</span>
                              </div>
                            )}

                            {/* Student Name */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white text-xs px-2 py-1">
                              <div className="flex items-center justify-between">
                                <span className="font-noto truncate">{student.name}</span>
                                <span className="text-xs opacity-75">{student.joinTime}</span>
                              </div>
                            </div>

                            {/* Control Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <div className="flex gap-1">
                                {/* Mic Control */}
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => toggleStudentMic(student.id)}
                                  className="h-6 w-6 p-0"
                                  title={student.isMuted ? 'إلغاء الكتم' : 'كتم'}
                                >
                                  {student.isMuted ? 
                                    <MicOff className="w-2.5 h-2.5" /> : 
                                    <Mic className="w-2.5 h-2.5" />
                                  }
                                </Button>

                                {/* Camera Control */}
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => toggleStudentMic(student.id)}
                                  className="h-6 w-6 p-0"
                                  title="تشغيل/إيقاف الكاميرا"
                                >
                                  {student.hasCamera ? 
                                    <Camera className="w-2.5 h-2.5" /> : 
                                    <CameraOff className="w-2.5 h-2.5" />
                                  }
                                </Button>

                                {/* Clear Hand */}
                                {student.handRaised && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => clearHandRaise(student.id)}
                                    className="h-6 w-6 p-0"
                                    title="إزالة رفع اليد"
                                  >
                                    <UserCheck className="w-2.5 h-2.5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Student Info Below */}
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${
                                student.quizStatus === 'completed' ? 'bg-green-500' :
                                student.quizStatus === 'in-progress' ? 'bg-yellow-500' :
                                student.quizStatus === 'not-started' ? 'bg-gray-400' :
                                'bg-red-500'
                              }`} />
                              <span className="font-noto text-gray-600">
                                {student.quizStatus === 'completed' ? 'مكتمل' :
                                 student.quizStatus === 'in-progress' ? 'جاري' :
                                 student.quizStatus === 'not-started' ? 'لم يبدأ' :
                                 'غير مشارك'}
                              </span>
                            </div>
                            {student.lastEmoji && student.emojiTimestamp && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{student.lastEmoji}</span>
                                <span>{student.emojiTimestamp}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Empty State */}
                    {students.filter(s => s.isOnline).length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
                        <p className="font-noto text-lg">لا يوجد طلاب متصلون</p>
                        <p className="font-noto text-sm mt-1">سيظهر الطلاب هنا عند انضمامهم للبث</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Center: Video Stream */}
        <div className="xl:col-span-2 order-1 xl:order-2">
          <Card className="overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              {/* Video Stream Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-75" />
                  <p className="text-lg font-noto">كاميرا المدرب</p>
                  <p className="text-sm opacity-75 font-noto">البث المباشر نشط</p>
                </div>
              </div>

              {/* Whiteboard Overlay */}
              {isWhiteboardOpen && (
                <div className="absolute inset-0 bg-white border-2 border-gray-300">
                  {/* Whiteboard Header */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h3 className="text-gray-800 font-noto text-lg font-bold">السبورة التفاعلية</h3>
                      </div>
                    </div>
                    <Button
                      onClick={toggleWhiteboard}
                      className="bg-red-500 hover:bg-red-600 text-white shadow-md"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      إغلاق
                    </Button>
                  </div>

                  {/* Drawing Tools - Enhanced Design */}
                  <div className="absolute top-20 left-4 bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200 space-y-4 min-w-[200px]">
                    {/* Tool Selection */}
                    <div className="space-y-2">
                      <h4 className="text-gray-700 font-noto font-semibold text-sm mb-3">🛠️ الأدوات</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => setSelectedTool('pen')}
                          className={`justify-center transition-all duration-200 ${
                            selectedTool === 'pen' 
                              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md scale-105' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                          }`}
                          size="sm"
                        >
                          <Presentation className="w-4 h-4 mr-1" />
                          قلم
                        </Button>
                        <Button
                          onClick={() => setSelectedTool('eraser')}
                          className={`justify-center transition-all duration-200 ${
                            selectedTool === 'eraser' 
                              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md scale-105' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                          }`}
                          size="sm"
                        >
                          <Minus className="w-4 h-4 mr-1" />
                          ممحاة
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      {/* Pen Color */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700 text-sm font-noto font-semibold">الألوان:</span>
                        </div>
                        
                        {/* Color Grid */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { color: '#000000', name: 'أسود' },
                            { color: '#ff0000', name: 'أحمر' },
                            { color: '#00ff00', name: 'أخضر' },
                            { color: '#0000ff', name: 'أزرق' },
                            { color: '#ffff00', name: 'أصفر' },
                            { color: '#ff00ff', name: 'بنفسجي' },
                            { color: '#00ffff', name: 'سماوي' },
                            { color: '#ffa500', name: 'برتقالي' }
                          ].map(({ color, name }) => (
                            <button
                              key={color}
                              onClick={() => setPenColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110 ${
                                penColor === color ? 'border-gray-800 ring-2 ring-blue-300' : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: color }}
                              title={name}
                            />
                          ))}
                        </div>
                        
                        {/* Custom Color Picker */}
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 text-xs font-noto">لون مخصص:</span>
                          <input
                            type="color"
                            value={penColor}
                            onChange={(e) => setPenColor(e.target.value)}
                            className="w-10 h-8 rounded cursor-pointer border border-gray-300"
                          />
                          <div 
                            className="w-4 h-4 rounded border border-gray-300" 
                            style={{ backgroundColor: penColor }}
                          ></div>
                        </div>
                      </div>

                      {/* Pen Size */}
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div 
                              className="rounded-full bg-gray-600" 
                              style={{ width: `${Math.max(4, penSize/2)}px`, height: `${Math.max(4, penSize/2)}px` }}
                            ></div>
                          </div>
                          <span className="text-gray-700 text-sm font-noto font-semibold">الحجم:</span>
                          <span className="text-blue-600 text-sm font-bold">{penSize}px</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={penSize}
                          onChange={(e) => setPenSize(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(penSize-1)/19*100}%, #e5e7eb ${(penSize-1)/19*100}%, #e5e7eb 100%)`
                          }}
                        />
                      </div>

                      {/* Clear Board */}
                      <Button
                        onClick={clearWhiteboard}
                        className="w-full bg-red-500 hover:bg-red-600 text-white mt-4 transition-all duration-200 shadow-md hover:shadow-lg"
                        size="sm"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        🗑️ مسح الكل
                      </Button>
                    </div>
                  </div>

                  {/* Grid Background */}
                  <div 
                    className="absolute opacity-30 pointer-events-none"
                    style={{ 
                      top: '80px',
                      left: '230px',
                      right: '16px',
                      bottom: '16px',
                      backgroundImage: `
                        linear-gradient(rgba(200,200,200,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(200,200,200,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '25px 25px'
                    }}
                  />

                  {/* Drawing Canvas */}
                  <canvas
                    id="whiteboard-canvas"
                    width={800}
                    height={450}
                    className="absolute cursor-crosshair bg-transparent"
                    style={{ 
                      top: '80px',
                      left: '230px',
                      right: '16px',
                      bottom: '16px',
                      width: 'calc(100% - 246px)',
                      height: 'calc(100% - 96px)'
                    }}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                  />
                </div>
              )}
              
              {/* Stream Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Mic Control */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-white hover:bg-white/20 ${isMicOn ? 'bg-green-600/50' : 'bg-red-600/50'}`}
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  
                  {/* Camera Control */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-white hover:bg-white/20 ${isCameraOn ? 'bg-green-600/50' : 'bg-red-600/50'}`}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                  >
                    {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                  </Button>
                  
                  {/* Screen Share */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-white hover:bg-white/20 ${isScreenSharing ? 'bg-blue-600/50' : ''}`}
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  
                  {/* Whiteboard */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Presentation className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Recording */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-white hover:bg-white/20 ${isRecording ? 'bg-red-600/50' : ''}`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <StopCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  {/* Share */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  
                  {/* Settings */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  
                  {/* End Stream */}
                  <Button
                    size="sm"
                    onClick={endStream}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    إنهاء البث
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}