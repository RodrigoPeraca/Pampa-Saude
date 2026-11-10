// src/components/InstitutionLogos.js
// Componente de logos de instituições parceiras

import React from 'react';
import { INSTITUTION_LOGOS } from '../data/institutions.js';

export function InstitutionLogos() {
  return (
    <section className="panel institution-logos">
      <div className="tab-content">
        <div className="container">
          <h3>Parceiros institucionais</h3>
          <div className="team-grid">
            {INSTITUTION_LOGOS.map((logo) => (
              <div key={logo.id} className="card">
                <img src={logo.url} alt={logo.alt} loading="lazy" />
                <p className="name">{logo.name}</p>
                <p className="role">{logo.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstitutionLogos;