// src/components/Header.js
// Componente de cabeçalho (hero) do aplicativo

import React from 'react';
import { Menu, X, Home, Hospital, Info } from 'lucide-react';
import { FACILITIES } from '../data/facilities.js';

// Função auxiliar para contar serviços únicos
const getTotalServices = () => {
  const pool = new Set();
  FACILITIES.forEach((facility) =>
    facility.services.forEach((service) => pool.add(service)),
  );
  return pool.size;
};

export function Header({ 
  isMenuOpen, 
  setIsMenuOpen, 
  activePage, 
  setActivePage, 
  setSearchTerm, 
  setFilterType,
  totalServices 
}) {
  const handleNavClick = (page) => {
    setActivePage(page);
    if (page === 'home') {
      setSearchTerm('');
      setFilterType('all');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="hero">
      <div className="hero-topbar">
        <button
          type="button"
          className="menu-button"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hero-title"></div>
        <div className="menu-spacer" />
      </div>

      <div
        className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`side-menu ${isMenuOpen ? "open" : ""}`}
        aria-label="Menu principal"
      >
        <div className="side-menu-header">
          <button
            type="button"
            className="side-menu-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
          <h2>Pampa Saúde</h2>
          <p>Bagé · RS</p>
        </div>

        <nav className="side-menu-nav">
          <a
            href="#Inicio"
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} />
            <span>Inicio</span>
          </a>
          <a
            href="#unidades"
            onClick={() => handleNavClick('servicos')}
          >
            <Hospital size={18} />
            <span>Serviços de Saúde</span>
          </a>
          <a
            href="#sobre"
            onClick={() => handleNavClick('sobre')}
          >
            <Info size={18} />
            <span>Sobre o Pampa Saúde</span>
          </a>
        </nav>
      </aside>

      <div className="hero-content">
        <p className="hero-badge">Pampa Saúde · Bagé · RS</p>
        <h1>Pampa Saúde</h1>
        <p className="hero-subtitle">
          Guia rápido das Unidades Básicas de Saúde e Estratégias Saúde da
          Família em Bagé. Projeto inspirado pela comunidade da Unipampa e
          pelo curso de Engenharia de Computação.
        </p>
        <div className="hero-tags">
          <span>Unipampa</span>
          <span>Engenharia de Computação</span>
          <span>Cuidado Territorial</span>
        </div>
      </div>

      <div className="hero-stats">
        <div>
          <strong>{FACILITIES.length}</strong>
          <span>Unidades catalogadas</span>
        </div>
        <div>
          <strong>{totalServices}</strong>
          <span>Tipos de serviços</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Atendimento SUS</span>
        </div>
      </div>
    </header>
  );
}

export default Header;