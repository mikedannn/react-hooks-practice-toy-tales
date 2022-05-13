import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const toysAPI = 'http://localhost:3001/toys';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(toy) {

    fetch(toysAPI, {
      method: 'POST',
      body: JSON.stringify(toy),
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json',
      }
    }).then(res => res.json())
    .then(json => setToys([...toys, json]))
  }

  function deleteToy(id) {
    fetch(`${toysAPI}/${id}`, {
      method: 'DELETE',
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json',
      }
    }).then(() => setToys(toys.filter(toy => toy.id !== id)))
  }

  function incrementLikes(toy) {
    console.log('increment', toy.id)
    fetch(`${toysAPI}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    }).then((res) => res.json())
    .then((json) => setToys( toys.map((t) => t.id !== toy.id ? t : {...t, likes: t.likes + 1})));
  }


  useEffect(() => {
    fetch(toysAPI)
      .then((response) => response.json())
      .then((data) => setToys(data))
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={deleteToy} handleClickLikes={incrementLikes}/>
    </>
  );
}

export default App;
