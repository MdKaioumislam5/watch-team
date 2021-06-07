import React from 'react';
import peopleicon from '../peopleicon.png';
import './SearchCard.css'
const SearchCard = (props) => {
    const {vehicle, seat} = props;
    const {name, icon, seatRate} = vehicle;
    return (
        <div className="search_card">
            <img src={icon} alt={name} className="vehicle_icon" />
            <h3 className="vehicle_name">{name}</h3>
            <h3 className="vehicle_seat"><img src={peopleicon} alt="seat" />{seat}</h3>
            <h3 className="vehicle_fare">${seat * seatRate}</h3>
            
        </div>
    );
};

export default SearchCard;