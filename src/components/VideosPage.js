// src/components/VideosPage.js
// Componente da página de vídeos educativos

import React from "react";
import { Video, Play, Clock } from "lucide-react";
import { videos } from "../data/videos.js";

export function VideosPage({ setActivePage }) {
  return (
    <>
      <section className="about-hero">
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Vídeos educativos</h2>
        <p>Conteúdo educativo em vídeo sobre saúde e prevenção</p>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-section-title">
          <div className="ps-icon red">
            <Video size={22} />
          </div>
          <div>
            <h3>Videoteca de Saúde</h3>
            <p className="ps-muted">Assista e aprenda sobre diversos temas</p>
          </div>
        </div>

        <select className="ps-select">
          <option>Todas as categorias</option>
          <option>Tutorial</option>
          <option>Prevenção</option>
          <option>Higiene</option>
        </select>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-video-grid">
          {videos.map((v, idx) => (
            <div key={idx} className="ps-video-card">
              <div className="ps-video-thumb">
                <div className="ps-play">
                  <Play size={22} />
                </div>
                <div className="ps-duration">
                  <Clock size={12} />
                  <span>{v.duration}</span>
                </div>
              </div>

              <div className="ps-video-body">
                <span className="ps-chip">{v.category}</span>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default VideosPage;