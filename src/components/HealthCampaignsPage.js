// src/components/HealthCampaignsPage.js
import React, { useState } from "react";
import { Calendar, MapPin, Map, X } from "lucide-react";
import { campaigns } from "../data/healthCampaigns.js";

export function HealthCampaignsPage({ setActivePage }) {
  // Estado que guarda qual campanha foi clicada
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  return (
    <>
      <section className="about-hero">
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Campanhas de Saúde</h2>
        <p>Acompanhe as campanhas e ações de saúde pública</p>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-list">
          {campaigns.map((c) => (
            <div 
              key={c.id} 
              className="ps-item" 
              onClick={() => setSelectedCampaign(c)} // Abre o pop-up
              style={{ cursor: 'pointer', transition: 'background 0.2s' }}
            >
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

      {/* JANELA POP-UP (MODAL)*/}
      {selectedCampaign && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro semi-transparente
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // Garante que o pop-up fique por cima de TUDO no site
          padding: '1rem',
          boxSizing: 'border-box'
        }}>
          
          {/* Caixa Branca Centralizada do Pop-up */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto', 
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>

            <button 
              onClick={() => setSelectedCampaign(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <X size={20} color="#0b3b2e" />
            </button>

            {/* Conteúdo do Pop-up */}
            <img 
              src={selectedCampaign.imageUrl} 
              alt={selectedCampaign.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
            />
            
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ color: '#0b3b2e', marginBottom: '1rem', fontSize: '1.5rem', marginTop: 0 }}>
                {selectedCampaign.title}
              </h2>
              
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4d6b63', marginBottom: '1.5rem' }}>
                {selectedCampaign.fullDescription}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#f1fbff', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0b3b2e' }}>
                  <Calendar size={18} /> <strong>Data:</strong> {selectedCampaign.date}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0b3b2e' }}>
                  <MapPin size={18} style={{ minWidth: '18px' }} /> <strong>Local:</strong> {selectedCampaign.location}
                </div>

                {selectedCampaign.mapsLink && (
                  <a 
                    href={selectedCampaign.mapsLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', backgroundColor: '#0b3b2e', color: 'white', padding: '0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    <Map size={18} /> Ver no Mapa
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HealthCampaignsPage;