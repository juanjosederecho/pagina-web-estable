import React, { useState } from 'react';
import { EditableText } from './components/EditableText';
import { EditableImage } from './components/EditableImage';
import { Save, Edit2, Eye, RotateCcw, Share2, Loader2 } from 'lucide-react';
import { useSharedState } from './hooks/useSharedState';

const DEFAULT_STATE = {
  title: "Bienvenido a tu Página Editable",
  subtitle: "Haz clic en el botón de editar para cambiar este texto y las imágenes.",
  description: "Esta es una demostración de una página web donde puedes modificar el contenido directamente. En una versión real, estos cambios se guardarían en una base de datos para que todos pudieran verlos. Por ahora, se guardan en tu navegador.",
  heroImage: "https://images.unsplash.com/photo-1499750310159-5b5f38e31638?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  feature1Title: "Fácil de Usar",
  feature1Text: "Simplemente activa el modo edición y haz clic donde quieras cambiar algo.",
  feature2Title: "Persistencia",
  feature2Text: "Los cambios se guardan automáticamente para que no pierdas tu trabajo.",
  feature3Title: "Diseño Moderno",
  feature3Text: "Construido con las últimas tecnologías web para una experiencia fluida."
};

function App() {
  const [isEditing, setIsEditing] = useState(false);
  // Use "demo-page" as the document ID. In a real app, this could be dynamic (e.g. from URL)
  const [content, setContent, loading, error] = useSharedState("demo-page", DEFAULT_STATE);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Save to Firebase whenever content changes
  const updateContent = (key, value) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);

    // Show saved indicator briefly
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  const resetContent = () => {
    if (confirm("¿Estás seguro de que quieres restablecer todo el contenido al original?")) {
      setContent(DEFAULT_STATE);
    }
  };

  // No need for loading/error screens - hook handles fallback gracefully

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar / Controls */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight text-blue-600">
          Editable<span className="text-gray-800">Web</span>
        </div>

        <div className="flex items-center gap-4">
          {showSavedMsg && (
            <span className="text-green-600 text-sm font-medium animate-fade-in-out">
              ¡Guardado!
            </span>
          )}

          <button
            onClick={resetContent}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Restablecer contenido"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all shadow-sm ${isEditing
              ? 'bg-blue-600 text-white hover:bg-blue-700 ring-4 ring-blue-100'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            {isEditing ? (
              <>
                <Eye size={18} />
                <span>Ver Modo Vista</span>
              </>
            ) : (
              <>
                <Edit2 size={18} />
                <span>Editar Página</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <EditableText
              tag="h1"
              className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
              initialText={content.title}
              onSave={(val) => updateContent('title', val)}
              isEditing={isEditing}
            />
            <EditableText
              tag="p"
              className="text-xl text-gray-600 leading-relaxed"
              initialText={content.subtitle}
              onSave={(val) => updateContent('subtitle', val)}
              isEditing={isEditing}
            />
            <div className="pt-4">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Empezar Ahora
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2 opacity-70 blur-lg"></div>
            <EditableImage
              src={content.heroImage}
              onSave={(val) => updateContent('heroImage', val)}
              isEditing={isEditing}
              className="relative rounded-2xl shadow-2xl overflow-hidden aspect-[4/3]"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <EditableText
              tag="h2"
              className="text-3xl font-bold mb-4"
              initialText="¿Cómo funciona?"
              onSave={() => { }} // Static header for now, or make dynamic if wanted
              isEditing={false}
            />
            <EditableText
              tag="p"
              className="text-gray-600 text-lg"
              initialText={content.description}
              onSave={(val) => updateContent('description', val)}
              isEditing={isEditing}
              multiline={true}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <span className="font-bold text-xl">{num}</span>
                </div>
                <EditableText
                  tag="h3"
                  className="text-xl font-bold mb-2"
                  initialText={content[`feature${num}Title`]}
                  onSave={(val) => updateContent(`feature${num}Title`, val)}
                  isEditing={isEditing}
                />
                <EditableText
                  tag="p"
                  className="text-gray-600"
                  initialText={content[`feature${num}Text`]}
                  onSave={(val) => updateContent(`feature${num}Text`, val)}
                  isEditing={isEditing}
                  multiline={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>© {new Date().getFullYear()} EditableWeb. Creado para demostración.</p>
      </footer>
    </div>
  );
}

export default App;
