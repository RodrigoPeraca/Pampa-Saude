// src/data/firstAid.js
// Dados de primeiros socorros para exibição no aplicativo
// First Aid Emergencies Data

import { Heart, Flame, Zap, Droplets } from "lucide-react";

export const emergencies = [
  {
    title: "Parada Cardíaca",
    icon: Heart,
    color: "red",
    steps: [
      "Ligue imediatamente 192 (SAMU)",
      "Inicie compressões torácicas (100-120/min)",
      "Continue até a chegada do socorro",
    ],
  },
  {
    title: "Queimaduras",
    icon: Flame,
    color: "orange",
    steps: [
      "Resfrie a área com água corrente por 10-20 minutos",
      "Não use gelo diretamente na pele",
      "Cubra com pano limpo e procure atendimento",
    ],
  },
  {
    title: "Choque Elétrico",
    icon: Zap,
    color: "yellow",
    steps: [
      "Desligue a fonte de energia se possível",
      "Não toque na vítima se ainda houver corrente",
      "Ligue 192 e avalie respiração/consciência",
    ],
  },
  {
    title: "Hemorragia",
    icon: Droplets,
    color: "blue",
    steps: [
      "Faça compressão direta no local com pano limpo",
      "Mantenha o membro elevado (se possível)",
      "Ligue 192 se o sangramento for intenso",
    ],
  },
];