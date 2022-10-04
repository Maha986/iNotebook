import React from 'react'
// import noteContext from '../context/notes/noteContext'

export default function About() {
    // const a = useContext(noteContext);
    //we use useEffect when we want some function to start after whole page is rendered
    //or if after the arrow function, i mention some time then it will act after that time
    //if i mention some other component, state or var then it will execute once that thing update/change like see below
    // useEffect(() => {
    //     console.log("hello");
    // },[a.state.name])

    //example of case 1
    // useEffect(() => {
    //     a.update();
    // })
    return (
        <div>
            <h1>About</h1>
            {/* <h1>about {a.state.name} in class {a.state.class}</h1> */}
        </div>
    )
}
