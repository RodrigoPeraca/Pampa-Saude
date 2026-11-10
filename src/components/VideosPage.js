// src/components/VideosPage.js
// Componente da página de vídeos educativos

import React from "react";
import { Video } from "lucide-react";
import { videos } from "../data/videos.js";
import {useState} from "react";

export function VideosPage({ setActivePage }) {
  const [selectedCategory, setSelectedCategory] = useState("Todas as categorias");
  const filteredVideos = selectedCategory === "Todas as categorias"
    ? videos
    : videos.filter(v => v.category === selectedCategory);
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
        <select className="ps-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="Todas as categorias">Todas as categorias</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Prevenção">Prevenção</option>
          <option value="Higiene">Higiene</option>
          <option value="Nutrição">Nutrição</option>
          <option value="Bem-estar">Bem-estar</option>
        </select>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-video-grid">
          {filteredVideos.map((v, idx) => (
            <div key={v.youtubeId} className="ps-video-card">
              <div className="ps-video-embed">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
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
