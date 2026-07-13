// src/components/ServicesPage.js
// Componente da página de serviços de saúde

import React from 'react';
import { TYPE_DESCRIPTIONS, TYPE_LABELS } from '../data/constants.js';

export function ServicesPage({ setFilterType, setActivePage }) {
  return (
    <section className="panel services-page">
      <button
        type="button"
        className="back-button"
        onClick={() => setActivePage("home")}
      >
        ← Voltar
      </button>

      <h2>Serviços de Saúde</h2>
      <p className="panel-hint">Escolha uma tipologia:</p>

      <div className="services-grid">
        {Object.entries(TYPE_LABELS)
          .filter(([type]) => type !== "all")
          .map(([type, label]) => (
            <button
              key={type}
              type="button"
              className="services-card"
              onClick={() => {
                setFilterType(type);
                setActivePage("home");
              }}
            >
              <span className="services-card-title">{label}</span>
              <span className="services-card-description">
                {TYPE_DESCRIPTIONS[type]}
              </span>
            </button>
          ))}

        <button
          type="button"
          className="services-card"
          onClick={() => {
            setFilterType("all");
            setActivePage("home");
          }}
        >
          <span className="services-card-title">Todas as unidades</span>
          <span className="services-card-description">
            {TYPE_DESCRIPTIONS.all}
          </span>
        </button>
      </div>
    </section>
  );
}

export default ServicesPage;