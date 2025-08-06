# مكونات الدروس (Lesson Components)

هذا المجلد يحتوي على جميع المكونات المتعلقة بعرض الدروس التعليمية.

## الهيكل:

### 📁 المكونات الأساسية:
- `LessonContent.tsx` - المكون الرئيسي الذي يحدد نوع الدرس ويعرض المكون المناسب
- `LessonsList.tsx` - قائمة الدروس والفصول

### 📁 أنواع الدروس:
- `VideoLesson.tsx` - عرض دروس الفيديو مع المساعد الذكي
- `QuizLesson.tsx` - عرض الاختبارات والأسئلة
- `InteractiveLesson.tsx` - عرض التطبيقات التفاعلية
- `EmptyLessonState.tsx` - الحالة الفارغة عند عدم اختيار درس

### 📁 المكونات المساعدة:
- `AIAssistant.tsx` - المساعد الذكي (Chat Bot)
- `MobileMenuButton.tsx` - زر قائمة الدروس للجوال
- `MobileLessonsDropdown.tsx` - القائمة المنسدلة للجوال

### 📁 ملفات التصدير:
- `index.ts` - تصدير جميع المكونات

## الاستخدام:

```tsx
import { LessonContent, LessonsList } from '@/components/lesson';

// استخدام المكونات
<LessonContent 
  activeLessonId={activeLessonId}
  chapters={chapters}
  isMobileMenuOpen={isMobileMenuOpen}
  setIsMobileMenuOpen={setIsMobileMenuOpen}
/>
```

## المميزات:
- ✅ تصميم متجاوب (Responsive)
- ✅ دعم الجوال مع قائمة منسدلة
- ✅ مساعد ذكي تفاعلي
- ✅ أنواع متعددة من الدروس
- ✅ كود منظم ومقسم