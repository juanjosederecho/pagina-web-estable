import React, { useState } from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';

export function EditableImage({ src, onSave, isEditing, className = "", alt = "Image" }) {
    const [showInput, setShowInput] = useState(false);
    const [tempUrl, setTempUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onSave(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (tempUrl) {
            onSave(tempUrl);
            setShowInput(false);
        }
    };

    return (
        <div className={`relative group ${className}`}>
            <img
                src={src || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                alt={alt}
                className={`w-full h-full object-cover rounded-lg transition-opacity ${isEditing ? 'opacity-80' : ''}`}
            />

            {isEditing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-4 mb-4">
                        <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors">
                            <Upload size={18} />
                            <span>Subir Foto</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <button
                            onClick={() => setShowInput(!showInput)}
                            className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                            <LinkIcon size={18} />
                            <span>URL</span>
                        </button>
                    </div>

                    {showInput && (
                        <form onSubmit={handleUrlSubmit} className="bg-white p-2 rounded-lg flex gap-2 shadow-lg">
                            <input
                                type="text"
                                placeholder="https://..."
                                className="border rounded px-2 py-1 text-sm w-48"
                                value={tempUrl}
                                onChange={(e) => setTempUrl(e.target.value)}
                            />
                            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">OK</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
