import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Edit() {

  const [monster, setMonsterState] = useState(null);
  const [number, setNumber] = useState(5);

  const [nameState, setNameState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  const [locationState, setLocationState] = useState('');
  const [difficultyState, setDifficultyState] = useState('');
  const [tipsState, setTipsState] = useState('');
  const [defeatedState, setDefeatedState] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://zelda-backend.onrender.com/monsters/${id}`; 

  useEffect(() => {
    const fetchMonster = async () => {
      console.log("going to fetch person with id of: ", id);
      try {
        const responseData = await fetch(url);
        const monsterData = await responseData.json(); 
        console.log(monsterData); 
        console.log(
          "Setting state, about to rerender..(not remount, just re-render)."
        );
        setMonsterState(monsterData);
      } catch (error) {
        console.error(error);
      }
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchMonster(); //fetching data and setting state
  }, [id, number]);

  useEffect(() => {
    if (monster) {
      setNameState(monster.name);
      setDescriptionState(monster.description);
      setLocationState(monster.common_locations);
      setDifficultyState(monster.difficulty);
      setTipsState(monster.tips);
      setDefeatedState(monster.defeated);
    }
  }, [monster]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const Edit = {
      name: nameState,
      description: descriptionState,
      common_locations: locationState,
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
            placeholder="Name"
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
            value={monster && monster.tips}
            onChange={(e) => onChangeHandler(e, setTipsState)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Defeated"
            checked={monster && monster.defeated}
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
  )
}

export default Edit;
