import React from 'react';
import VehicleCard from '../VehicleCard/VehicleCard';
import vehiclesData from '../vehiclesData.json';
import './Home.css'
const Home = () => {
    const vehicles = vehiclesData;
    console.log(vehicles);
    return (
        <section className="home">
            <div className="container">
                <div className="vehicles">
                    {
                        vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle}></VehicleCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;

