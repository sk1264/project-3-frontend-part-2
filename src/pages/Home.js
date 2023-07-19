import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import PixslyCard from '../components/PixslyCard';
import './Home.css';

function Home() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };


  const [pixslysData, setPixslysData] = useState([]);

  // const fetchPixslys = async () => {
  //   const response = await fetch("https://pixsly.onrender.com/pixsly");
  //   const data = await response.json();
  //   setPixslysData(data);
  // };

  const fetchPixslys = async () => {
    const response = await fetch("http://localhost:8080/pixslys");
    const data = await response.json();
    setPixslysData(data);
  };

  useEffect(() => {
    fetchPixslys();
  }, []);

  const pixslysMarkup = (
    <div style={centerStyle}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center" style={{ margin: '2 auto' }}>
        {pixslysData.map((pixsly, index) => (
          <Col key={index} className="mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={pixsly.image} />
              <Card.Body>
                <Card.Title>{pixsly.name}</Card.Title>
                <Button variant="success" as={Link} to={`/${pixsly._id}`}>See Details</Button>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item><strong>Description:</strong> {pixsly.description}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  let pixslyList;

  if (pixslysData) {
    pixslyList = pixslysData.map((pixsly, index) => {
      return <PixslyCard key={index} pixsly={pixsly} />;
    });
  }
  return (
    <div>
      {pixslysData.length > 0 ? pixslysMarkup : <div>Loading</div>}
    </div>
  );
}

export default Home;
