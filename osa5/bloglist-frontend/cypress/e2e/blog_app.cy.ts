describe("Blog app", function () {
  const user1 = {
    username: "testuser",
    name: "Test Tset",
    password: "PassWord",
  };

  const user2 = {
    username: "testuser2",
    name: "Test Tset2",
    password: "PassWord2",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user1);
    cy.request("POST", "http://localhost:3003/api/users", user2);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get("#username-input");
    cy.get("#password-input");
    cy.get("#login-button");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type(user1.username);
      cy.get("#password-input").type(user1.password);
      cy.get("#login-button").click();

      cy.contains(`${user1.name} logged in`);
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
      cy.login(user1);
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

      it("Delete button is not visible to another user", function () {
        cy.get("#logout-button").click();
        cy.login(user2);

        cy.get(".blog .blog-detail-button").click();
        cy.should("not.contain", ".blog .delete-blog-button");
      });
    });

    describe("With multiple blogs created", function () {
      beforeEach(function () {
        const blogs = [
          {
            title: "Blog with the second most likes",
            author: "Better",
            url: "saop23kd1.aopskda1231s",
            likes: 3,
          },
          {
            title: "Blog with the least likes",
            author: "Good",
            url: "saop23kd1.aoas",
            likes: 1,
          },
          {
            title: "Blog with the most likes",
            author: "the Best",
            url: "saopkdas.aopskdas",
            likes: 5,
          },
        ];

        blogs.forEach((blog) => {
          cy.createBlog(blog);
        });
      });

      it("Blogs are initially sorted by likes", function () {
        cy.get(".blog").eq(0).should("contain", "Blog with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Blog with the second most likes");
        cy.get(".blog").eq(2).should("contain", "Blog with the least likes");
      });

      it("The order of blogs is updated after order by likes changes", function () {
        cy.get(".blog").eq(2).as("leastLikesBlog");
        cy.get("@leastLikesBlog").find(".blog-detail-button").click();
        cy.get("@leastLikesBlog").find(".like-button").click().click().click();

        cy.get(".blog").eq(1).should("contain", "Blog with the least likes");

        cy.get(".blog").eq(1).find(".like-button").click().click();

        cy.get(".blog").eq(0).should("contain", "Blog with the least likes");
      });

      it("The order of blogs is same when order by likes does not change", function () {
        cy.get(".blog").eq(2).as("leastLikesBlog");
        cy.get("@leastLikesBlog").find(".blog-detail-button").click();
        cy.get("@leastLikesBlog").find(".like-button").click();

        cy.get(".blog").eq(0).should("contain", "Blog with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Blog with the second most likes");
        cy.get(".blog").eq(2).should("contain", "Blog with the least likes");

        cy.get(".blog").eq(1).as("secondMostLikesBlog");
        cy.get("@secondMostLikesBlog").find(".blog-detail-button").click();
        cy.get("@secondMostLikesBlog").find(".like-button").click();

        cy.get(".blog").eq(0).should("contain", "Blog with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Blog with the second most likes");
        cy.get(".blog").eq(2).should("contain", "Blog with the least likes");
      });
    });
  });
});
