import React, { useState } from 'react'

const Filter = ({ filterFun }) => <div>filter shown with <input onChange={filterFun} /></div>

const PersonForm = ({ submitFun, nameOnchange, numberOnchange }) =>
  <form onSubmit={submitFun}>
    <div>name: <input onChange={nameOnchange} /></div>
    <div>number: <input onChange={numberOnchange} /></div>
    <div><button type="submit">add</button></div>
  </form>

const Persons = ({ persons }) =>
  <div>
    {persons.map(person =>
      <div
        key={person.name}>{person.name} {person.number}
      </div>)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')
  const [newFilter, setNewfilter] = useState('')
  const handleNameInput = e => setNewName(e.target.value)
  const handleNumberInput = e => setNewnumber(e.target.value)
  const filterFun = e => setNewfilter(e.target.value)

  const addName = (e) => {
    e.preventDefault()
    if (persons.some(el => el.name === newName))
      alert(`${newName} is alrady added to phonebook`)
    else if (persons.some(el => el.number === newNumber))
      alert(`${newNumber} is alrady added to phonebook`)
    else
      setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const showPersons = persons.filter(person =>
    new RegExp(newFilter, 'i').test(person.name))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterFun={filterFun} />
      <h2>Add a new</h2>
      <PersonForm submitFun={addName}
        nameOnchange={handleNameInput}
        numberOnchange={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons persons={showPersons} />
    </div>
  )
}

export default App