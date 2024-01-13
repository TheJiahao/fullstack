declare namespace Cypress {
  interface Chainable {
    login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Chainable;
    createBlog({
      title,
      author,
      url,
    }: {
      title: string;
      author: string;
      url: string;
    }): Chainable;
  }
}
