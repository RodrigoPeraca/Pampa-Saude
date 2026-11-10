// src/components/UsefulPhonesPage.js
// Componente da página de telefones úteis

import React from "react";
import { AlertCircle, Phone } from "lucide-react";
import { emergencyNumbers } from "../data/usefulPhones.js";

// Componente da página de telefones úteis
export function UsefulPhonesPage({ setActivePage }) {
  return (
    <>
      <section className="about-hero">
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Telefones Úteis</h2>
        <p>Contatos importantes de saúde em Bagé</p>
      </section>

      <section className="about-card about-card-white ps-emergency">
        <div className="ps-emergency-title">
          <AlertCircle size={20} />
          <h3>Emergências</h3>
        </div>
        <p className="ps-emergency-sub">
          Em caso de emergência, ligue imediatamente para um dos números abaixo:
        </p>

        <div className="ps-em-grid">
          {emergencyNumbers.map((e, idx) => (
            <div key={idx} className="ps-em-box">
              <div className={`ps-em-badge ${e.color}`} />
              <div className="ps-em-number">{e.number}</div>
              <div className="ps-em-name">{e.name}</div>
              <div className="ps-em-desc">{e.description}</div>
              <div className="facility-actions ps-em-actions">
                <a href={`tel:${e.number.replace(/\D/g, "")}`}>
                  <Phone size={16} />
                  Ligar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default UsefulPhonesPage;