import listHelper from "../utils/list_helper";

describe("favorite blog", () => {
  test("is null with empty blogs", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("is the only blog with only one blog", () => {
    const blogs = [{ author: "A", title: "T", url: "U", likes: 15 }];

    expect(listHelper.favoriteBlog(blogs)).toEqual({
      author: "A",
      title: "T",
      url: "U",
      likes: 15,
    });
  });

  test("when favorite blog is unique", () => {
    const blogs = [
      { author: "A", title: "T", url: "U", likes: 100 },
      { author: "AA", title: "TT", url: "UU", likes: 2 },
      { author: "AAA", title: "TTT", url: "UUU", likes: 50 },
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual({
      author: "A",
      title: "T",
      url: "U",
      likes: 100,
    });
  });

  test("when multiple blogs has same likes", () => {
    const blogs = [
      { author: "A", title: "AA", url: "urlA", likes: 50 },
      { author: "AA", title: "TT", url: "UU", likes: 2 },
      { author: "AAA", title: "TTT", url: "UUU", likes: 10 },
      { author: "B", title: "BB", url: "urlB", likes: 50 },
      { author: "C", title: "CC", url: "urlC", likes: 50 },
    ];

    const favoriteBlogs = [
      { author: "A", title: "AA", url: "urlA", likes: 50 },
      { author: "B", title: "BB", url: "urlB", likes: 50 },
      { author: "C", title: "CC", url: "urlC", likes: 50 },
    ];

    expect(favoriteBlogs).toContainEqual(listHelper.favoriteBlog(blogs));
  });
});
