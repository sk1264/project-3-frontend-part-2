import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './New.css';

function NewPixslyFunc() {
  const [nameState, setNameState] = useState("");
  const [imageState, setImageState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newPixsly = {
      name: nameState,
      image: imageState,
      description: descriptionState,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPixsly),
    };
    console.log(options)

    // const responseData = await fetch(
    //   "https://pixsly.onrender.com/pixslys",
    //   options
    // );

    const responseData = await fetch(
      "http://localhost:8080/pixslys",
      options
    );

	const newPixslyObj = await responseData.json();
	console.log(newPixslyObj)

    navigate("/");
  };

  return (
    <div className="new">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
		  	name="name"
            type="text"
            placeholder="Enter name"
            value={nameState}
            onChange={(e) => onChangeHandler(e, setNameState)}
          />
          <Form.Text className="text-muted">
            Add name
          </Form.Text>
        </Form.Group>

		<Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
		  	name="image"
            type="text"
            placeholder="Enter Image URL"
            value={imageState}
            onChange={(e) => onChangeHandler(e, setImageState)}
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
		  	name="description"
            type="text"
            placeholder="Description"
            value={descriptionState}
            onChange={(e) => onChangeHandler(e, setDescriptionState)}
          />
        </Form.Group>
        
        <Button className="primary" type="submit" value="New Post">Submit</Button>
      </Form>
    </div>
  );
}

export default NewPixslyFunc;
