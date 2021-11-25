import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Recommend = ({ show, user }) => {
    const [getBooks, { data, loading }] = useLazyQuery(BOOKS_BY_GENRE)
    const [genre, setGenre] = useState(user ? user.favoriteGenre : null)

    useEffect(() => {
        getBooks({ variables: { genre } })
    }, [genre])  // eslint-disable-line

    const genreChanged = genre =>
        () => setGenre(genre)

    if (!show || loading) return null
    
    return (
        <div>
            <h1>recommendations</h1>
            books in your favorite genre <strong>{genre}</strong>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {data && data.allBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={genreChanged("mystery")}>mystery</button>
            <button onClick={genreChanged("crime")}>crime</button>
            <button onClick={genreChanged("morals")}>morals</button>
            <button onClick={genreChanged("fantasy")}>fantasy</button>
            <button onClick={genreChanged(null)}>all genres</button>
        </div>
    )
}

export default Recommend