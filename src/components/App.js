import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passport", quantity: 2, packed: false },
  { id: 2, description: "Phone charger", quantity: 1, packed: true },
  { id: 3, description: "Socks", quantity: 5, packed: false },
];


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);

  }

  function handleRemoveItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem}/>
      <PackingList items={items} onDeleteIem={handleRemoveItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Let's List Down</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  

 

  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem={id:initialItems.length+1,description,quantity,packed:false};
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
    
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({length:20},(_,i)=>i+1).map
        ((num)=>(
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input 
      type="text" 
      placeholder="Item..."
      value={description}
      onChange={(e)=>setDescription(e.target.value)}  
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeleteIem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteIem={onDeleteIem}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item , onDeleteIem}) {
  return (<li>
    <span style={item.packed ? {textDecoration:"line-through"}:{}}>
      {item.quantity} {item.description}
    </span>
    <button onClick={()=>onDeleteIem(item.id)}>❌</button>
  </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list , and you already packed X (X%)</em>
    </footer>
  );
}
