// src/hooks/useFacilities.js
// Hook personalizado para gerenciar a filtragem de unidades de saúde

import { useMemo } from 'react';
import { FACILITIES } from '../data/facilities.js';

/**
 * Hook para gerenciar a filtragem de unidades de saúde
 * @param {string} searchTerm - Termo de busca digitado pelo usuário
 * @param {string} filterType - Tipo de unidade selecionado no filtro
 * @returns {Object} Objeto com filteredFacilities, totalServices e hasFilter
 */
export function useFacilities(searchTerm, filterType) {
  // Calcula o total de serviços únicos disponíveis
  const totalServices = useMemo(() => {
    const pool = new Set();
    FACILITIES.forEach((facility) =>
      facility.services.forEach((service) => pool.add(service)),
    );
    return pool.size;
  }, []);

  // Filtra as unidades baseado no termo de busca e tipo selecionado
  const filteredFacilities = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return FACILITIES.filter((facility) => {
      // Verifica se o tipo da unidade corresponde ao filtro selecionado
      const matchType = filterType === "all" || facility.type === filterType;
      if (!matchType) return false;

      // Se não houver termo de busca, retorna todas as unidades do tipo
      if (!term) return true;

      // Cria um texto com todos os campos para busca
      const haystack = [
        facility.name,
        facility.neighborhood,
        facility.address,
        facility.type,
        facility.services.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [searchTerm, filterType]);

  // Verifica se há algum filtro ativo
  const hasFilter = searchTerm.trim() !== "" || filterType !== "all";

  return {
    filteredFacilities,
    totalServices,
    hasFilter,
  };
}

export default useFacilities;