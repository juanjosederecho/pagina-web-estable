import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

export function EditableText({
    initialText,
    onSave,
    isEditing,
    className = "",
    tag: Tag = "p",
    multiline = false
}) {
    const [text, setText] = useState(initialText);

    useEffect(() => {
        setText(initialText);
    }, [initialText]);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setText(newVal);
        onSave(newVal);
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    className={`w-full p-2 border border-blue-400 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                    value={text}
                    onChange={handleChange}
                    rows={4}
                />
            );
        }
        return (
            <input
                type="text"
                className={`w-full p-2 border border-blue-400 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                value={text}
                onChange={handleChange}
            />
        );
    }

    return (
        <Tag className={`relative group ${className}`}>
            {text}
        </Tag>
    );
}
