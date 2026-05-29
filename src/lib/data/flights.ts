export type Flight = {
  id: string;
  destination: string;
  country: string;
  tagline: string;
  image: string;
  origin: string;
  originCode: string;
  destinationCode: string;
  airline: string;
  airlineLogo: string; // path: /images/airlines/xxx.svg
  flightClass: string;
  miles: number;
  duration: string;
  stops: "direto" | "1 escala";
};

export const featuredFlights: Flight[] = [
  {
    id: "1",
    destination: "Porto",
    country: "Portugal",
    tagline: "Vinhos, história e a beleza do Douro",
    image: "/images/hero/portugal.webp",
    origin: "São Paulo",
    originCode: "GRU",
    destinationCode: "OPO",
    airline: "Azul",
    airlineLogo: "/images/airlines/azul.svg",
    flightClass: "Econômica",
    miles: 45000,
    duration: "9h 50min",
    stops: "direto",
  },
  {
    id: "2",
    destination: "Miami",
    country: "Estados Unidos",
    tagline: "Sol, praia e vida noturna",
    image: "/images/hero/miami.webp",
    origin: "São Paulo",
    originCode: "GRU",
    destinationCode: "MIA",
    airline: "Gol",
    airlineLogo: "/images/airlines/gol.svg",
    flightClass: "Econômica",
    miles: 38000,
    duration: "8h 20min",
    stops: "direto",
  },
  {
    id: "3",
    destination: "Paris",
    country: "França",
    tagline: "A cidade luz te espera",
    image: "/images/hero/paris.webp",
    origin: "São Paulo",
    originCode: "GRU",
    destinationCode: "CDG",
    airline: "Delta",
    airlineLogo: "/images/airlines/delta.svg",
    flightClass: "Executiva",
    miles: 55000,
    duration: "11h 30min",
    stops: "1 escala",
  },
  {
    id: "4",
    destination: "Nova York",
    country: "Estados Unidos",
    tagline: "A cidade que nunca dorme",
    image: "/images/hero/nova-york.webp",
    origin: "São Paulo",
    originCode: "GRU",
    destinationCode: "EWR",
    airline: "United Airlines",
    airlineLogo: "/images/airlines/united.svg",
    flightClass: "Econômica",
    miles: 42000,
    duration: "10h 10min",
    stops: "direto",
  },
  {
    id: "5",
    destination: "Cancún",
    country: "México",
    tagline: "Mar turquesa e ruínas maias",
    image: "/images/hero/cancun.webp",
    origin: "São Paulo",
    originCode: "GRU",
    destinationCode: "CUN",
    airline: "LATAM",
    airlineLogo: "/images/airlines/latam.svg",
    flightClass: "Econômica",
    miles: 28000,
    duration: "7h 50min",
    stops: "1 escala",
  },
];
