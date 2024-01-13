describe("Blog app", function () {
  const user = {
    username: "testuser",
    name: "Test Tset",
    password: "PassWord",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get("#username-input");
    cy.get("#password-input");
    cy.get("#login-button");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type(user.username);
      cy.get("#password-input").type(user.password);
      cy.get("#login-button").click();

      cy.contains(`${user.name} logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("wrongusername");
      cy.get("#password-input").type("wrongPassword");
      cy.get("#login-button").click();

      cy.contains(`Invalid credentials`);
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(user);
    });

    const blog = {
      title: "A new blog",
      author: "The author",
      url: "example.com",
    };

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);

      cy.get("#create-button").click();

      cy.get(".blog").contains(blog.title);
    });

    describe("With one blog created", function () {
      this.beforeEach(function () {
        cy.createBlog(blog);
      });

      it("Blog can be liked", function () {
        cy.get(".blog .blog-detail-button").click();

        cy.contains("likes").parent().as("likeField");
        cy.get("@likeField").find(".like-button").click();

        cy.get("@likeField").contains("likes 1");
      });

      it("Blog can be deleted", function () {
        cy.get(".blog .blog-detail-button").click();

        cy.get(".blog .delete-blog-button").click();
        cy.should("not.contain", blog.title);
      });
    });
  });
});
