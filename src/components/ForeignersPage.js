//file: src/components/ForeignersPage.js
// Componente da página de informações para estrangeiros
import React from "react";
import { Globe, FileText, Phone } from "lucide-react";

export function ForeignersPage({ setActivePage }) {
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

        <h2>Extranjeros - Foreigners</h2>
        <p>
          Información de salud para extranjeros · Health information for
          foreigners
        </p>
      </section>

      <section className="about-card about-card-white">
        <div className="foreigners-title">
          <div className="foreigners-icon foreigners-icon-blue">
            <Globe size={22} />
          </div>
          <h3>Atendimento para Estrangeiros</h3>
        </div>

        <p>
          O Sistema Único de Saúde (SUS) atende estrangeiros residentes no
          Brasil e também visitantes em situações de urgência e emergência.
        </p>

        <p className="foreigners-italic">
          <strong>Español:</strong> El Sistema Único de Salud (SUS) atiende a
          extranjeros residentes en Brasil y también a visitantes en situaciones
          de urgencia y emergencia.
        </p>

        <p className="foreigners-italic">
          <strong>English:</strong> The Unified Health System (SUS) serves
          foreigners residing in Brazil and also visitors in urgent and
          emergency situations.
        </p>
      </section>

      <section className="about-card about-card-white">
        <div className="foreigners-section-title">
          <FileText size={18} />
          <h3>Documentos Necessários / Required Documents</h3>
        </div>

        <div className="foreigners-grid">
          <div className="foreigners-box">
            <h4>🇧🇷 Português</h4>
            <ul>
              <li>Documento de identidade (passaporte ou RNE)</li>
              <li>Comprovante de residência (se houver)</li>
              <li>CPF (se houver)</li>
            </ul>
          </div>

          <div className="foreigners-box">
            <h4>🇪🇸 Español</h4>
            <ul>
              <li>Documento de identidad (pasaporte o RNE)</li>
              <li>Comprobante de domicilio (si tiene)</li>
              <li>CPF (si tiene)</li>
            </ul>
          </div>

          <div className="foreigners-box">
            <h4>🇬🇧 English</h4>
            <ul>
              <li>Identity document (passport or RNE)</li>
              <li>Proof of residence (if available)</li>
              <li>CPF - Brazilian tax number (if available)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Serviços Disponíveis / Available Services</h3>

        <div className="foreigners-services">
          <div className="foreigners-service">
            <span className="dot" />
            <div>
              <p className="title">Consultas médicas / Medical appointments</p>
              <p className="desc">
                Atendimento em todas as UBS / Service at all Basic Health Units
              </p>
            </div>
          </div>

          <div className="foreigners-service">
            <span className="dot" />
            <div>
              <p className="title">Vacinação / Vaccination</p>
              <p className="desc">
                Calendário completo de vacinas / Complete vaccination schedule
              </p>
            </div>
          </div>

          <div className="foreigners-service">
            <span className="dot" />
            <div>
              <p className="title">
                Urgências e Emergências / Urgent and Emergency care
              </p>
              <p className="desc">Atendimento 24 horas / 24-hour service</p>
            </div>
          </div>

          <div className="foreigners-service">
            <span className="dot" />
            <div>
              <p className="title">Medicamentos / Medicines</p>
              <p className="desc">Distribuição gratuita / Free distribution</p>
            </div>
          </div>
        </div>

        <div className="foreigners-warning">
          <div className="foreigners-warning-title">
            <Phone size={18} />
            <h4>Emergência / Emergency / Emergencia</h4>
          </div>
          <p>
            <strong>SAMU (Ambulância): 192</strong> 
          </p>
          <p>
            <strong>Bombeiros / Fire Department: 193</strong> 
          </p>
          <p>
            <strong>Polícia / Police: 190 </strong> 
          </p>
        </div>
      </section>
    </>
  );
}

export default ForeignersPage;
