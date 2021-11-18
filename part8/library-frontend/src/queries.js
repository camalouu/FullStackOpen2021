import { gql } from '@apollo/client'

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
        author
        published
    }
}
`


export const ADD_BOOK = gql`
mutation AddBook(
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
      author
      id
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