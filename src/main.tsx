import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { AnimeGamePage } from './pages/AnimeGamePage'
import { ScrollToTop } from './components/ScrollToTop'
import { purgeOldLocalStorage } from './utils/dailySeed'
import './index.css'

// Executa limpeza preventiva de dados diários expirados do localStorage (> 7 dias)
purgeOldLocalStorage(7);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:animeSlug" element={<AnimeGamePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
