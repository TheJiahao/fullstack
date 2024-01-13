declare namespace Cypress {
  interface Chainable {
    login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Chainable;
  }
}
