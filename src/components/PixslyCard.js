import React from 'react'
import './PixslyCard.css'
		  
function PixslyCard(props) {
    const { pixsly } = props;
    return (
		<div className="pixslyCard">
            <h3>{pixsly.name}</h3>
            <h3>{pixsly.image}</h3>
            <h3>{pixsly.decription}</h3>
		</div>
	)
}
		  
export default PixslyCard