import React, { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
} from "lucide-react";

interface FlowbiteTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  name?: string;
  label?: string;
}

const FlowbiteTextEditor: React.FC<FlowbiteTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "ابدأ في الكتابة...",
  disabled = false,
  error = false,
  className = "",
  name,
  label,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState(value);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorContent) {
      editorRef.current.innerHTML = value;
      setEditorContent(value);
    }
  }, [value]);

  const executeCommand = (command: string, value?: string) => {
    if (disabled || isPreview) return;

    document.execCommand(command, false, value);
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      onChange(content);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current && !isPreview) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      onChange(content);
    }
  };

  const insertLink = () => {
    if (disabled || isPreview) return;

    const url = prompt("أدخل الرابط:");
    const text = prompt("أدخل النص:");
    if (url && text) {
      executeCommand(
        "insertHTML",
        `<a href="${url}" target="_blank" class="text-blue-600 underline hover:text-blue-800">${text}</a>`
      );
    }
  };

  const insertImage = () => {
    if (disabled || isPreview) return;

    const url = prompt("أدخل رابط الصورة:");
    const alt = prompt("أدخل النص البديل:");
    if (url) {
      executeCommand(
        "insertHTML",
        `<img src="${url}" alt="${
          alt || "صورة"
        }" class="max-w-full h-auto rounded-lg my-2" />`
      );
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const getPreviewContent = () => {
    if (!editorContent) return "";
    try {
      return marked(editorContent);
    } catch (error) {
      return editorContent;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      <div
        className={`border rounded-lg overflow-hidden ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "opacity-50" : ""}`}
      >
        {/* Toolbar */}
        <div className="bg-gray-50 border-b px-3 py-2">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("bold")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="عريض"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("italic")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="مائل"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("underline")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="تحته خط"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("strikeThrough")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="يتوسطه خط"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "h1")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="عنوان 1"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "h2")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="عنوان 2"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "h3")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="عنوان 3"
              >
                <Heading3 className="w-4 h-4" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("insertUnorderedList")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="قائمة نقطية"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("insertOrderedList")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="قائمة مرقمة"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            {/* Insert Elements */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={insertLink}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="إدراج رابط"
              >
                <Link className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={insertImage}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="إدراج صورة"
              >
                <Image className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "blockquote")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="اقتباس"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("formatBlock", "pre")}
                disabled={disabled || isPreview}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="كود"
              >
                <Code className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center gap-1 mr-auto">
              <button
                type="button"
                onClick={togglePreview}
                disabled={disabled}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors disabled:cursor-not-allowed ${
                  isPreview
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isPreview ? "تحرير" : "معاينة"}
              </button>
            </div>
          </div>
        </div>

        {/* Editor/Preview */}
        <div className="relative bg-white">
          {isPreview ? (
            <div
              className="min-h-[150px] p-4 prose prose-lg max-w-none"
              style={{
                direction: "rtl",
                textAlign: "right",
                lineHeight: "1.8",
              }}
              dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
            />
          ) : (
            <>
              <div
                ref={editorRef}
                contentEditable={!disabled}
                onInput={handleEditorChange}
                className={`min-h-[150px] p-4 focus:outline-none ${
                  error ? "border-red-500" : ""
                }`}
                style={{
                  outline: "none",
                  direction: "rtl",
                  textAlign: "right",
                  lineHeight: "1.8",
                  fontSize: "16px",
                }}
                suppressContentEditableWarning={true}
              />
              {!editorContent && !disabled && (
                <div className="absolute top-4 right-4 text-gray-400 pointer-events-none text-base select-none">
                  {placeholder}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowbiteTextEditor;
