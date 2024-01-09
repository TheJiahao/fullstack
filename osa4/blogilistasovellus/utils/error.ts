class BlogNotFoundError extends Error {
  name: string = "BlogNotFoundError";
}

class InvalidCredentialsError extends Error {
  name: string = "InvalidCredentialsError";
}

class InvalidPasswordError extends Error {
  name: string = "InvalidPasswordError";
}

export { BlogNotFoundError, InvalidCredentialsError, InvalidPasswordError };
