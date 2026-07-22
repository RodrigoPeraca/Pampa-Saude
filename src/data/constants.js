// src/data/constants.js
// Constantes estáticas do aplicativo

export const TYPE_LABELS = {
  all: "Todas as unidades",
  UBS: "Unidade Básica de Saúde",
  ESF: "Estratégia Saúde da Família",
  CAPS: "Centro de Atenção Psicossocial",
  SAIS: "Serviço de Atenção Integral à Saúde",
  UPA: "Unidade de Pronto Atendimento",
  Hospital: "Hospital",
  SAMU: "Serviço de Atendimento Móvel de Urgência",
};

export const TYPE_DESCRIPTIONS = {
  all: "Veja todas as unidades cadastradas e use a busca para filtrar por bairro, serviço ou nome.",
  UBS: "Procure quando precisar de atendimento básico, vacinação, pré-natal, enfermagem e encaminhamentos pela atenção primária.",
  ESF: "Use para acompanhamento contínuo da família, prevenção de doenças, consultas de rotina e visita domiciliar.",
  CAPS: "Indicado para cuidado em saúde mental, apoio psicológico/psiquiátrico e acompanhamento prolongado.",
  SAIS: "Procure para consultas especializadas, exames e encaminhamentos dentro da rede SUS.",
  UPA: "Vá em casos de urgência e emergência, como dor forte, falta de ar, febre alta, quedas, cortes ou piora súbita.",
  Hospital: "Busque quando houver necessidade de internação, cirurgia, exames mais complexos ou atendimento especializado.",
  SAMU: "Acione o 192 em emergências para socorro imediato e transporte de pacientes quando houver risco.",
};

export const TAB_CONTENT = {
  devs: {
    title: "Quem desenvolve o Pampa Saúde?",
    description:
      "Aplicativo criado como iniciativa acadêmica da Engenharia de Computação/Unipampa para apoiar a comunidade de Bagé com acesso rápido às unidades de atenção básica.",
  },
  unipampa: {
    title: "Unipampa & Prefeitura de Bagé",
    description:
      "Parceria baseada em projetos de extensão e pesquisa que unem inovação tecnológica e políticas municipais para fortalecer a Atenção Primária em Saúde.",
  },
};

export const PAGE_ROUTES = {
  home: "home",
  servicos: "servicos",
  sobre: "sobre",
};