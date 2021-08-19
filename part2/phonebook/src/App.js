import React, { useEffect, useState } from 'react'
import services from './services/phone_book_service'
import { Filter, PersonForm, Persons } from './components'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')
  const [newFilter, setNewfilter] = useState('')
  const handleNameInput = e => setNewName(e.target.value)
  const handleNumberInput = e => setNewnumber(e.target.value)
  const filterFun = e => setNewfilter(e.target.value)

  useEffect(() => {
    services
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const addName = (e) => {
    e.preventDefault()

    const alreadyExist = persons.find(el => el.name === newName)

    if (alreadyExist) {
      if (window.confirm(`${newName} is alrady added to phonebook, replace the old number with a new one?`)) {
        services
          .put(alreadyExist.id, { ...alreadyExist, number: newNumber })
          .then(res =>
            setPersons(
              persons.map(el => el.id === alreadyExist.id ? el = res : el)
            )
          )
      }
    }
    else {
      const postObject = { name: newName, number: newNumber }
      services
        .post(postObject)
        .then(res => { setPersons(persons.concat(res)); console.log(res); })
    }
  }

  const handleDelete = id => () => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}`))
      services
        .del(id)
        .then(services.getAll)
        .then(res => setPersons(res))
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
      <Persons persons={showPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App