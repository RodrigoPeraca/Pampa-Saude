// src/data/healthCampaigns.js
import { Syringe, Heart, Shield, Droplet } from "lucide-react";

export const campaigns = [
  {
    id: 1,
    title: "Doe Sangue, Salve Vidas",
    description: "Campanha de doação de sangue e conscientização sobre a importância da doação",
    fullDescription: "A campanha de doação de sangue visa sensibilizar a população sobre a importância da doação e promover a saúde pública. \nPara doar sangue, é necessário ter entre 16 e 69 anos — menores de 18 anos devem estar acompanhados por um responsável. O peso mínimo exigido é de 50 kg, e para a primeira doação a idade máxima é de 60 anos. Também é preciso apresentar um documento original com foto e estar em boas condições de saúde, ter dormido pelo menos 6 horas, não ter consumido álcool nas 12 horas anteriores e não fumar por pelo menos 2 horas antes da coleta.\nO intervalo entre as doações varia conforme o sexo: mulheres podem doar a cada 90 dias, com limite de até 3 doações por ano, enquanto homens podem doar a cada 60 dias, com limite de até 4 doações anuais.\nExistem ainda impedimentos definitivos para a doação, como HIV, HTLV, hepatites B e C, hepatite após os 11 anos de idade, doença de Chagas, câncer (incluindo leucemia), diabetes grave, AVC, bronquite, asma grave e tuberculose extrapulmonar. Também é importante consultar os impedimentos temporários antes de realizar a doação.",
    date: "16 de Maio",
    status: "Encerrado",
    color: "red",
    icon: Droplet,
    imageUrl: "/doesangue.jpg",
    location: "Centro Clínico do Hospital Universitário",
    mapsLink: "https://maps.app.goo.gl/WTmaRa9LMf56oVpZ6" 
  },
  {
    id: 2,
    title: "Campanha de Vacinação Contra Gripe",
    description: "Vacinação anual contra gripe e outras campanhas sazonais",
    fullDescription: "A campanha de vacinação contra o vírus Influenza visa proteger os grupos prioritários e reduzir as complicações e internações decorrentes das infecções pelo vírus. É fundamental levar a caderneta de vacinação e um documento com foto.",
    date: "Março a Maio",
    status: "Em andamento",
    color: "blue",
    icon: Syringe,
    imageUrl: "https://images.unsplash.com/photo-1633433140510-449e79435b69?auto=format&fit=crop&q=80&w=800", // Imagem genérica para teste
    location: "Posto Camilo Gomes e demais UBS",
    mapsLink: "https://goo.gl/maps/camilogomes" 
  },
  {
    id: 3,
    title: "Outubro Rosa",
    description: "Conscientização e prevenção do câncer de mama",
    fullDescription: "Durante o mês de outubro, a rede de atenção básica foca no rastreamento do câncer de mama e colo do útero. Serão realizados mutirões para agendamento de mamografias e coleta de exames preventivos.",
    date: "Outubro",
    status: "Anual",
    color: "pink",
    icon: Heart,
    imageUrl: "https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?auto=format&fit=crop&q=80&w=800",
    location: "Clínica da Mulher - SAIS Bagé",
    mapsLink: "https://goo.gl/maps/saisbage"
  },
  {
    id: 4,
    title: "Novembro Azul",
    description: "Prevenção e diagnóstico precoce do câncer de próstata",
    fullDescription: "Campanha dedicada à saúde do homem, com foco principal na quebra de preconceitos e no incentivo aos exames regulares para detecção precoce do câncer de próstata.",
    date: "Novembro",
    status: "Anual",
    color: "green",
    icon: Shield,
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    location: "Todas as Estratégias Saúde da Família (ESF)",
    mapsLink: "https://goo.gl/maps/bage"
  },
];