import listHelper from "../utils/list_helper";

describe("most blogs", () => {
  test("is null when no bloggers exist", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("is correct with only one blog", () => {
    const blogs = [
      {
        author: "Jaska Jokunen",
        title: "A blog",
        url: "sfsadfs",
        likes: 1,
      },
    ];

    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Jaska Jokunen",
      blogs: 1,
    });
  });

  test("is correct when blogger with most blogs is unique", () => {
    const blogs = [
      {
        author: "Jaska Jokunen",
        title: "A blog",
        url: "sfsadfs",
        likes: 10000,
      },
      {
        author: "Jaska Jokunen",
        title: "B blog",
        url: "sadfsadf",
        likes: 102938,
      },
      { author: "Jaska Jokunen", title: "C blog", url: "qwerwqe", likes: 123 },
      { author: "Ville 5v", title: "åaskasda", url: "sadfsadf", likes: 1 },
      {
        author: "Etunimi Sukunimi",
        title: "sdfae",
        url: "a0psåikdas",
        likes: 120983,
      },
      { author: "Blogaaja", title: "qweqwe", url: "sa0+åkopfasd", likes: 12 },
    ];

    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Jaska Jokunen",
      blogs: 3,
    });
  });

  test("is correct when multiple blogger has same amount of blogs", () => {
    const blogs = [
      {
        author: "Jaska Jokunen",
        title: "A blog",
        url: "sfsadfs",
        likes: 10000,
      },
      {
        author: "Jaska Jokunen",
        title: "B blog",
        url: "sadfsadf",
        likes: 102938,
      },
      { author: "Ville 5v", title: "C blog", url: "qwerwqe", likes: 123 },
      { author: "Ville 5v", title: "åaskasda", url: "sadfsadf", likes: 1 },
      {
        author: "Etunimi Sukunimi",
        title: "sdfae",
        url: "a0psåikdas",
        likes: 120983,
      },
      { author: "Blogaaja", title: "qweqwe", url: "sa0+åkopfasd", likes: 12 },
      {
        author: "Blogaaja",
        title: "qweqas0dias0daswe",
        url: "sa0+åkopfasd",
        likes: 2122,
      },
    ];

    expect([
      { author: "Blogaaja", blogs: 2 },
      { author: "Ville 5v", blogs: 2 },
      { author: "Jaska Jokunen", blogs: 2 },
    ]).toContainEqual(listHelper.mostBlogs(blogs));
  });
});
