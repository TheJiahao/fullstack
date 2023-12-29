class Person {
  id: number | null;
  name: string;
  number: string;

  constructor(name: string, number: string, id?: number) {
    this.id = id || null;
    this.name = name;
    this.number = number;
  }
}

export default Person;
