import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./service/person";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((initdata) => {
      setPersons(initdata);
    });
  }, []);

  const getMatch = (arr, str) => {
    let reg = new RegExp(str, "i");
    return arr.filter((item) => item.name.match(reg));
  };
  const personToShow =
    searchStr === "" ? persons : getMatch(persons, searchStr);

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      setMessage(`${newName} is already added to phonebook`);
      setTimeout(() => setMessage(""), 5000);
      clearForm();
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      clearForm();
      setMessage(`${newPerson.name} added`);
      setTimeout(() => setMessage(""), 5000);
    });
  };
  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };
  const personDelete = (id) => {
    if (window.confirm("do you want to delete this person?")) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage("Person deleted successfully");
          setTimeout(() => setMessage(""), 5000);
        })
        .catch((error) => {
          let errMessage = `Information of ${
            persons.find((p) => p.id === id).name
          } has already been removed from server.`;
          console.log(errMessage);
          setMessage(errMessage);
          setTimeout(() => setMessage(""), 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setSearchStr={setSearchStr} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newNumber={newNumber}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} personDelete={personDelete} />
    </div>
  );
};

export default App;
