import React from 'react';
import './UpcomingLaunches.css';

const UpcomingLaunches = () => {
  // Mock data for upcoming launches
  const upcomingVehicles = [
    {
      id: 1,
      name: "Okinawa iPraise+ Plus",
      brand: "Okinawa",
      type: "Electric Scooter",
      expectedLaunch: "October 2025",
      price: "₹98,000 - ₹1,05,000",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
      description: "The upgraded version of the popular iPraise+ with improved battery and features."
    },
    {
      id: 2,
      name: "TVS Raider 125",
      brand: "TVS",
      type: "Motorcycle",
      expectedLaunch: "November 2025",
      price: "₹1,10,000 - ₹1,20,000",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "A powerful 125cc motorcycle with street fighter styling."
    },
    {
      id: 3,
      name: "Royal Enfield Meteor 350",
      brand: "Royal Enfield",
      type: "Cruiser",
      expectedLaunch: "December 2025",
      price: "₹2,10,000 - ₹2,30,000",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "The Meteor 350 offers a perfect blend of comfort and performance."
    },
    {
      id: 4,
      name: "Yamaha FZ-S Version 4",
      brand: "Yamaha",
      type: "Naked Bike",
      expectedLaunch: "January 2026",
      price: "₹1,25,000 - ₹1,35,000",
      image: "https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "The refreshed FZ-S with LED lighting and updated features."
    },
    // Adding more upcoming vehicles to show the 4-per-row layout
    {
      id: 5,
      name: "Honda Activa 7G",
      brand: "Honda",
      type: "Scooter",
      expectedLaunch: "February 2026",
      price: "₹85,000 - ₹95,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--connected-obd-2b1737697110094.jpg?q=80",
      description: "The next generation of India's most popular scooter with improved features."
    },
    {
      id: 6,
      name: "Bajaj Pulsar N250",
      brand: "Bajaj",
      type: "Naked Bike",
      expectedLaunch: "March 2026",
      price: "₹1,45,000 - ₹1,55,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/bajaj-pulsar-n250-dual-channel-abs-20241743061038674.jpg?q=80",
      description: "A 250cc street bike with aggressive styling and performance."
    },
    {
      id: 7,
      name: "Suzuki Hayabusa 2026",
      brand: "Suzuki",
      type: "Sports Bike",
      expectedLaunch: "April 2026",
      price: "₹18,00,000 - ₹20,00,000",
      image: "https://imgd.aeplcdn.com/1056x594/n/locm6fb_1826583.webp?q=80&wm=3",
      description: "The legendary Hayabusa gets a major update for 2026."
    },
    {
      id: 8,
      name: "KTM Duke 390 2026",
      brand: "KTM",
      type: "Naked Bike",
      expectedLaunch: "May 2026",
      price: "₹3,20,000 - ₹3,50,000",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/ktm-select-model-atlantic-blue-1694407102580.png?q=80",
      description: "The popular Duke 390 with updated engine and electronics."
    },
    // Adding 4 more upcoming vehicles
    {
      id: 9,
      name: "Hero Splendor Plus Pro",
      brand: "Hero",
      type: "Motorcycle",
      expectedLaunch: "June 2026",
      price: "₹75,000 - ₹85,000",
      image: "https://imgd.aeplcdn.com/664x374/bw/models/hero-splendor-pro-self-spoke-475.jpg?20190103151915&q=80",
      description: "The iconic Splendor gets a modern upgrade with fuel injection and LED lighting."
    },
    {
      id: 10,
      name: "Okaya iPraise+ Max",
      brand: "Okaya",
      type: "Electric Scooter",
      expectedLaunch: "July 2026",
      price: "₹1,10,000 - ₹1,20,000",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
      description: "High-performance electric scooter with extended range and fast charging."
    },
    {
      id: 11,
      name: "TVS Jupiter 110",
      brand: "TVS",
      type: "Scooter",
      expectedLaunch: "August 2026",
      price: "₹65,000 - ₹75,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
      description: "Economical and efficient 110cc scooter with improved mileage."
    },
    {
      id: 12,
      name: "Harley-Davidson Street Bob 2026",
      brand: "Harley-Davidson",
      type: "Cruiser",
      expectedLaunch: "September 2026",
      price: "₹15,00,000 - ₹16,00,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--billiard-gray1755509084997.jpg?q=80",
      description: "The iconic Street Bob with updated engine and modern features."
    },
    // Adding 4 more vehicles to complete 4 rows of 4 vehicles each
    {
      id: 13,
      name: "Bajaj Chetak",
      brand: "Bajaj",
      type: "Electric Scooter",
      expectedLaunch: "October 2026",
      price: "₹1,25,000 - ₹1,35,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/bajaj-chetak-30011750149309517.jpg?q=80",
      description: "Premium electric scooter with retro styling and modern technology."
    },
    {
      id: 14,
      name: "Yamaha MT-15 V2",
      brand: "Yamaha",
      type: "Naked Bike",
      expectedLaunch: "November 2026",
      price: "₹1,45,000 - ₹1,55,000",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-metallic-black-2023-1680847548270.png?q=80",
      description: "Street fighter with aggressive styling and advanced features."
    },
    {
      id: 15,
      name: "Royal Enfield Classic 350",
      brand: "Royal Enfield",
      type: "Cruiser",
      expectedLaunch: "December 2026",
      price: "₹1,95,000 - ₹2,10,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--redditch1738919737719.jpg?q=80",
      description: "The timeless Classic 350 with modern upgrades and improved performance."
    },
    {
      id: 16,
      name: "Suzuki Access 125",
      brand: "Suzuki",
      type: "Scooter",
      expectedLaunch: "January 2027",
      price: "₹80,000 - ₹90,000",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/suzuki-access-125-standard1738074352591.jpg?q=80",
      description: "Refined 125cc scooter with improved features and better mileage."
    }
  ];

  // Handle set reminder
  const handleSetReminder = (vehicle) => {
    // In a real app, this would save the reminder to a database or send a notification
    alert(`Reminder set for ${vehicle.name} launch in ${vehicle.expectedLaunch}!`);
  };

  return (
    <div className="upcoming-launches">
      <div className="container">
        <h1>Upcoming Two-Wheeler Launches</h1>
        <p>Stay updated with the latest two-wheeler launches in India</p>
        
        <div className="vehicles-grid">
          {upcomingVehicles.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-image">
                <img src={vehicle.image} alt={vehicle.name} />
                <div className="launch-date">
                  <span>{vehicle.expectedLaunch}</span>
                </div>
              </div>
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p className="brand">{vehicle.brand}</p>
                <p className="type">{vehicle.type}</p>
                <p className="price">Expected Price: {vehicle.price}</p>
                <p className="description">{vehicle.description}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSetReminder(vehicle)}
                >
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingLaunches;