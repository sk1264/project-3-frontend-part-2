import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Edit() {

  const [pixsly, setPixslyState] = useState(null);
  const [number, setNumber] = useState(5);

  const [nameState, setNameState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  // const url = `https://pixsly.onrender.com/pixsly/${id}`; 
  const url = `http://localhost:8080/pixslys/${id}`; 

  useEffect(() => {
    const fetchPixsly = async () => {
      console.log("going to fetch person with id of: ", id);
      try {
        const responseData = await fetch(url);
        const pixslyData = await responseData.json(); 
        console.log(pixslyData); 
        console.log(
          "Setting state, about to rerender..(not remount, just re-render)."
        );
        setPixslyState(pixslyData);
      } catch (error) {
        console.error(error);
      }
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchPixsly(); //fetching data and setting state
  }, [id, number]);

  useEffect(() => {
    if (pixsly) {
      setNameState(pixsly.name);
      setDescriptionState(pixsly.description);
    }
  }, [pixsly]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const Edit = {
      name: nameState,
      description: descriptionState,
    };
    console.log(Edit);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edit),
    };

    // const url = `https://pixsly.onrender.com/pixsly/${id}`;
    const url = `http://localhost:8080/pixslys/${id}`;

    try {
      const responseData = await fetch(url, options);
      const EditObj = await responseData.json();
      navigate(`/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onDeleteHandler = async (event) => {
    event.preventDefault();

    const options = {
      method: "DELETE",
    };

    // const url = `https://pixsly.onrender.com/pixsly/${id}`;
    const url = `http://localhost:8080/pixslys/${id}`;

    try {
      const responseData = await fetch(url, options);
      const response = await responseData.json();
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={nameState}
            onChange={(e) => onChangeHandler(e, setNameState)}
          />
          <Form.Text className="text-muted">Add name/color</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={descriptionState}
            onChange={(e) => onChangeHandler(e, setDescriptionState)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Button variant="danger" onClick={onDeleteHandler}>
          Delete
        </Button>
      </Form>
    
      
    </div>
  )
}

export default Edit;
