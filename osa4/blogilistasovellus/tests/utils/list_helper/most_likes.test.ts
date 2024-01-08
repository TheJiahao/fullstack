import listHelper from "../../../utils/list_helper";

describe("most likes", () => {
  test("is null when no bloggers exist", () => {
    expect(listHelper.mostLikes([])).toBe(null);
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

    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Jaska Jokunen",
      likes: 1,
    });
  });

  test("is correct when blogger with most likes is unique", () => {
    const blogs = [
      {
        author: "Jaska Jokunen",
        title: "A blog",
        url: "sfsadfs",
        likes: 1,
      },
      {
        author: "Jaska Jokunen",
        title: "B blog",
        url: "sadfsadf",
        likes: 10,
      },
      { author: "Jaska Jokunen", title: "C blog", url: "qwerwqe", likes: 3 },
      { author: "Ville 5v", title: "åaskasda", url: "sadfsadf", likes: 1 },
      {
        author: "Etunimi Sukunimi",
        title: "sdfae",
        url: "a0psåikdas",
        likes: 3,
      },
      { author: "Blogaaja", title: "qweqwe", url: "sa0+åkopfasd", likes: 12 },
    ];

    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Jaska Jokunen",
      likes: 14,
    });
  });

  test("is correct when multiple blogger has same amount of likes", () => {
    const blogs = [
      {
        author: "Jaska Jokunen",
        title: "A blog",
        url: "sfsadfs",
        likes: 10,
      },
      {
        author: "Jaska Jokunen",
        title: "B blog",
        url: "sadfsadf",
        likes: 10,
      },
      { author: "Ville 5v", title: "C blog", url: "qwerwqe", likes: 1 },
      { author: "Ville 5v", title: "åaskasda", url: "sadfsadf", likes: 19 },
      {
        author: "Etunimi Sukunimi",
        title: "sdfae",
        url: "a0psåikdas",
        likes: 9,
      },
      { author: "Blogaaja", title: "qweqwe", url: "sa0+åkopfasd", likes: 2 },
      {
        author: "Blogaaja",
        title: "qweqas0dias0daswe",
        url: "sa0+åkopfasd",
        likes: 18,
      },
    ];

    expect([
      { author: "Blogaaja", likes: 20 },
      { author: "Ville 5v", likes: 20 },
      { author: "Jaska Jokunen", likes: 20 },
    ]).toContainEqual(listHelper.mostLikes(blogs));
  });
});
