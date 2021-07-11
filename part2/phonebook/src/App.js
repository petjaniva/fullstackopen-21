import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import bookService from './services/book'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    bookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    },[]
  )

  const [ msg, setMsg] = useState(null)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (!(persons.some(person => person.name===newName))){
      const person = {
        name: newName,
        number: newNumber
      }
      bookService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMsg(`added ${response.data.name}`)
        })
        setTimeout(() => {
          setMsg(null)
        }, 3000)
    }
    else {
      const wantTo = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
      if (wantTo){
        const updatedPerson = persons.find(person => person.name === newName)
        updatedPerson.number = newNumber
        bookService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id === response.id ? response : person))
            setMsg(`updated ${updatedPerson.name}`)
          })
          setTimeout(() => {
            setMsg(null)
          }, 3000)
      }
    }
  }
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const Notification = ({msg}) => {
    if (msg === null)
    return null
    else {
      return (
        <div style={notificationStyle}>{msg}</div>
      )
    }
  }
  
  const addPersonData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} />
      <Filter onChange={handleFilterChange} value = {filter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} data={addPersonData}/>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App
