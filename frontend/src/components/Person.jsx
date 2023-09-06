const EachPerson = ({ name, number,remove }) => (
    <>
        {name} {number} 
        <button onClick={remove}>delete</button>
        <br />
    </>
)

const Person = ({ persons, search, removePerson }) => {
    const filteredPersons = persons.filter(person => person.name.includes(search))
    return (
        filteredPersons.map((person) => (
            <EachPerson name={person.name} number={person.number} remove={(event)=>{
                event.preventDefault()
                removePerson(person.id)
            }} key={person.id} />
        ))
    )
}

export default Person