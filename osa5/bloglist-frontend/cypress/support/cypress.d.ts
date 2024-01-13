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
      likes,
    }: {
      title: string;
      author: string;
      url: string;
      likes?: number;
    }): Chainable;
  }
}
