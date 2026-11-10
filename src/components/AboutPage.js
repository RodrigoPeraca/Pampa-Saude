// src/components/AboutPage.js
// Componente da página "Sobre o Pampa Saúde"

import React from 'react';
import { MapPin, Users, Heart, Globe } from 'lucide-react';
import { INSTITUTION_LOGOS } from '../data/institutions.js';
import { DEVELOPERS } from '../data/developers.js';

export function AboutPage({ setActivePage }) {
  return (
    <>
      <section className="about-hero">
        <button
          type="button"
          className="back-button"
          onClick={() => setActivePage("home")}
        >
          ← Voltar
        </button>

        <h2>Sobre o Pampa Saúde</h2>
        <p>Conheça mais sobre o projeto</p>
      </section>

      <section className="about-card about-card-white">
        <div className="about-title-row">
          <span className="about-icon about-icon-blue">i</span>
          <h3>O que é o Pampa Saúde?</h3>
        </div>

        <p>
          <strong>Pampa Saúde</strong> é uma plataforma digital desenvolvida
          como iniciativa acadêmica do curso de Engenharia de Computação da
          Universidade Federal do Pampa (Unipampa), em parceria com a
          Secretaria Municipal de Saúde de Bagé - RS.
        </p>

        <p>
          O objetivo principal é facilitar o acesso da população às
          informações sobre as Unidades Básicas de Saúde (UBS), Estratégias
          Saúde da Família (ESF), entre outros, disponíveis no município,
          promovendo o cuidado territorial e a democratização do acesso à
          saúde pública.
        </p>
      </section>

      <section className="about-card about-card-green">
        <div className="about-title-row">
          <span className="about-icon about-icon-green">♡</span>
          <h3>Nossa Missão</h3>
        </div>

        <p>
          Apoiar a comunidade de Bagé com acesso rápido e intuitivo às
          unidades de atenção básica de saúde, fortalecendo o vínculo entre
          a população e o Sistema Único de Saúde (SUS).
        </p>
      </section>

      <section className="about-card about-card-white">
        <div className="about-title-row">
          <span className="about-icon about-icon-dark">👥</span>
          <h3>Parceiros Institucionais</h3>
        </div>

        <div className="partner-stack">
          {INSTITUTION_LOGOS.map((logo, index) => (
            <div
              key={logo.id}
              className={`partner-card ${
                index === 0 ? "partner-green" : "partner-yellow"
              }`}
            >
              <div className="partner-logo-box">
                <img src={logo.url} alt={logo.alt} loading="lazy" />
              </div>

              <div className="partner-content">
                <h4>{logo.name}</h4>
                <p>{logo.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-card about-card-white">
        <div className="about-title-row">
          <span className="about-icon about-icon-dark">👥</span>
          <h3>Equipe e Desenvolvedores</h3>
        </div>

        <div className="team-grid">
          {DEVELOPERS.map((person) => {
            const isHealthStaff = person.role
              .toLowerCase()
              .includes("saúde");

            return (
              <div
                key={person.name}
                className={`card ${isHealthStaff ? "health-card" : ""}`}
              >
                <h3 className="name">
                  {isHealthStaff ? "🏥 " : "👤 "}
                  {person.name}
                </h3>
                <p className="role">{person.role}</p>
                <p className="focus">
                  {isHealthStaff ? "🩺" : "💻"} {person.focus}
                </p>
                <a className="email" href={`mailto:${person.contact}`}>
                  📧 {person.contact}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Funcionalidades</h3>

        <div className="features-grid">
          <div className="feature-card">
            <h4>📍 Mapeamento de Unidades</h4>
            <p>Localização de todas as UBS e ESF</p>
          </div>

          <div className="feature-card">
            <h4>🔎 Busca por Serviços</h4>
            <p>Encontre o serviço que você precisa</p>
          </div>

          <div className="feature-card">
            <h4>📲 Telefones Úteis</h4>
            <p>Contatos de emergência e saúde</p>
          </div>

          <div className="feature-card">
            <h4>📚 Conteúdo Educativo</h4>
            <p>Informações sobre saúde e prevenção</p>
          </div>
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Dados do Projeto</h3>

        <div className="project-data">
          <div className="project-item">
            <MapPin className="project-icon" size={18} />
            <div>
              <strong>Localização</strong>
              <p>Bagé, Rio Grande do Sul · Brasil</p>
            </div>
          </div>

          <div className="project-item">
            <Users className="project-icon" size={18} />
            <div>
              <strong>Público-alvo</strong>
              <p>Comunidade de Bagé e região</p>
            </div>
          </div>

          <div className="project-item">
            <Heart className="project-icon" size={18} />
            <div>
              <strong>Cobertura</strong>
              <p>27 unidades catalogadas · 56 tipos de serviços</p>
            </div>
          </div>

          <div className="project-item">
            <Globe className="project-icon" size={18} />
            <div>
              <strong>Idiomas</strong>
              <p>Português, Español, English</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-card about-card-blue">
        <h3>Desenvolvimento Contínuo</h3>
        <p>
          O Pampa Saúde está em constante evolução, com atualizações
          regulares de informações e novas funcionalidades planejadas para
          melhor atender a comunidade.
        </p>
        <p>
          O projeto é uma iniciativa acadêmica sem fins lucrativos,
          desenvolvido por estudantes e professores da Unipampa com o
          objetivo de promover o acesso à informação em saúde.
        </p>
      </section>

      <footer className="app-footer">
        <p>
          Pampa Saúde · Bagé/RS · Conexão direta com a Universidade Federal
          do Pampa e a Engenharia de Computação.
        </p>
        <p>
          Dados compilados para fins de consulta rápida. Confirme horários
          diretamente com a unidade.
        </p>
      </footer>
    </>
  );
}

export default AboutPage;