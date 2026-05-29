export type Airport = {
  code: string;
  city: string;
  name: string;
  country: string;
};

export const airports: Airport[] = [
  // Brasil
  { code: "GRU", city: "São Paulo",        name: "Guarulhos",                   country: "Brasil"          },
  { code: "CGH", city: "São Paulo",        name: "Congonhas",                   country: "Brasil"          },
  { code: "GIG", city: "Rio de Janeiro",   name: "Galeão",                      country: "Brasil"          },
  { code: "SDU", city: "Rio de Janeiro",   name: "Santos Dumont",               country: "Brasil"          },
  { code: "BSB", city: "Brasília",         name: "Internacional",               country: "Brasil"          },
  { code: "SSA", city: "Salvador",         name: "Dep. Luís Eduardo Magalhães", country: "Brasil"          },
  { code: "FOR", city: "Fortaleza",        name: "Pinto Martins",               country: "Brasil"          },
  { code: "REC", city: "Recife",           name: "Guararapes",                  country: "Brasil"          },
  { code: "CNF", city: "Belo Horizonte",   name: "Confins",                     country: "Brasil"          },
  { code: "POA", city: "Porto Alegre",     name: "Salgado Filho",               country: "Brasil"          },
  { code: "CWB", city: "Curitiba",         name: "Afonso Pena",                 country: "Brasil"          },
  { code: "MAO", city: "Manaus",           name: "Eduardo Gomes",               country: "Brasil"          },
  { code: "BEL", city: "Belém",            name: "Val de Cans",                 country: "Brasil"          },
  { code: "FLN", city: "Florianópolis",    name: "Hercílio Luz",                country: "Brasil"          },
  { code: "NAT", city: "Natal",            name: "São Gonçalo do Amarante",     country: "Brasil"          },
  { code: "MCZ", city: "Maceió",           name: "Zumbi dos Palmares",          country: "Brasil"          },
  { code: "VCP", city: "Campinas",         name: "Viracopos",                   country: "Brasil"          },
  { code: "THE", city: "Teresina",         name: "Senador Petrônio Portella",   country: "Brasil"          },
  { code: "SLZ", city: "São Luís",         name: "Marechal Cunha Machado",      country: "Brasil"          },
  { code: "CGB", city: "Cuiabá",           name: "Marechal Rondon",             country: "Brasil"          },
  { code: "CGR", city: "Campo Grande",     name: "Campo Grande Internacional",  country: "Brasil"          },
  { code: "PMW", city: "Palmas",           name: "Brigadeiro Lysias Rodrigues", country: "Brasil"          },
  { code: "PVH", city: "Porto Velho",      name: "Governador Jorge Teixeira",   country: "Brasil"          },
  // Portugal
  { code: "LIS", city: "Lisboa",           name: "Humberto Delgado",            country: "Portugal"        },
  { code: "OPO", city: "Porto",            name: "Francisco Sá Carneiro",       country: "Portugal"        },
  { code: "FAO", city: "Faro",             name: "Faro Internacional",          country: "Portugal"        },
  // EUA
  { code: "MIA", city: "Miami",            name: "Miami Internacional",         country: "EUA"             },
  { code: "JFK", city: "Nova York",        name: "John F. Kennedy",             country: "EUA"             },
  { code: "EWR", city: "Nova York",        name: "Newark Liberty",              country: "EUA"             },
  { code: "LAX", city: "Los Angeles",      name: "Los Angeles Internacional",   country: "EUA"             },
  { code: "MCO", city: "Orlando",          name: "Orlando Internacional",       country: "EUA"             },
  { code: "ORD", city: "Chicago",          name: "O'Hare Internacional",        country: "EUA"             },
  { code: "ATL", city: "Atlanta",          name: "Hartsfield-Jackson",          country: "EUA"             },
  { code: "BOS", city: "Boston",           name: "Logan Internacional",         country: "EUA"             },
  { code: "SFO", city: "San Francisco",    name: "São Francisco Internacional", country: "EUA"             },
  // Europa
  { code: "CDG", city: "Paris",            name: "Charles de Gaulle",           country: "França"          },
  { code: "LHR", city: "Londres",          name: "Heathrow",                    country: "Reino Unido"     },
  { code: "MAD", city: "Madri",            name: "Adolfo Suárez Barajas",       country: "Espanha"         },
  { code: "FCO", city: "Roma",             name: "Leonardo da Vinci",           country: "Itália"          },
  { code: "AMS", city: "Amsterdã",         name: "Schiphol",                    country: "Holanda"         },
  { code: "FRA", city: "Frankfurt",        name: "Frankfurt Internacional",     country: "Alemanha"        },
  { code: "MXP", city: "Milão",            name: "Malpensa",                    country: "Itália"          },
  { code: "BCN", city: "Barcelona",        name: "El Prat",                     country: "Espanha"         },
  { code: "ZRH", city: "Zurique",          name: "Zurique Internacional",       country: "Suíça"           },
  // América Latina
  { code: "EZE", city: "Buenos Aires",     name: "Ministro Pistarini",          country: "Argentina"       },
  { code: "SCL", city: "Santiago",         name: "Arturo Merino Benítez",       country: "Chile"           },
  { code: "BOG", city: "Bogotá",           name: "El Dorado",                   country: "Colômbia"        },
  { code: "LIM", city: "Lima",             name: "Jorge Chávez",                country: "Peru"            },
  { code: "MVD", city: "Montevidéu",       name: "Carrasco",                    country: "Uruguai"         },
  { code: "ASU", city: "Assunção",         name: "Silvio Pettirossi",           country: "Paraguai"        },
  { code: "CUN", city: "Cancún",           name: "Cancún Internacional",        country: "México"          },
  { code: "MEX", city: "Cidade do México", name: "Benito Juárez",               country: "México"          },
  { code: "PTY", city: "Panamá",           name: "Tocumen Internacional",       country: "Panamá"          },
  { code: "UIO", city: "Quito",            name: "Mariscal Sucre",              country: "Equador"         },
  { code: "GYE", city: "Guayaquil",        name: "José Joaquín de Olmedo",      country: "Equador"         },
  // Outros
  { code: "DXB", city: "Dubai",            name: "Dubai Internacional",         country: "Emirados Árabes" },
  { code: "NRT", city: "Tóquio",           name: "Narita",                      country: "Japão"           },
  { code: "GRU", city: "Tóquio",           name: "Haneda",                      country: "Japão"           },
  { code: "HND", city: "Tóquio",           name: "Haneda",                      country: "Japão"           },
  { code: "IST", city: "Istambul",         name: "Aeroporto de Istambul",       country: "Turquia"         },
  { code: "JNB", city: "Joanesburgo",      name: "O.R. Tambo",                  country: "África do Sul"   },
  { code: "SYD", city: "Sydney",           name: "Kingsford Smith",             country: "Austrália"       },
];

export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return airports
    .filter((a) => {
      const city    = a.city.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      const code    = a.code.toLowerCase();
      const country = a.country.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      return city.includes(q) || code.includes(q) || country.includes(q);
    })
    .slice(0, 6);
}
