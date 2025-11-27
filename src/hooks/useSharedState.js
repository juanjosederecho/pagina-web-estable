import { useState, useEffect } from 'react';

// Check if Firebase is available
let firebaseAvailable = false;

export function useSharedState(docId, initialState) {
    const [state, setState] = useState(() => {
        // Try to load from localStorage on init
        try {
            const saved = localStorage.getItem(`editable-page-${docId}`);
            return saved ? JSON.parse(saved) : initialState;
        } catch (e) {
            return initialState;
        }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Try to initialize Firebase if available
        const initFirebase = async () => {
            try {
                const { db } = await import('../lib/firebase');
                const { doc, onSnapshot, setDoc } = await import('firebase/firestore');

                // Subscribe to real-time updates
                const unsubscribe = onSnapshot(
                    doc(db, "pages", docId),
                    (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            setState(docSnapshot.data());
                        } else {
                            setDoc(doc(db, "pages", docId), state);
                        }
                        setLoading(false);
                    },
                    (err) => {
                        console.warn("Firebase error, falling back to LocalStorage:", err.message);
                        setLoading(false);
                    }
                );

                firebaseAvailable = true;
                return unsubscribe;
            } catch (err) {
                console.warn("Firebase not configured, using LocalStorage:", err.message);
                firebaseAvailable = false;
                setLoading(false);
            }
        };

        initFirebase();
    }, [docId]);

    const updateState = async (newState) => {
        // Optimistic update
        setState(newState);

        // Always save to LocalStorage as backup
        try {
            localStorage.setItem(`editable-page-${docId}`, JSON.stringify(newState));
        } catch (err) {
            console.error("Error saving to LocalStorage:", err);
        }

        // Try to save to Firebase if available
        if (firebaseAvailable) {
            try {
                const { db } = await import('../lib/firebase');
                const { doc, setDoc } = await import('firebase/firestore');
                await setDoc(doc(db, "pages", docId), newState, { merge: true });
            } catch (err) {
                console.warn("Could not save to Firebase:", err.message);
            }
        }
    };

    return [state, updateState, loading, null];
}
