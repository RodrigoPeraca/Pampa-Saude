// src/components/HealthCampaignsPage.js
// Componente da página de campanhas de saúde

import React from "react";
import { Calendar } from "lucide-react";
import { campaigns } from "../data/healthCampaigns.js";

// Componente da página de campanhas de saúde
export function HealthCampaignsPage({ setActivePage }) {
  return (
    <>
      <section className="about-hero">
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Campanhas de Saúde</h2>
        <p>Acompanhe as campanhas e ações de saúde pública em Bagé</p>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-list">
          {campaigns.map((c, idx) => (
            <div key={idx} className="ps-item">
              <div className={`ps-icon ${c.color}`}>
                <c.icon size={22} />
              </div>

              <div className="ps-content">
                <div className="ps-row">
                  <h3 className="ps-title">{c.title}</h3>
                  <span className="ps-chip">{c.status}</span>
                </div>
                <p className="ps-desc">{c.description}</p>
                <div className="ps-meta">
                  <Calendar size={16} />
                  <span>{c.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Como participar?</h3>
        <ol className="ps-steps">
          <li>Dirija-se à Unidade Básica de Saúde mais próxima</li>
          <li>Leve seu documento de identidade e cartão SUS</li>
          <li>Informe-se sobre os horários de atendimento de cada campanha</li>
        </ol>
      </section>
    </>
  );
}

export default HealthCampaignsPage;