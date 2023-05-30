import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import MonsterCard from '../components/MonsterCard';

function Home() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };

  const zeldaFontStyle = {
    fontFamily: 'ZeldaFont',
  };

  const [monstersData, setMonstersData] = useState([]);

  const fetchMonsters = async () => {
    const response = await fetch("https://zelda-backend.onrender.com/monsters");
    const data = await response.json();
    setMonstersData(data);
  };

  useEffect(() => {
    fetchMonsters();
  }, []);

  const monstersMarkup = (
    <div style={centerStyle}>
      <h1 style={zeldaFontStyle}>Felled Monsters of Hyrule</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center" style={{ margin: '2 auto' }}>
        {monstersData.map((monster, index) => (
          <Col key={index} className="mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={monster.image} />
              <Card.Body>
                <Card.Title>{monster.name}</Card.Title>
                <Button variant="success" as={Link} to={`/show/${monster.id}`}>See Details</Button>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{monster.difficulty}</ListGroup.Item>
                <ListGroup.Item>{monster.tips}</ListGroup.Item>
                <ListGroup.Item>{monster.date}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  let monsterList;

  if (monstersData) {
    monsterList = monstersData.map((monster, index) => {
      return <MonsterCard key={index} monster={monster} />;
    });
  }
  return (
    <div>
      {monstersData.length > 0 ? monstersMarkup : <div>Loading</div>}
    </div>
  );
}

export default Home;
