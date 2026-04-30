// src/components/SearchPanel.js
// Componente de painel de busca e filtros

import React from 'react';
import { TYPE_LABELS } from '../data/constants.js';

export function SearchPanel({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType,
  filteredFacilities 
}) {
  return (
    <section className="panel search-panel">
      <label htmlFor="search">
        Busque por bairro, serviço ou unidade
      </label>
      <input
        id="search"
        type="text"
        placeholder="Ex.: vacinação, Damasceno, ESF..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="filters">
        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
        >
          <option value="all">Todas as tipologias</option>
          <option value="UBS">Unidades Básicas de Saúde</option>
          <option value="ESF">Estratégias Saúde da Família</option>
          <option value="CAPS">Centros de Atenção Psicossocial</option>
          <option value="SAIS">
            Serviços de Atenção Integral à Saúde
          </option>
          <option value="UPA">Unidades de Pronto Atendimento</option>
          <option value="Hospital">Hospitais</option>
          <option value="SAMU">
            Serviço de Atendimento Móvel de Urgência
          </option>
        </select>
        <button type="button" onClick={() => setFilterType("all")}>
          Limpar filtro
        </button>
      </div>
      <p className="panel-hint">
        Resultado mostra {filteredFacilities.length}{" "}
        {filteredFacilities.length === 1 ? "unidade" : "unidades"} •{" "}
        {TYPE_LABELS[filterType]}
      </p>
    </section>
  );
}

export default SearchPanel;