import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'

import { EDIT_BIRTH_YEAR } from '../queries'

const BirthYear = ({ authors }) => {
    const [selectedName, setName] = useState(null)
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_BIRTH_YEAR)

    const options = authors.map(a => {
        return { value: a.name, label: a.name }
    })

    const submit = e => {
        e.preventDefault()
        editAuthor({ variables: { name: selectedName.value, born: parseInt(born) } })
        setName('')
        setBorn('')
    }
    return (
        <div>
            <h1>Set birthyear</h1>
            <form onSubmit={submit}>
                <Select
                    options={options}
                    defaultValue={selectedName}
                    onChange={setName}
                /> <br />
                born <input value={born} onChange={({ target }) => setBorn(target.value)} /> <br />
                <button type="submit">update author</button>
            </form>
        </div>

    )
}

export default BirthYear