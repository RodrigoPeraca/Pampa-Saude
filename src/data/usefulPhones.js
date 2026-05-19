// src/data/usefulPhones.js
// Dados de telefones úteis para exibição no aplicativo
// Useful Phones Data

import { Ambulance, Flame, Shield, AlertTriangle } from "lucide-react";

export const emergencyNumbers = [
  {
    name: "SAMU",
    number: "192",
    description: "Serviço de Atendimento Móvel de Urgência",
    icon: Ambulance,
    color: "red",
  },
  {
    name: "Bombeiros",
    number: "193",
    description: "Corpo de Bombeiros Militar",
    icon: Flame,
    color: "orange",
  },
  {
    name: "Polícia",
    number: "190",
    description: "Polícia Militar",
    icon: Shield,
    color: "blue",
  },
  {
    name: "Defesa Civil",
    number: "199",
    description: "Situações de risco e desastres",
    icon: AlertTriangle,
    color: "purple",
  },
];

