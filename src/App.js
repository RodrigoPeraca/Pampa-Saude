// src/App.js
// Componente principal do aplicativo Pampa Saúde

import React, { useState } from "react";
import "./App.css";

// Imports dos dados
// (InstitutionLogos usado indiretamente via componente)

// Imports dos componentes
import { Header } from "./components/Header.js";
import { SearchPanel } from "./components/SearchPanel.js";
import { FacilityList } from "./components/FacilityList.js";
import { ServicesPage } from "./components/ServicesPage.js";
import { AboutPage } from "./components/AboutPage.js";
import { InfoTabs } from "./components/InfoTabs.js";
import { InstitutionLogos } from "./components/InstitutionLogos.js";
import { ForeignersPage } from "./components/ForeignersPage.js";

// Imports do hook
import { useFacilities } from "./hooks/useFacilities.js";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeInfoTab, setActiveInfoTab] = useState("devs");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home"); // 'home' | 'servicos' |'sobre'|'foreigners'

  // Hook personalizado para filtragem
  const { filteredFacilities, totalServices, hasFilter } = useFacilities(
    searchTerm,
    filterType
  );

  return (
    <div className="app-shell">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
        totalServices={totalServices}
      />

      {activePage === "servicos" ? (
        <ServicesPage
          setFilterType={setFilterType}
          setActivePage={setActivePage}
        />
        ) : activePage === "foreigners" ? (
        <ForeignersPage setActivePage={setActivePage} />
      ) : activePage === "sobre" ? (
        <AboutPage setActivePage={setActivePage} />
      
      ) : (
        <>
          <SearchPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filteredFacilities={filteredFacilities}
          />

          <FacilityList
            filteredFacilities={filteredFacilities}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <InstitutionLogos />
          
          <InfoTabs
            activeInfoTab={activeInfoTab}
            setActiveInfoTab={setActiveInfoTab}
          />

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
      )}
    </div>
  );
}

export default App;
