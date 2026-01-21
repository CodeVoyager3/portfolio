'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
    Bold, Italic, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Code, Link as LinkIcon,
    Image as ImageIcon, Undo, Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

const lowlight = createLowlight(common);

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900 sticky top-0 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Heading3 className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('orderedList') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <ListOrdered className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('blockquote') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Quote className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('codeBlock') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
                type="button"
            >
                <Code className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button onClick={setLink} className={cn("p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer", editor.isActive('link') ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')} type="button">
                <LinkIcon className="w-4 h-4" />
            </button>
            <button onClick={addImage} className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer" type="button">
                <ImageIcon className="w-4 h-4" />
            </button>

            <div className="flex-1" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors disabled:opacity-50 cursor-pointer"
                type="button"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors disabled:opacity-50 cursor-pointer"
                type="button"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
};

export function TiptapEditor({ content, onChange, editable = true }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // We use CodeBlockLowlight instead
            }),
            Image,
            Link.configure({
                openOnClick: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none min-h-[500px] h-full',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
