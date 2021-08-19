import React from 'react'

export const Filter = ({ filterFun }) => <div>filter shown with <input onChange={filterFun} /></div>

export const PersonForm = ({ submitFun, nameOnchange, numberOnchange }) =>
    <form onSubmit={submitFun}>
        <div>name: <input onChange={nameOnchange} /></div>
        <div>number: <input onChange={numberOnchange} /></div>
        <div><button type="submit">add</button></div>
    </form>

export const Persons = ({ persons, handleDelete }) =>
    <div>
        {persons.map(person =>
            <p key={person.id}>
                {person.name} {person.number} <button onClick={handleDelete(person.id)}>delete</button>
            </p>)}
    </div>


