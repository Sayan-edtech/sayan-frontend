// components/RichTextEditor.tsx
import React, { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

type MenuBarProps = {
  editor: Editor | null;
};

type RichTextEditorProps = {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
  minHeight?: string;
  disabled?: boolean;
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        className={`px-3 py-1 rounded text-sm font-medium ${
          editor.isActive("bold")
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } border border-gray-300`}
        type="button"
      >
        Bold
      </button>
      <button
        onClick={() => {
          console.log(
            "Italic button clicked, current state:",
            editor.isActive("italic")
          );
          editor.chain().focus().toggleItalic().run();
          console.log("After toggle, italic state:", editor.isActive("italic"));
          console.log("Current HTML:", editor.getHTML());
        }}
        className={`px-3 py-1 rounded text-sm font-medium ${
          editor.isActive("italic")
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } border border-gray-300`}
        type="button"
      >
        Italic
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`px-3 py-1 rounded text-sm font-medium ${
          editor.isActive("bulletList")
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } border border-gray-300`}
        type="button"
      >
        Bullet List
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`px-3 py-1 rounded text-sm font-medium ${
          editor.isActive("orderedList")
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } border border-gray-300`}
        type="button"
      >
        Numbered List
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
        className={`px-3 py-1 rounded text-sm font-medium ${
          editor.isActive("underline")
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } border border-gray-300`}
        type="button"
      >
        Underline
      </button>
      <div className="flex items-center gap-1">
        <label className="text-sm text-gray-600">Color:</label>
        <input
          type="color"
          value={editor.getAttributes("textStyle").color || "#000000"}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = "",
  onChange,
  className = "",
  minHeight = "200px",
  disabled = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the extensions we want to configure manually
        bold: false,
        italic: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic",
          style: "font-style: italic !important;",
        },
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: "bullet-list",
        },
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: "ordered-list",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
          style: "text-decoration: underline !important;",
        },
      }),
      TextStyle.configure({
        HTMLAttributes: {
          class: "text-style",
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content: content,
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[120px] p-2 text-right leading-relaxed text-gray-900 text-sm font-normal",
        dir: "rtl",
        style: "text-align: right;",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-t-lg mb-0"></div>
        <div
          className="border border-gray-200 rounded-b-lg p-4"
          style={{ minHeight }}
        >
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      <style>{`
        .ProseMirror em,
        .ProseMirror .italic,
        .ProseMirror i {
          font-style: italic !important;
          transform: skew(-10deg) !important;
        }
        .ProseMirror em *,
        .ProseMirror .italic *,
        .ProseMirror i * {
          font-style: italic !important;
        }
      `}</style>
      <MenuBar editor={editor} />
      <div
        className={`p-4 ${disabled ? "bg-gray-50" : "bg-white"} rounded-b-lg`}
        style={{ minHeight }}
      >
        <EditorContent
          editor={editor}
          placeholder="Start typing..."
          className="w-full h-8 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:p-0 [&_.ProseMirror]:text-right [&_.ProseMirror]:leading-relaxed [&_.ProseMirror]:text-gray-900 [&_.ProseMirror]:text-sm [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:mr-5 [&_.ProseMirror_ul]:my-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:mr-5 [&_.ProseMirror_ol]:my-2 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_li]:mr-0 [&_.ProseMirror_strong]:font-bold [&_.ProseMirror_em]:[font-style:italic!important] [&_.ProseMirror_.italic]:[font-style:italic!important] [&_.ProseMirror_i]:[font-style:italic!important] [&_.ProseMirror_p]:my-1"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
