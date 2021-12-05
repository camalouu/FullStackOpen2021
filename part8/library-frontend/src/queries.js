import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
subscription{
  bookAdded{
    title
    published
    id
    genres
    author {
      name
      id
      born
      bookCount
    }
  }
}
`
export const ALL_AUTHORS = gql`
query AllAuthors {
    allAuthors {
        name
        id
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    id
    genres
    author {
      name
      id
      born
      bookCount
    }
  }
}
`

export const BOOKS_BY_GENRE = gql`
query BooksByGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    id
    genres
  }
}
`


export const ADD_BOOK = gql`
mutation Mutation(
  $title: String!
  $published: Int!
  $author: String!
  $genres: [String!]!
) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    id
    genres
  }
}
`

export const EDIT_BIRTH_YEAR = gql`
mutation EditAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    id
    born
  }
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`