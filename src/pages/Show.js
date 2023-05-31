import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Show.css';
import Figure from 'react-bootstrap/Figure';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import './Show.css';

function Show() {
  const [monster, setMonsterState] = useState(null);

  const [number, setNumber] = useState(5);
 
  const { id } = useParams();
  console.log(useParams());
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

  return (
    <div className="show">
      {monster ? (
        <>
          <Figure className='img'>
            <Figure.Image className='img'
              width={271}
              height={280}
              alt="171x180"
              src={monster.image}
            />
            <Figure.Caption>
              <h2 className ='monsterName'>{monster.name}</h2>
            </Figure.Caption>
          </Figure>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Location:</Accordion.Header>
              <Accordion.Body>
                {monster.common_locations}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Description:</Accordion.Header>
              <Accordion.Body>
                {monster.description}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Difficulty:</Accordion.Header>
              <Accordion.Body>
                {monster.difficulty}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Tips:</Accordion.Header>
              <Accordion.Body>
                {monster.tips}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Defeated</Accordion.Header>
              <Accordion.Body>
                {monster.defeated ? '✅' : '❌'}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Link to={`/${monster._id}/edit`}>
            <Button>EDIT</Button>
          </Link>
        </>
      ) : (
        "...loading"
      )}
    </div>
  );
}

export default Show;
