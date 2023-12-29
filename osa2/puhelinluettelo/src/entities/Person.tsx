class Person {
  id: number;
  name: string;
  number: string;

  constructor(name: string, number: string, id: number = -1) {
    this.id = id;
    this.name = name;
    this.number = number;
  }
}

export default Person;
