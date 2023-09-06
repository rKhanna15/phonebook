import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personServices from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({message:'',type:''})

  const [search, setSearch] = useState('')

  useEffect(() => {
    personServices.getAll()
      .then(initialPerons => setPersons(initialPerons))
  }, [])

  const updateNumber = (id, newPerson)=>{
    (newNumber === (persons.find(n=>n.id===id)).number || newNumber.length===0)?
    alert(`${newName} is already added to the phonebook`):
    confirm(`${newName} is already added to the phonebook,replace the old number with a new one?`)?
    personServices.update(id, newPerson).then(updatedPerson=>{
      showNotification(`Updated ${updatedPerson.name}`, 'success')
      setPersons(persons.map(person=>person.id!==id?person:updatedPerson))
    }
    )
    :''
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const checkPerson = persons.find(person => person.name === newName)
    checkPerson?
      updateNumber(checkPerson.id, newPerson)
      :
      personServices.create(newPerson).then(
        addedPerson =>{
          showNotification(`Added ${addedPerson.name}`, 'success')
          setPersons(persons.concat(addedPerson))
        }
      )
    setNewName('')
    setNewNumber('')
  }

  const showNotification = (message, type)=>{
    setNotification({message,type})
    setTimeout(()=>setNotification({message:'',type:''}),3000)
  }

  const removePerson = (id) => {
    const removeName = persons.find(n => n.id === id).name
    const confirmRemove = confirm(`Delete ${removeName}?`)


    confirmRemove ?
      personServices.
        remove(id).
        then(removedPerson =>{
          showNotification(`Deleted ${removeName}`, 'success')
          setPersons(persons.filter(n => n.id !== id))
        }
        ).catch(()=>{
          showNotification(`Information of ${removeName} has already been deleted from server`,'error')
          setPersons(persons.filter(n => n.id !== id))

        }) : ''
  }

  const handleName = (event) => (
    setNewName(event.target.value)
  )

  const handleNumber = (event) => (
    setNewNumber(event.target.value)
  )

  const searchNames = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type}/>

      <Filter search={search} searchNames={searchNames} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        addNewPerson={addNewPerson}
      />

      <h3>Numbers</h3>
      <Person
        persons={persons}
        search={search}
        removePerson={removePerson} />
    </div>
  )
}

export default App