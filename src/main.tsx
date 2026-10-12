import React from 'react';
import { createRoot } from 'react-dom/client';
import { usePwaUpdates } from './hooks/usePwaUpdates';
import { QuickPractice } from './features/quick-practice/QuickPractice';
import 'katex/dist/katex.min.css';
import './style.css';

function App() {
  const { updateAvailable, updateServiceWorker } = usePwaUpdates();
  return <QuickPractice updateAvailable={updateAvailable} onUpdate={() => void updateServiceWorker(true)} />;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
