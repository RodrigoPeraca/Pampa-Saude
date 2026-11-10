// src/components/FacilityList.js
// Componente de lista de cards de unidades de saúde

import React from 'react';
import FacilityCard from './FacilityCard.js';

export function FacilityList({ 
  filteredFacilities, 
  searchTerm, 
  setSearchTerm 
}) {
  return (
    <section className="cards-grid">
      {filteredFacilities.map((facility) => (
        <FacilityCard key={facility.id} facility={facility} />
      ))}

      {filteredFacilities.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma unidade encontrada com os filtros atuais.</p>
          <button type="button" onClick={() => setSearchTerm("")}>
            Limpar busca
          </button>
        </div>
      )}
    </section>
  );
}

export default FacilityList;