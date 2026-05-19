// src/data/healthCampaigns.js
// Dados de campanhas de saúde para exibição no aplicativo
// Health Campaigns Data
import { Syringe, Heart, Shield } from "lucide-react";

export const campaigns = [
  {
    title: "Campanha de Vacinação",
    description: "Vacinação anual contra gripe e outras campanhas sazonais",
    date: "Março a Maio",
    status: "Em andamento",
    color: "blue",
    icon: Syringe,
  },
  {
    title: "Outubro Rosa",
    description: "Conscientização e prevenção do câncer de mama",
    date: "Outubro",
    status: "Anual",
    color: "pink",
    icon: Heart,
  },
  {
    title: "Novembro Azul",
    description: "Prevenção e diagnóstico precoce do câncer de próstata",
    date: "Novembro",
    status: "Anual",
    color: "green",
    icon: Shield,
  },
];