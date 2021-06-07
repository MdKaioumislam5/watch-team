import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import vehiclesData from '../vehiclesData.json';
import SearchCard from '../SearchCard/SearchCard';

const Destination = () => {
    const [search, setSearch] = useState(true);
    const [pickFrom, setPickFrom] = useState('');
    const [pickTo, setPickTo] = useState('');
    const { id } = useParams();
    const currentVehicle = vehiclesData.find(vehicle => vehicle.id === id);
    console.log(currentVehicle);

    const handleSearch = () => {
        setSearch(false);
    }
    return (
        <section className="destination">
            <div className="container">
                <div className="destination_content">
                    <div className="destination_search-box">
                        {
                            search && <form onSubmit={handleSearch} className="destination_form">
                                <div className="input_group">
                                    <label htmlFor="pickFrom">Pick From</label>
                                    <input onChange={(e) => setPickFrom(e.target.value)} type="text" placeholder="Gulshan 1" id="pickFrom" />
                                </div>
                                <div className="input_group">
                                    <label htmlFor="pickTo">Pick To</label>
                                    <input onChange={(e) => setPickTo(e.target.value)} type="text" placeholder="Mirpur 1" id="pickTo" />
                                </div>
                                <input onClick={() => setSearch(true)} className="btn_danger" type="submit" value="Search" />
                            </form>
                        }
                        {
                            !search && <div className="location">
                                <div className="location_wrap">
                                    <h2 className="location_from">{pickFrom}
                                    </h2>
                                    <h2 className="location_to">{pickTo}
                                    </h2>
                                </div>
                                {
                                    currentVehicle.seat.map((seat, ind) => <SearchCard key={ind} vehicle={currentVehicle} seat={seat} />)
                                }
                                <button onClick={() => setSearch(false)} className="btn_danger">Back to Search</button>
                            </div>
                        }
                        <div className="destination_map-box">
                            <iframe className="destination_map" title="Gulshan 1" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58686.37781150996!2d89.20859365!3d23.1739002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3755c79ebfc24eab%3A0xea7dab563f12457a!2sGulshan%201%2C%20Dhaka!3m2!1d23.782062399999997!2d90.4160527!4m5!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-1%2C%20Dhaka!3m2!1d23.795603699999997!2d90.3536548!5e0!3m2!1sen!2sbd!4v1622816026696!5m2!1sen!2sbd" width="600" height="450" allowFullScreen=""></iframe>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Destination;