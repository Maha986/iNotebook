import React from "react";
// import noteContext from '../context/notes/noteContext'

export default function About() {
  const style = {
    width: "80%",
    margin: "40px auto",
    border: "1px solid darkgoldenrod",
    "box-shadow": "2px 2px 3px 1px darkgoldenrod",
    padding: "40px 25px",
    "text-align": "center",
    "font-size": "1.5rem",
    "background-image": "linear-gradient(45deg, #e2ae12, transparent)",
  };
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
    <>
      <div>
        <h1>Our Mission</h1>
        <div style={style}>
          <p>
            Our mission is to simplify your life by providing a powerful and
            intuitive note-taking solution that adapts to your needs.
          </p>
        </div>
        {/* <h1>about {a.state.name} in class {a.state.class}</h1> */}
      </div>
      <div>
        <h1>Features</h1>
        <div style={style}>
          <p>
            We provide you a way to add notes to your collection whenever you want. <br/>
            You can update your notes to keep your information up to date.<br/>
            You can add the tags to classify your notes. <br/>
            You can also delete the notes as per your needs.<br/>
            Notes will be managed by our application.
          </p>
        </div>
        {/* <h1>about {a.state.name} in class {a.state.class}</h1> */}
      </div>
    </>
  );
}
