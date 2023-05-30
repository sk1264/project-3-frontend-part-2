import React from 'react'
import './MonsterCard.css'
		  
function MonsterCard(props) {
    const { monster } = props;
    return (
		<div className="monsterCard">
            <h3>{monster.name}</h3>
            <h3>{monster.image}</h3>
            <h3>{monster.location}</h3>
            <h3>{monster.decription}</h3>
            <h3>{monster.difficulty}</h3>
            <h3>{monster.tips}</h3>
		</div>
	)
}
		  
export default MonsterCard
		  