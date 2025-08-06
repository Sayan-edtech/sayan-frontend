import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Save, Trash2, X, Plus, Upload, Type, Hash, FolderOpen, Image, AlignLeft, FileText } from "lucide-react";
import RichTextToolbar from './RichTextToolbar';
import LinkModal from './LinkModal';
import ImageUrlModal from './ImageUrlModal';
import { enhancedToast } from "@/components/ui/enhanced-toast";

interface IBlogForm {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  keywords: string[];
  category: string;
  status: 'published' | 'draft';
}

interface AddBlogFormProps {
  onSubmit?: (data: IBlogForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  initialData?: Partial<IBlogForm>;
  isEditing?: boolean;
}

const FORM_DATA_KEY = "addBlogForm_draft";

const saveToLocalStorage = (key: string, data: Partial<IBlogForm>) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Failed to read from localStorage:", error);
    return null;
  }
};

const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }
};

function AddBlogForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEditing = false,
}: AddBlogFormProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<IBlogForm>({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      image: "",
      keywords: [],
      category: "",
      status: "draft",
      ...initialData,
    },
  });

  const watchedValues = watch();

  const autoSave = useCallback(() => {
    if (isDirty && !isEditing) {
      const dataToSave = { ...watchedValues, keywords };
      saveToLocalStorage(FORM_DATA_KEY, dataToSave);
    }
  }, [watchedValues, keywords, isDirty, isEditing]);

  useEffect(() => {
    const interval = setInterval(autoSave, 2000);
    return () => clearInterval(interval);
  }, [autoSave]);

  useEffect(() => {
    if (!initialData && !isEditing) {
      const savedData = getFromLocalStorage(FORM_DATA_KEY);
      if (savedData) {
        Object.keys(savedData).forEach((key) => {
          if (key === "keywords") {
            setKeywords(savedData[key] || []);
          } else {
            setValue(key as keyof IBlogForm, savedData[key]);
          }
        });
        enhancedToast.info("تم استرداد البيانات", {
          description: "تم استرداد البيانات المحفوظة مسبقاً"
        });
      }
    }
  }, [setValue, initialData, isEditing]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      setValue("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter(keyword => keyword !== keywordToRemove);
    setKeywords(newKeywords);
    setValue("keywords", newKeywords);
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const onSubmitForm = (data: IBlogForm) => {
    const finalData = { ...data, keywords };
    
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    onSubmit?.(finalData);
    
    enhancedToast.success(
      isEditing ? "تم تحديث المقال" : "تم حفظ المقال",
      {
        description: `تم ${data.status === 'published' ? 'نشر' : 'حفظ'} المقال بنجاح`
      }
    );
  };

  const handleCancel = () => {
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    onCancel?.();
  };

  const clearForm = () => {
    reset();
    setKeywords([]);
    setKeywordInput("");
    setSelectedImage(null);
    setImagePreview("");
    setEditorContent("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    enhancedToast.info("تم مسح النموذج", {
      description: "تم مسح جميع البيانات"
    });
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
      setValue("content", editorRef.current.innerHTML);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      setValue("content", content);
    }
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          executeCommand('insertImage', imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const insertImageFromUrl = () => {
    setShowImageUrlModal(true);
  };

  const handleImageUrlInsert = (url: string, alt: string) => {
    executeCommand('insertHTML', `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />`);
  };

  const insertLink = () => {
    setShowLinkModal(true);
  };

  const handleLinkInsert = (url: string, text: string) => {
    executeCommand('insertHTML', `<a href="${url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">${text}</a>`);
  };

  const changeFontSize = (size: string) => executeCommand("fontSize", size);
  const changeTextColor = (color: string) => executeCommand("foreColor", color);
  const changeBackgroundColor = (color: string) => executeCommand("backColor", color);
  const insertHeading = (level: number) => executeCommand('formatBlock', `h${level}`);
  const insertQuote = () => executeCommand('formatBlock', 'blockquote');
  const insertCode = () => executeCommand('formatBlock', 'pre');
  const undoAction = () => executeCommand('undo');
  const redoAction = () => executeCommand('redo');
  const strikeThrough = () => executeCommand('strikeThrough');
  const insertHorizontalRule = () => executeCommand('insertHorizontalRule');

  const insertTable = () => {
    const rows = prompt('عدد الصفوف:');
    const cols = prompt('عدد الأعمدة:');
    if (rows && cols) {
      let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">';
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML += '<td style="padding: 8px; border: 1px solid #ccc;">خلية</td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table>';
      executeCommand('insertHTML', tableHTML);
    }
  };

  useEffect(() => {
    if (initialData?.content && editorRef.current) {
      editorRef.current.innerHTML = initialData.content;
      setEditorContent(initialData.content);
    }
  }, [initialData?.content]);

  const categories = ["تقنية", "تعليم", "أعمال", "صحة", "رياضة", "سفر", "طبخ", "فن"];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Image className="w-4 h-4 text-orange-600" />
                  صورة المقال *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={imagePreview}
                        alt="معاينة الصورة"
                        className="mx-auto max-h-32 rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview("");
                          setValue("image", "");
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        إزالة الصورة
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div>
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Upload className="w-4 h-4 ml-2" />
                          اختر صورة
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-600" />
                  عنوان المقال *
                </Label>
                <Input
                  id="title"
                  {...register("title", { required: "عنوان المقال مطلوب" })}
                  placeholder="أدخل عنوان المقال"
                  className={`${errors.title ? "border-red-500" : ""} h-12 focus:outline-none focus:ring-0 focus:border-gray-300`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-purple-600" />
                  التصنيف *
                </Label>
                <Select
                   onValueChange={(value) => setValue("category", value)}
                   defaultValue={watchedValues.category}
                 >
                   <SelectTrigger className="h-10 focus:outline-none focus:ring-0 focus:border-gray-300">
                     <SelectValue placeholder="اختر التصنيف" />
                   </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-600" />
                  الكلمات المفتاحية
                </Label>
                <div className="flex gap-2">
                  <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      placeholder="أدخل كلمة مفتاحية"
                      className="flex-1 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />
                  <Button
                     type="button"
                     onClick={addKeyword}
                     variant="outline"
                     disabled={!keywordInput.trim()}
                   >
                     <Plus className="w-4 h-4" />
                   </Button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1"
                      >
                        {keyword}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-indigo-600" />
                  ملخص المقال *
                </Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt", { required: "ملخص المقال مطلوب" })}
                  placeholder="أدخل ملخص قصير للمقال"
                  rows={4}
                  className={`${errors.excerpt ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <Label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                محتوى المقال *
              </Label>
              <RichTextToolbar
                onBold={() => executeCommand("bold")}
                onItalic={() => executeCommand("italic")}
                onUnderline={() => executeCommand("underline")}
                onStrikethrough={strikeThrough}
                onHeading={insertHeading}
                onFontSize={changeFontSize}
                onTextColor={changeTextColor}
                onBackgroundColor={changeBackgroundColor}
                onAlignment={(alignment: 'left' | 'right' | 'center' | 'justify') => {
                  if (alignment === 'right') executeCommand("justifyRight");
                  else if (alignment === 'center') executeCommand("justifyCenter");
                  else if (alignment === 'justify') executeCommand("justifyFull");
                }}
                onList={(type: 'ul' | 'ol') => {
                  if (type === 'ul') executeCommand("insertUnorderedList");
                  else if (type === 'ol') executeCommand("insertOrderedList");
                }}
                onQuote={insertQuote}
                onCode={insertCode}
                onTable={insertTable}
                onHorizontalRule={insertHorizontalRule}
                onLink={insertLink}
                onImage={insertImage}
                editorRef={editorRef as React.RefObject<HTMLDivElement>}
              />

              <div className="relative border border-gray-300 rounded-b-lg bg-white focus-within:border-blue-400 transition-colors duration-200">
                <style>{`
                  .editor-content h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin: 1.5rem 0;
                    color: #1f2937;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 0.5rem;
                  }
                  .editor-content h2 {
                    font-size: 2rem;
                    font-weight: bold;
                    margin: 1.25rem 0;
                    color: #374151;
                  }
                  .editor-content h3 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin: 1rem 0;
                    color: #4b5563;
                  }
                  .editor-content blockquote {
                    border-right: 4px solid #3b82f6;
                    background: #f8fafc;
                    padding: 1rem 1.5rem;
                    margin: 1rem 0;
                    font-style: italic;
                    color: #64748b;
                    border-radius: 0.5rem;
                  }
                  .editor-content pre {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    font-family: 'Courier New', monospace;
                    margin: 1rem 0;
                  }
                  .editor-content table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 1rem 0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                  }
                  .editor-content table td, .editor-content table th {
                    border: 1px solid #d1d5db;
                    padding: 0.75rem;
                    text-align: right;
                  }
                  .editor-content table th {
                    background: #f3f4f6;
                    font-weight: bold;
                  }
                  .editor-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                  }
                  .editor-content ul, .editor-content ol {
                    margin: 1rem 0;
                    padding-right: 2rem;
                  }
                  .editor-content li {
                    margin: 0.5rem 0;
                  }
                  .editor-content hr {
                    border: none;
                    height: 2px;
                    background: linear-gradient(to left, #3b82f6, #8b5cf6);
                    margin: 2rem 0;
                    border-radius: 1px;
                  }
                  .editor-content a {
                    color: #3b82f6;
                    text-decoration: underline;
                    transition: color 0.2s;
                  }
                  .editor-content a:hover {
                    color: #1d4ed8;
                  }
                `}</style>
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorChange}
                  className={`editor-content min-h-[600px] p-4 prose prose-lg max-w-none focus:outline-none ${errors.content ? "border-red-500" : ""}`}
                  style={{
                    outline: 'none',
                    direction: 'rtl',
                    textAlign: 'right',
                    lineHeight: '1.8',
                    fontSize: '16px'
                  }}
                  suppressContentEditableWarning={true}
                />
                {!editorContent && (
                  <div className="absolute top-4 right-4 text-gray-400 pointer-events-none text-base select-none">
                    ابدأ في كتابة محتوى المقال هنا... يمكنك استخدام أدوات التحرير أعلاه لتنسيق النص وإضافة الصور والجداول
                  </div>
                )}
              </div>
              
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                إلغاء
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={clearForm}
                className="gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                مسح النموذج
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="outline"
                onClick={() => setValue("status", "draft")}
                disabled={isLoading}
                className="gap-2 text-amber-700 border-amber-200 hover:bg-amber-50"
              >
                <Save className="w-4 h-4" />
                حفظ كمسودة
              </Button>
              <Button
                type="submit"
                onClick={() => setValue("status", "published")}
                disabled={isLoading}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="w-4 h-4" />
                نشر المقال
              </Button>
            </div>
          </div>
        </div>
      </form>

      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={handleLinkInsert}
      />
      
      <ImageUrlModal
        isOpen={showImageUrlModal}
        onClose={() => setShowImageUrlModal(false)}
        onInsert={handleImageUrlInsert}
      />
    </div>
  );
}

export default AddBlogForm;