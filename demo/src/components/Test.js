import React from 'react'

export default function Test() {
    const myArray = ["item 1", "item 2", "item 3"];
    
    const myObject = {
        name: "John Doe",
        age: 30,
        city: "New York"
    };
    const obj_array = Object.entries(myObject);

    const users = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Peter Jones', age: 40 },
      ];
  return (
    <>
    <div>
    {
        myArray.map((i)=>(
            <p>{i}</p>
        ))
    }</div>
    <div>
        {
            obj_array.map(([x,y])=>(
                <p>{x}:{y}</p>
            ))
        }
    </div>
    <div>
        {
            users.map((i)=>(
                <p key={i.id}>{i.name} Age : {i.age}</p>
            ))
        }
    </div>
</>
  )
}
