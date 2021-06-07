import React from 'react';
import { Link } from 'react-router-dom';
import './VehicleCard.css'
const VehicleCard = (props) => {
    console.log(props);
    const {id, name, icon} = props.vehicle;
    return (
        <Link to={`/destination/${id}`} className="vehicle_card">
            <img src={icon} alt={name} className="vehicle_icon" />
            <h2 className="vehicle_name">{name}</h2>
        </Link>
    );
};

export default VehicleCard;
 