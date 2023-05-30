import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewMonsterFunc() {
  const [nameState, setNameState] = useState("");
  const [imageState, setImageState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [difficultyState, setDifficultyState] = useState("");
  const [tipsState, setTipsState] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newMonster = {
      name: nameState,
      image: imageState,
      location: locationState,
      description: descriptionState,
      difficulty: difficultyState,
      tips: tipsState
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMonster),
    };

    const responseData = await fetch(
      "https://zelda-backend.onrender.com/monsters",
      options
    );

	const newMonsterObj = await responseData.json();
	console.log(newMonsterObj)

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
            Add monster name/color
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
            Add monster name/color
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

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location Found</Form.Label>
          <Form.Control
		  	name="location"
            type="text"
            placeholder="Location"
            value={locationState}
            onChange={(e) => onChangeHandler(e, setLocationState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
		  	name="difficulty"
            type="text"
            placeholder="Difficulty"
            value={difficultyState}
            onChange={(e) => onChangeHandler(e, setDifficultyState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTips">
          <Form.Label>Tips and Tricks</Form.Label>
          <Form.Control
		  	name="tips"
            type="text"
            placeholder="Tips"
            value={tipsState}
            onChange={(e) => onChangeHandler(e, setTipsState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Defeated" />
        </Form.Group>
        
        <Button className="primary" type="submit" value="New Monster">Submit</Button>
      </Form>
    </div>
  );
}

export default NewMonsterFunc;
