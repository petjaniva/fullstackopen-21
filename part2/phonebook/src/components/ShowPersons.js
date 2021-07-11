import React from "react"
import bookService from '../services/book'



const ShowPersons = ({persons, filter, setPersons }) => {
    let result
    const removePerson = (persons, person) => {
      const wantTo = window.confirm(`Delete ${person.name}`)
      if (wantTo){
      bookService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(cPerson => cPerson !== person)))
      }
    }
    if (filter === '') {
      result = persons.map(person => <div key={person.name}>{person.name} {person.number}
      <button key={person.name} onClick={() => removePerson(persons, person)}>delete</button>
      </div>)
    }
    else {
      const filtered = persons.filter(function (person){
        return person.name.toLowerCase().includes(filter.toLowerCase())
      })
      result = filtered.map(person => <div key={person.name}>
        {person.name} {person.number}
        <button key={person.name} onClick={() => removePerson(persons, person)} value = {person}>delete</button>
      </div>)
    }
    return result
  }

export default ShowPersons