import React from "react";

const Persons = ({ personToShow, personDelete }) => {
  return (
    <>
      {personToShow.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}{" "}
          <button onClick={() => personDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
