// src/components/FirstAidPage.js
// Componente da página de primeiros socorros

import React from "react";
import { AlertCircle } from "lucide-react";
import { emergencies } from "../data/firstAid.js";

// Componente da página de primeiros socorros

export function FirstAidPage({ setActivePage }) {
  return (
    <>
      <section className="about-hero">
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Primeiros Socorros</h2>
        <p>Informações básicas para situações de emergência</p>
      </section>

      <section className="about-card about-card-white ps-alert">
        <div className="ps-alert-row">
          <AlertCircle size={22} />
          <div>
            <h3>Atenção!</h3>
            <p>
              As informações aqui são orientações básicas. Em caso de emergência, ligue para o SAMU (192)
              ou procure atendimento médico especializado.
            </p>
            <div className="ps-alert-numbers">
              <p><strong>SAMU:</strong> 192</p>
              <p><strong>Bombeiros:</strong> 193</p>
              <p><strong>Polícia:</strong> 190</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Situações Comuns de Emergência</h3>

        <div className="ps-cards">
          {emergencies.map((e, idx) => (
            <div key={idx} className="ps-em-card">
              <h4>{e.title}</h4>
              <ol className="ps-steps">
                {e.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FirstAidPage;