import React, { useState } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Table,
  Minus, Link, Image, Type, Palette, Heading
} from 'lucide-react';

interface RichTextToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough: () => void;
  onHeading: (level: number) => void;
  onFontSize: (size: string) => void;
  onTextColor: (color: string) => void;
  onBackgroundColor: (color: string) => void;
  onAlignLeft: () => void;
  onAlignCenter: () => void;
  onAlignRight: () => void;
  onAlignJustify: () => void;
  onBulletList: () => void;
  onNumberedList: () => void;
  onQuote: () => void;
  onCode: () => void;
  onTable: () => void;
  onHorizontalRule: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  editorRef?: React.RefObject<HTMLDivElement>;
}

const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  onBold, onItalic, onUnderline, onStrikethrough,
  onHeading, onFontSize, onTextColor, onBackgroundColor,
  onAlignLeft, onAlignCenter, onAlignRight, onAlignJustify,
  onBulletList, onNumberedList, onQuote, onCode,
  onTable, onHorizontalRule, onInsertLink, onInsertImage,
  editorRef
}) => {
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#000000');

  const executeEditorCommand = (command: string, value?: string) => {
    if (editorRef?.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    executeEditorCommand('foreColor', color);
    onTextColor(color);
  };

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
    executeEditorCommand('backColor', color);
    onBackgroundColor(color);
  };
  return (
    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-3">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onBold}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="عريض"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={onItalic}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="مائل"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={onUnderline}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="تحته خط"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            onClick={onStrikethrough}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="يتوسطه خط"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <Heading className="w-4 h-4 text-gray-500 mr-1" />
          <select
            onChange={(e) => onHeading(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500"
            defaultValue="0"
          >
            <option value="0">نص عادي</option>
            <option value="1">عنوان 1</option>
            <option value="2">عنوان 2</option>
            <option value="3">عنوان 3</option>
          </select>
        </div>
        
        <div className="flex items-center gap-1">
          <Type className="w-4 h-4 text-gray-500 mr-1" />
          <select
            onChange={(e) => onFontSize(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500"
            defaultValue="16px"
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="relative">
            <input
              type="color"
              value={textColor}
              onChange={(e) => handleTextColorChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="لون النص"
              id="textColor"
            />
            <label htmlFor="textColor" className="flex items-center justify-center w-8 h-8 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Type className="w-4 h-4" style={{color: textColor}} />
            </label>
          </div>
          <div className="relative">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => handleBgColorChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="لون الخلفية"
              id="bgColor"
            />
            <label htmlFor="bgColor" className="flex items-center justify-center w-8 h-8 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Palette className="w-4 h-4" style={{color: bgColor}} />
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onAlignRight}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="محاذاة يمين"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            onClick={onAlignCenter}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="محاذاة وسط"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={onAlignLeft}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="محاذاة يسار"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onAlignJustify}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="ضبط"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onBulletList}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="قائمة نقطية"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={onNumberedList}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="قائمة مرقمة"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onQuote}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="اقتباس"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={onCode}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="كود"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={onTable}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="جدول"
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={onHorizontalRule}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="خط أفقي"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onInsertLink}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="إدراج رابط"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            onClick={onInsertImage}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            title="إدراج صورة"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextToolbar;