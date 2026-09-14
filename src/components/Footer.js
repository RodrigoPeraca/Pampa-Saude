// src/components/Footer.js
// Rodapé global do Pampa Saúde com link para Termos de Uso

import React from "react";

export function Footer({ setActivePage }) {
  return (
    <footer className="app-footer">
      <p>
        Pampa Saúde · Bagé/RS · Conexão direta com a Universidade Federal
        do Pampa e a Engenharia de Computação.
      </p>
      <p>
        Dados compilados para fins de consulta rápida. Confirme horários
        diretamente com a unidade.
      </p>
      <p className="app-footer-terms">
        <button
          type="button"
          className="app-footer-terms-link"
          onClick={() => setActivePage("termos")}
        >
          Termos de Uso e Privacidade
        </button>
      </p>
    </footer>
  );
}

export default Footer;
