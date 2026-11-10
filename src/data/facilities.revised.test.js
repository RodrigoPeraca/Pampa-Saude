import React from 'react';
import { render, screen } from '@testing-library/react';
import { FACILITIES } from './facilities';
import { TYPE_LABELS } from './constants';
import FacilityCard from '../components/FacilityCard';
const find = id => FACILITIES.find(row => row.id === id);

test('mantém um cadastro por unidade e tipologias compatíveis com os filtros', () => {
  expect(FACILITIES).toHaveLength(43);
  expect(new Set(FACILITIES.map(row => row.id)).size).toBe(43);
  expect(new Set(FACILITIES.map(row => row.name)).size).toBe(43);
  FACILITIES.forEach(row => {
    expect(TYPE_LABELS[row.type]).toBeDefined();
    expect(Array.isArray(row.services)).toBe(true);
    expect(row.primaryPhone).toMatch(/^(?:192|\d{10,11})$/);
    expect(row.hours).not.toMatch(/,,|12hàs|deve prevalecer no app/);
    expect(decodeURIComponent(row.googleMaps.split('query=')[1])).toBe(row.address);
  });
});

test('aplica contatos e endereços da segunda lista, mantendo os serviços detalhados', () => {
  expect(find('UBS-ESF-Centro-Social-Urbano').phone).toBe('(53) 3241-2651');
  expect(find('UBS-ESF-Dame').address).toContain('Rua 93');
  expect(find('UBS-ESF-Arvorezinha').neighborhood).toBe('Vicente Gallo Sobrinho');
  expect(find('UBS-ESF-Arvorezinha').services).toContain('Ginecologia');
  expect(find('Centro-de-Saude-Camilo-Gomes').services).toContain('Nutricionista Infantil e gestante');
  expect(find('Servico-de-Tuberculose').hours).toBe('Segunda a sexta');
  expect(find('Servico-de-Tuberculose').notes).toMatch(/Confirme/);
});

test('inclui os três cadastros e não concatena números no botão de ligar', () => {
  const upa = find('UPA-Padre-Honorino-Joao-Muraro');
  expect(upa.address).toContain('937');
  expect(upa.hours).toBe('24 horas, 7 dias por semana');
  expect(find('Hospital-Universitario-Dr-Mario-Araujo').phone).toBe('(53) 3242-7433');
  expect(find('Unidade-Acolhimento-Adulto').hours).toBe('24 horas, 7 dias por semana');
  render(<FacilityCard facility={upa} />);
  expect(screen.getByRole('link', {name:'Ligar'})).toHaveAttribute('href','tel:5332475732');
  expect(screen.getByText('(53) 3247-5732 / (53) 3247-5734')).toBeInTheDocument();
});
