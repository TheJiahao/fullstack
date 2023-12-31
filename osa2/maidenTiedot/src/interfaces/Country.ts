interface Name {
  common: string;
}

interface Flag {
  png: string;
  svg: string;
  alt: string;
}

interface Country {
  name: Name;
  capital: string;
  area: number;
  languages: object;
  flags: Flag;
}

export default Country;
