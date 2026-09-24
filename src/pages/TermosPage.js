// src/pages/TermosPage.js
// Página de Termos de Uso e Política de Privacidade do Pampa Saúde

import React from "react";
import "./TermosPage.css";

export function TermosPage({ setActivePage }) {
  return (
    <>
      <section className="termos-hero">
        <button
          type="button"
          className="back-button"
          onClick={() => setActivePage("home")}
        >
          ← Voltar
        </button>
        <h2>Termos de Uso e Privacidade</h2>
        <p>Versão 1.0 · Setembro de 2026</p>
      </section>

      <div className="termos-container">

        {/* 1. Apresentação */}
        <section className="termos-section">
          <h3 className="termos-title">1. Apresentação</h3>
          <p>
            O <strong>Pampa Saúde</strong> é uma aplicação web progressiva (PWA)
            de caráter acadêmico, desenvolvida pelo curso de Engenharia de
            Computação da Universidade Federal do Pampa (Unipampa), campus
            Bagé/RS, com apoio da Secretaria Municipal de Saúde de Bagé. A
            plataforma tem como objetivo centralizar informações sobre a rede de
            atenção primária à saúde do município.
          </p>
          <p>
            Ao acessar, utilizar ou instalar o Pampa Saúde, o usuário declara
            que leu, compreendeu e concorda com os presentes Termos de Uso e
            Política de Privacidade.
          </p>
        </section>

        {/* 2. Natureza */}
        <section className="termos-section">
          <h3 className="termos-title">2. Natureza do Serviço</h3>
          <p>
            O Pampa Saúde é uma ferramenta de apoio informativo e{" "}
            <strong>não substitui</strong> orientação médica, diagnóstico
            clínico ou atendimento presencial nas unidades de saúde. As
            informações têm caráter meramente consultivo e foram coletadas a
            partir de fontes oficiais da Secretaria Municipal de Saúde de Bagé.
          </p>
          <p>
            O aplicativo é disponibilizado <strong>gratuitamente</strong>, sem
            fins lucrativos, e não está vinculado a qualquer plano de
            monetização, publicidade ou comercialização de dados.
          </p>
        </section>

        {/* 3. Dados */}
        <section className="termos-section">
          <h3 className="termos-title">3. Dados Coletados e Privacidade</h3>

          <div className="termos-destaque termos-destaque-verde">
            <span className="termos-destaque-icon">✓</span>
            <div>
              <strong>O Pampa Saúde NÃO coleta dados pessoais.</strong>
              <p>
                Não armazenamos nome, CPF, e-mail, telefone, localização,
                histórico médico, dados de navegação ou qualquer informação
                que identifique o usuário.
              </p>
            </div>
          </div>

          <h4 className="termos-subtitle">
            O único dado armazenado: token de notificação
          </h4>
          <p>
            A única informação técnica armazenada é o{" "}
            <strong>token de notificação push</strong> gerado pelo Firebase
            Cloud Messaging (FCM), caso o usuário conceda permissão para
            receber notificações.
          </p>

          <div className="termos-info-grid">
            <div className="termos-info-card">
              <span className="termos-info-label">O que é o token</span>
              <p>
                Um identificador técnico anônimo, gerado automaticamente pelo
                sistema operacional. Não contém nenhum dado pessoal.
              </p>
            </div>
            <div className="termos-info-card">
              <span className="termos-info-label">Para que é usado</span>
              <p>
                Exclusivamente para enviar notificações institucionais como
                campanhas de vacinação, alertas e comunicados da Secretaria
                de Saúde.
              </p>
            </div>
            <div className="termos-info-card">
              <span className="termos-info-label">Onde é armazenado</span>
              <p>
                No banco de dados Firebase Firestore, em ambiente seguro
                gerenciado pelo Google.
              </p>
            </div>
            <div className="termos-info-card">
              <span className="termos-info-label">Não é compartilhado</span>
              <p>
                Os tokens não são vendidos, compartilhados ou transferidos a
                terceiros sob nenhuma circunstância.
              </p>
            </div>
          </div>

          <h4 className="termos-subtitle">Revogação das notificações</h4>
          <p>
            O usuário pode desativar as notificações a qualquer momento pelo
            menu lateral do app ou nas configurações do navegador. Ao
            desativar, o token é <strong>removido automaticamente</strong> do
            banco de dados.
          </p>
        </section>

        {/* 4. Permissões */}
        <section className="termos-section">
          <h3 className="termos-title">4. Permissões Solicitadas</h3>
          <div className="termos-lista">
            <div className="termos-lista-item">
              <span className="termos-lista-icon">🔔</span>
              <div>
                <strong>Notificações (opcional)</strong>
                <p>
                  Para envio de comunicados institucionais. A negativa não
                  impede o uso do aplicativo.
                </p>
              </div>
            </div>
            <div className="termos-lista-item">
              <span className="termos-lista-icon">📲</span>
              <div>
                <strong>Instalação como app (opcional)</strong>
                <p>
                  Para adicionar o ícone na tela inicial. Não concede acesso
                  a arquivos ou dados do dispositivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LocalStorage */}
        <section className="termos-section">
          <h3 className="termos-title">5. Armazenamento Local</h3>
          <p>
            O app utiliza o armazenamento local do navegador (localStorage)
            exclusivamente para:
          </p>
          <ul className="termos-ul">
            <li>
              Salvar a preferência quanto ao recebimento de notificações
            </li>
            <li>
              Armazenar temporariamente o token FCM para evitar requisições
              desnecessárias ao servidor
            </li>
          </ul>
          <p>
            Esses dados ficam apenas no dispositivo do usuário e não são
            transmitidos a servidores externos além do necessário para o
            funcionamento das notificações.
          </p>
        </section>

        {/* 6. Terceiros */}
        <section className="termos-section">
          <h3 className="termos-title">6. Serviços de Terceiros</h3>
          <p>
            O Pampa Saúde utiliza os seguintes serviços, cada qual sujeito à
            sua própria política de privacidade:
          </p>
          <div className="termos-lista">
            <div className="termos-lista-item">
              <span className="termos-lista-icon">🔥</span>
              <div>
                <strong>Google Firebase</strong>
                <p>Armazenamento de tokens e envio de notificações push.</p>
              </div>
            </div>
            <div className="termos-lista-item">
              <span className="termos-lista-icon">🔒</span>
              <div>
                <strong>Google reCAPTCHA v3</strong>
                <p>Proteção contra uso automatizado indevido do sistema.</p>
              </div>
            </div>
            <div className="termos-lista-item">
              <span className="termos-lista-icon">▲</span>
              <div>
                <strong>Vercel</strong>
                <p>Hospedagem da aplicação e das funções de backend.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. LGPD */}
        <section className="termos-section">
          <h3 className="termos-title">7. Conformidade com a LGPD</h3>
          <p>
            O Pampa Saúde foi desenvolvido observando os princípios da Lei
            Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018):
          </p>
          <ul className="termos-ul">
            <li>
              Apenas dados estritamente necessários são coletados (princípio
              da minimização)
            </li>
            <li>
              O usuário pode revogar o consentimento a qualquer momento, com
              exclusão imediata do token
            </li>
            <li>
              Nenhum dado sensível (saúde, biometria, origem racial etc.) é
              coletado ou processado
            </li>
            <li>
              Os dados técnicos armazenados são anônimos e não permitem
              identificação do usuário
            </li>
          </ul>
        </section>

        {/* 8. Segurança */}
        <section className="termos-section">
          <h3 className="termos-title">8. Segurança dos Dados</h3>
          <ul className="termos-ul">
            <li>Comunicação exclusivamente via HTTPS (TLS)</li>
            <li>Regras de acesso restritivo ao banco de dados Firestore</li>
            <li>
              Acesso ao painel administrativo protegido por autenticação
            </li>
            <li>
              Tokens FCM não associados a qualquer dado pessoal identificável
            </li>
          </ul>
        </section>

        {/* 9. Responsabilidade */}
        <section className="termos-section">
          <h3 className="termos-title">9. Limitação de Responsabilidade</h3>
          <p>
            As informações sobre unidades de saúde, horários e serviços são
            fornecidas com base em dados oficiais, mas podem não refletir
            alterações recentes. Recomenda-se confirmar diretamente com a
            unidade antes de se deslocar.
          </p>
          <p>
            O Pampa Saúde não se responsabiliza por decisões tomadas com
            base exclusiva nas informações disponibilizadas na plataforma.
          </p>
        </section>

        {/* 10. Contato */}
        <section className="termos-section">
          <h3 className="termos-title">10. Contato</h3>
          <p>
            Para dúvidas ou exercício de direitos previstos na LGPD, entre
            em contato:
          </p>
          <div className="termos-contato">
            <p>
              <strong>Projeto:</strong> Pampa Saúde · Engenharia de
              Computação · Unipampa
            </p>
            <p>
              <strong>E-mail:</strong>{" "}
              <a href="mailto:rodrigoperaca.aluno@unipampa.edu.br">
                rodrigoperaca.aluno@unipampa.edu.br
              </a>
            </p>
            <p>
              <strong>Site:</strong>{" "}
              <a
                href="https://pampa-saude.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                pampa-saude.vercel.app
              </a>
            </p>
          </div>
        </section>

       

      </div>

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
  );
}

export default TermosPage;
