import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Edit() {
  const [nameState, setNameState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  const [locationState, setLocationState] = useState('');
  const [difficultyState, setDifficultyState] = useState('');
  const [tipsState, setTipsState] = useState('');
  const [defeatedState, setDefeatedState] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const Edit = {
      name: nameState,
      description: descriptionState,
      location: locationState,
      difficulty: difficultyState,
      tips: tipsState,
      defeated: defeatedState,
    };
    console.log(Edit);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edit),
    };

    const url = `https://zelda-backend.onrender.com/monsters/${id}`;

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

    const url = `https://zelda-backend.onrender.com/monsters/${id}`;

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
            placeholder="Enter name"
            value={nameState}
            onChange={(e) => onChangeHandler(e, setNameState)}
          />
          <Form.Text className="text-muted">Add monster name/color</Form.Text>
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

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location Found</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            value={locationState}
            onChange={(e) => onChangeHandler(e, setLocationState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
            type="text"
            placeholder="Difficulty"
            value={difficultyState}
            onChange={(e) => onChangeHandler(e, setDifficultyState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTips">
          <Form.Label>Tips and Tricks</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tips"
            value={tipsState}
            onChange={(e) => onChangeHandler(e, setTipsState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Defeated"
            checked={defeatedState}
            onChange={(e) => setDefeatedState(e.target.checked)}
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
  );
}

export default Edit;
