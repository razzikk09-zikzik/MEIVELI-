// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState('ta'); // தமிழ் active by default

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        <div className="main-content">
          <TopBar language={language} onLanguageToggle={setLanguage} />
          <main className="page-scroll">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
