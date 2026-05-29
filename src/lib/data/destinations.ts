export type Destination = {
  id: string;
  city: string;
  country: string;
  code: string;
  miles: number;
  directFlight: boolean;
  imageUrl: string;
  highlight: string;
};

export const destinations: Destination[] = [
  {
    id: "1",
    city: "Lisboa",
    country: "Portugal",
    code: "LIS",
    miles: 45000,
    directFlight: true,
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
    highlight: "Torre de Belém",
  },
  {
    id: "2",
    city: "Miami",
    country: "EUA",
    code: "MIA",
    miles: 38000,
    directFlight: true,
    imageUrl: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=600&q=80",
    highlight: "South Beach",
  },
  {
    id: "3",
    city: "Paris",
    country: "França",
    code: "CDG",
    miles: 55000,
    directFlight: false,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    highlight: "Torre Eiffel",
  },
  {
    id: "4",
    city: "Cancún",
    country: "México",
    code: "CUN",
    miles: 28000,
    directFlight: true,
    imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&q=80",
    highlight: "Praias de Cristal",
  },
  {
    id: "5",
    city: "Nova York",
    country: "EUA",
    code: "JFK",
    miles: 42000,
    directFlight: true,
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    highlight: "Manhattan",
  },
  {
    id: "6",
    city: "Dubai",
    country: "Emirados Árabes",
    code: "DXB",
    miles: 70000,
    directFlight: false,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    highlight: "Burj Khalifa",
  },
  {
    id: "7",
    city: "Buenos Aires",
    country: "Argentina",
    code: "EZE",
    miles: 22000,
    directFlight: true,
    imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80",
    highlight: "La Boca",
  },
  {
    id: "8",
    city: "Tóquio",
    country: "Japão",
    code: "NRT",
    miles: 85000,
    directFlight: false,
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    highlight: "Shibuya",
  },
  {
    id: "9",
    city: "Amsterdã",
    country: "Holanda",
    code: "AMS",
    miles: 62000,
    directFlight: false,
    imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
    highlight: "Canais e museus",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Ana Lima",
    city: "São Paulo",
    text: "Incrível! Voei para Lisboa com milhas que estavam paradas no cartão. O processo foi simples e super rápido.",
    avatar: "AL",
    rating: 5,
    destination: "Lisboa",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    city: "Rio de Janeiro",
    text: "Nunca pensei que conseguiria usar as milhas do Nubank para voar para Miami. A Tropical Milhas fez tudo acontecer!",
    avatar: "CM",
    rating: 5,
    destination: "Miami",
  },
  {
    id: "3",
    name: "Juliana Costa",
    city: "Belo Horizonte",
    text: "Atendimento excelente, passagem emitida em menos de 24h. Já é a terceira vez que uso e recomendo sempre.",
    avatar: "JC",
    rating: 5,
    destination: "Paris",
  },
  {
    id: "4",
    name: "Roberto Silva",
    city: "Brasília",
    text: "Economizei mais de R$ 8.000 usando minhas milhas em vez de pagar em dinheiro. Serviço impecável.",
    avatar: "RS",
    rating: 5,
    destination: "Nova York",
  },
];

export const faqs = [
  {
    q: "Como funciona o processo de emissão?",
    a: "É simples: você escolhe o destino, nos informa o programa de milhas e o saldo disponível. Nossa equipe verifica a disponibilidade, encontra a melhor opção e emite a passagem usando suas milhas. A confirmação chega direto no seu e-mail em até 24h sem burocracia.",
  },
  {
    q: "Quais programas de milhas são aceitos?",
    a: "Trabalhamos com todos os principais programas do Brasil: Smiles (GOL), TudoAzul (Azul), LATAM Pass, Livelo, Nubank Rewards, Itaú, Bradesco, Santander, C6 Bank, Inter, XP e Porto Seguro. Não encontrou o seu? Entre em contato provavelmente conseguimos atender.",
  },
  {
    q: "E se eu não tiver milhas suficientes?",
    a: "Sem problema. Podemos combinar saldos de programas diferentes, buscar datas com custo em milhas menor ou cobrir a diferença com cartão de crédito. Nossa equipe encontra a solução mais vantajosa para o seu caso.",
  },
  {
    q: "Quanto tempo leva para emitir minha passagem?",
    a: "A emissão leva em média de 2 a 24 horas após a confirmação do seu saldo. Para viagens nas próximas 48h, oferecemos emissão expressa em até 2 horas. Você acompanha tudo em tempo real pela sua conta.",
  },
  {
    q: "Como funciona o pagamento da taxa de emissão?",
    a: "Cobramos apenas uma taxa de emissão muito abaixo do valor da passagem em dinheiro. O pagamento é feito via Pix ou cartão de crédito. O valor é informado antes de qualquer confirmação, sem surpresas.",
  },
  {
    q: "Meus dados e minhas milhas ficam seguros?",
    a: "Sim. Suas informações são tratadas com total sigilo e usadas exclusivamente para emitir a passagem. Não compartilhamos dados com terceiros e operamos em conformidade com a LGPD.",
  },
];
