import React from 'react'

export const Filter = ({ filterFun }) => <div>filter shown with <input onChange={filterFun} /></div>

export const PersonForm = ({ submitFun, nameOnchange, numberOnchange }) => {

    return (
        <form style={{
            margin: 20,
            fontSize: 20
        }} onSubmit={submitFun}>
            <div>name: <input onChange={nameOnchange} /></div>
            <div>number: <input onChange={numberOnchange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}
export const Persons = ({ persons, handleDelete }) =>
    <div>
        {persons.map(person =>
            <p key={person.id}>
                {person.name} {person.number} <button onClick={handleDelete(person.id)}>delete</button>
            </p>)}
    </div>

export const Notification = ({ message }) => {
    const styleObj = {
        display: 'inline-block',
        color: 'rgb(98, 15, 153)',
        fontStyle: 'italic',
        padding: 10,
        margin: 5,
        fontSize: 20,
        border: `2px solid ${message.err ? 'red' : 'green'}`,
        borderRadius: 3,
        background: `rgba(76, ${message.err ? '10' : '150'}, 80, 0.3)`,
    }
    if (message.text)
        return (
            <div style={styleObj}>
                {message.text}
            </div>
        )
    else
        return <div></div>
}

