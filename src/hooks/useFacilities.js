// src/hooks/useFacilities.js
// Hook personalizado para gerenciar a filtragem de unidades de saúde

import { useMemo } from 'react';
import { FACILITIES } from '../data/facilities.js';

/**
 * Função auxiliar para remover acentos e converter para minúsculas
 */
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Dicionário de sinônimos para facilitar a busca por termos relacionados
const SINONIMOS = [
  { termo: "dentista", equivalente: "saude bucal" },
  { termo: "odontologista", equivalente: "saude bucal" },
  { termo: "remedio", equivalente: "farmacia" },
  { termo: "farmacêutico", equivalente: "farmacia" },
  { termo: "psicologo", equivalente: "saude mental" },
  { termo: "psiquiatra", equivalente: "saude mental" },
  { termo: "fisioterapeuta", equivalente: "fisioterapia" },
];

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
    // Normaliza o que o usuário está digitando no momento
    const term = normalizeText(searchTerm.trim());

    return FACILITIES.filter((facility) => {
      // Verifica se o tipo da unidade corresponde ao filtro selecionado
      const matchType = filterType === "all" || facility.type === filterType;
      if (!matchType) return false;

      // Se não houver termo de busca, retorna todas as unidades do tipo
      if (!term) return true;

      // Encontra sinônimos equivalentes mesmo que o termo esteja incompleto (ex: "den", "dent")
      const equivalentes = SINONIMOS
        .filter((s) => s.termo.startsWith(term) || s.equivalente.includes(term))
        .map((s) => s.equivalente);

      // Cria a lista com o termo digitado + sinônimos parciais encontrados
      const termosParaBuscar = [term, ...equivalentes];

      // Cria um texto combinando todos os campos da unidade e normaliza
      const haystack = normalizeText([
        facility.name,
        facility.neighborhood,
        facility.address,
        facility.type,
        facility.services.join(" "),
      ].join(" "));

      // Retorna true se QUALQUER um dos termos equivalentes for encontrado
      return termosParaBuscar.some((t) => haystack.includes(t));
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