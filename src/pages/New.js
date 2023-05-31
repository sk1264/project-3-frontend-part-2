import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './New.css';

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
      <Form onSubmit={onSubmitHandler} style={{ padding: '20px' }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label className="centered-label">Monster Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={nameState}
            onChange={(e) => onChangeHandler(e, setNameState)}
            className="text-center"
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label className="centered-label">Image</Form.Label>
          <Form.Control
            name="image"
            type="text"
            placeholder="Enter Image URL"
            value={imageState}
            onChange={(e) => onChangeHandler(e, setImageState)}
            className="text-center"
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label className="centered-label">Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Description"
            value={descriptionState}
            onChange={(e) => onChangeHandler(e, setDescriptionState)}
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label className="centered-label">Location Found</Form.Label>
          <Form.Control
            name="location"
            type="text"
            placeholder="Location"
            value={locationState}
            onChange={(e) => onChangeHandler(e, setLocationState)}
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label className="centered-label">Difficulty Rating</Form.Label>
          <Form.Control
            name="difficulty"
            type="text"
            placeholder="Difficulty"
            value={difficultyState}
            onChange={(e) => onChangeHandler(e, setDifficultyState)}
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTips">
          <Form.Label className="centered-label">Tips and Tricks</Form.Label>
          <Form.Control
            name="tips"
            type="text"
            placeholder="Tips"
            value={tipsState}
            onChange={(e) => onChangeHandler(e, setTipsState)}
            className="text-center"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Defeated" />
        </Form.Group>

        <Button className="primary centered-button" type="submit" value="New Monster">Submit</Button>
      </Form>
    </div>
  );
}

export default NewMonsterFunc;
