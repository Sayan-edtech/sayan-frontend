import { Play, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface LessonPreviewProps {
  selectedLesson?: any;
}

function LessonPreview({ selectedLesson }: LessonPreviewProps) {
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [quizSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});

  // Debug: التحقق من نوع الدرس
  console.log('Selected lesson:', selectedLesson);
  console.log('Lesson type:', selectedLesson?.type);
  console.log('Lesson lessonType:', selectedLesson?.lessonType);
  console.log('Has questions:', selectedLesson?.questions ? 'Yes' : 'No');

  if (!selectedLesson) {
    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-600 mb-2">اختر درساً لعرضه</h4>
                <p className="text-sm text-gray-500">اختر أي درس من القائمة الجانبية لعرض محتواه هنا</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz lesson - التحقق من نوع الاختبار أولاً
  if (selectedLesson.lessonType === 'quiz' && selectedLesson.questions) {
    console.log('Rendering quiz with questions:', selectedLesson.questions);
    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
            
            <div className="space-y-4">
              {selectedLesson.questions?.map((question: any, index: number) => (
                <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">السؤال {index + 1}: {question.question}</h4>
                  <div className="space-y-2">
                    {question.options.map((option: string, optionIndex: number) => (
                      <label key={optionIndex} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionIndex}
                          checked={quizAnswers[question.id] === optionIndex}
                          onChange={(e) => setQuizAnswers({
                            ...quizAnswers,
                            [question.id]: parseInt(e.target.value)
                          })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{option}</span>
                        {quizSubmitted && (
                          <div className="ml-auto">
                            {optionIndex === question.correctAnswer ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : quizAnswers[question.id] === optionIndex ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Interactive lesson - تفاعلي
  if (selectedLesson.lessonType === 'interactive') {
    console.log('Rendering interactive lesson');
    
    // Handle flashcards
    if (selectedLesson.toolType === 'flashcards') {
      const handleCardFlip = (cardId: number) => {
        setFlippedCards(prev => ({
          ...prev,
          [cardId]: !prev[cardId]
        }));
      };

      return (
        <div className="space-y-6">
          <Card className="p-6 shadow-sm border-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedLesson.cards.map((card: any) => (
                  <div key={card.id} className="flex justify-center">
                    <div className="relative w-full max-w-sm">
                      <div 
                        className={`relative w-full h-48 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
                          flippedCards[card.id] ? 'rotate-y-180' : ''
                        }`}
                        onClick={() => handleCardFlip(card.id)}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Front of card */}
                        <div className="absolute inset-0 backface-hidden">
                          <Card className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                            <div className="text-center">
                              <div className="text-base font-semibold text-blue-800 mb-2">
                                {card.front}
                              </div>
                              <div className="text-xs text-blue-600">
                                اضغط للإجابة
                              </div>
                            </div>
                          </Card>
                        </div>
                        
                        {/* Back of card */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                          <Card className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                            <div className="text-center">
                              <div className="text-base font-semibold text-green-800 mb-2">
                                {card.back}
                              </div>
                              <div className="text-xs px-2 py-1 bg-green-200 text-green-700 rounded-full">
                                {card.category}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      );
    }
    
    // Handle other interactive tools
    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                {/* عنوان المقال */}
                <h4 className="text-xl font-bold text-gray-800">مقدمة في البرمجة التفاعلية</h4>
                
                {/* صورة المقال */}
                <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">📖</div>
                    <span className="text-sm">صورة المقال</span>
                  </div>
                </div>
                
                {/* محتوى المقال */}
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    في هذا المقال سنتعلم أساسيات البرمجة التفاعلية وكيفية استخدام الأدوات المختلفة 
                    لإنشاء تطبيقات ديناميكية وتفاعلية.
                  </p>
                  
                  <p className="mb-4">
                    البرمجة التفاعلية تتيح للمستخدمين التفاعل مع التطبيق بطرق مختلفة، مما يجعل 
                    التجربة أكثر إثارة وفعالية.
                  </p>
                  
                  <p>
                    سنتعلم في هذا الدرس كيفية إنشاء واجهات تفاعلية باستخدام تقنيات حديثة 
                    وأفضل الممارسات في التطوير.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Video lesson - للدروس المرئية
  if (selectedLesson.lessonType === 'video') {
    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
            
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/api/placeholder/800/450"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm" type="video/webm" />
                متصفحك لا يدعم تشغيل الفيديو
              </video>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Text lesson - للدروس النصية
  if (selectedLesson.lessonType === 'text') {
    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-sm border-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {`مرحباً بك في درس مقدمة في HTML

HTML هي لغة الترميز الأساسية لإنشاء صفحات الويب. تعتبر HTML اللبنة الأولى في رحلة تعلم تطوير الويب.

في هذا الدرس سنتعلم:
• ما هي HTML وكيف تعمل
• العناصر الأساسية في HTML
• كيفية إنشاء صفحة ويب بسيطة
• الوسوم الأساسية مثل العناوين والفقرات

HTML تعني HyperText Markup Language وهي ليست لغة برمجة بل لغة ترميز تستخدم لوصف محتوى الصفحة وتنظيمه.

مثال على أساسيات HTML:
العنوان الرئيسي يستخدم وسم <h1>
الفقرات تستخدم وسم <p>
الروابط تستخدم وسم <a>

هذا المحتوى يمكن للطلاب قراءته والتعلم منه بسهولة.`}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Default fallback
  console.log('Rendering default lesson content');
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm border-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">معاينة الدرس</h3>
          
          <div className="prose prose-gray max-w-none">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">محتوى الدرس</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                هذا محتوى الدرس. يمكن للطلاب قراءة المحتوى النصي والتعلم من خلاله.
              </p>
              
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">
                  سيتم عرض محتوى الدرس المفصل هنا بناءً على نوع الدرس ومحتواه.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LessonPreview;
