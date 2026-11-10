// src/components/InfoTabs.js
// Componente de abas de informação (Desenvolvedores e Unipampa)

import React from 'react';
import { TAB_CONTENT } from '../data/constants.js';
import { DEVELOPERS } from '../data/developers.js';

export function InfoTabs({ activeInfoTab, setActiveInfoTab }) {
  return (
    <section className="panel info-tabs">
      <div className="tab-controls">
        <button
          className={activeInfoTab === "devs" ? "active" : ""}
          onClick={() => setActiveInfoTab("devs")}
        >
          Desenvolvedores
        </button>

        <button
          className={activeInfoTab === "unipampa" ? "active" : ""}
          onClick={() => setActiveInfoTab("unipampa")}
        >
          Unipampa
        </button>
      </div>

      <div className="tab-content">
        <h3>{TAB_CONTENT[activeInfoTab].title}</h3>
        <p>{TAB_CONTENT[activeInfoTab].description}</p>

        {activeInfoTab === "devs" && (
          <div className="container">
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
                    <a
                      className="email"
                      href={`mailto:${person.contact}`}
                    >
                      📧 {person.contact}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeInfoTab === "unipampa" && (
          <div>
            <ul className="unipampa-list">
              <li>
                <strong>Campus Bagé:</strong> Desenvolvimento de soluções tecnológicas por estudantes e pesquisadores, com foco em sistemas aplicados ao SUS e inovação em saúde digital.
              </li>
              <li>
                <strong>Observatório Pampa Saúde:</strong> Coleta e análise de dados estratégicos para apoiar decisões, monitorar indicadores e melhorar a eficiência das equipes de saúde.
              </li>
              <li>
                <strong>Prefeitura Municipal:</strong> Integração com dados oficiais, serviços públicos e campanhas, garantindo acesso a informações atualizadas e confiáveis.
              </li>
            </ul>
            <p className="unipampa-footer">
              Conectando dados, tecnologia e políticas públicas para transformar a saúde em Bagé.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default InfoTabs;