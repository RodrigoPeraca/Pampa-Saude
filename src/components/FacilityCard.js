// src/components/FacilityCard.js
// Componente de card para exibir informações de uma unidade de saúde

import React from 'react';
import { TYPE_LABELS } from '../data/constants.js';

export function FacilityCard({ facility }) {
  return (
    <article key={facility.id} className="facility-card">
      <header>
        <div>
          <p className="facility-type">{facility.type}</p>
          <h2>{facility.name}</h2>
          <p className="facility-neighborhood">
            {facility.neighborhood}
          </p>
        </div>
        <span className="facility-badge">
          {TYPE_LABELS[facility.type]}
        </span>
      </header>

      <div className="facility-info">
        <p>
          <strong>Endereço:</strong> {facility.address}
        </p>
        <p>
          <strong>Horário:</strong> {facility.hours}
        </p>
        <p>
          <strong>Telefone:</strong> {facility.phone}
        </p>
      </div>

      <div className="facility-services">
        {facility.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </div>

      <p className="facility-notes">{facility.notes}</p>

      <div className="facility-actions">
        <a
          href={facility.googleMaps}
          target="_blank"
          rel="noreferrer"
        >
          Ver no Maps
        </a>
        <a href={`tel:${facility.phone.replace(/\D/g, "")}`}>Ligar</a>
      </div>
    </article>
  );
}

export default FacilityCard;