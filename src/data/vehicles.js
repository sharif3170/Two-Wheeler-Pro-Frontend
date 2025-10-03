const vehicles = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 185000,
    image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/183389/classic-350-right-side-view-62.jpeg?isig=0&q=80&wm=3",
    specs: {
      engine: "349 cc",
      power: "20.2 bhp",
      mileage: "35 kmpl",
      weight: "195 kg",
      fuelTank: "13 L"
    }
  },
  {
    id: 2,
    name: "TVS Jupiter",
    brand: "TVS",
    type: "Scooter",
    fuelType: "Petrol",
    price: 72000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
    specs: {
      engine: "109.7 cc",
      power: "7.7 bhp",
      mileage: "62 kmpl",
      weight: "109 kg",
      fuelTank: "6 L"
    }
  },
  {
    id: 3,
    name: "Okinawa iPraise+",
    brand: "Okinawa",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 98000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "85 km",
      chargingTime: "4 hours",
      weight: "95 kg",
      battery: "48V 22Ah"
    }
  },
  {
    id: 4,
    name: "Yamaha FZ25",
    brand: "Yamaha",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 145000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-fz25.jpg?20190103151915&q=80",
    specs: {
      engine: "249 cc",
      power: "20.9 bhp",
      mileage: "45 kmpl",
      weight: "152 kg",
      fuelTank: "10 L"
    }
  },
  {
    id: 5,
    name: "Honda Activa 6G",
    brand: "Honda",
    type: "Scooter",
    fuelType: "Petrol",
    price: 75000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--connected-obd-2b1737697110094.jpg?q=80",
    specs: {
      engine: "109.51 cc",
      power: "7.68 bhp",
      mileage: "45 kmpl",
      weight: "107 kg",
      fuelTank: "5.3 L"
    }
  },
  {
    id: 6,
    name: "Okaya iPraise+",
    brand: "Okaya",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 95000,
    image:"https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "85 km",
      chargingTime: "4 hours",
      weight: "95 kg",
      battery: "48V 20Ah"
    }
  },
  {
    id: 7,
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 110000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-pewter-grey-1709101653302.png?q=80",
    specs: {
      engine: "199.5 cc",
      power: "24.13 bhp",
      mileage: "40 kmpl",
      weight: "152 kg",
      fuelTank: "12 L"
    }
  },
  {
    id: 8,
    name: "Suzuki Access 125",
    brand: "Suzuki",
    type: "Scooter",
    fuelType: "Petrol",
    price: 85000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/suzuki-access-125-standard1738074352591.jpg?q=80",
    specs: {
      engine: "124 cc",
      power: "8.58 bhp",
      mileage: "55 kmpl",
      weight: "108 kg",
      fuelTank: "5.5 L"
    }
  },
  {
    id: 9,
    name: "Ola S1 Pro",
    brand: "Ola",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 110000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ola-s1-pro-gen-3-3-kwh1738318416778.jpg?q=80",
    specs: {
      motor: "850 W",
      range: "181 km",
      chargingTime: "4.5 hours",
      weight: "115 kg",
      battery: "48V 30Ah"
    }
  },
  // Adding 10 more bikes
  {
    id: 10,
    name: "Hero Splendor Plus",
    brand: "Hero",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 65000,
    image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/15109/splendor-plus-right-side-view-2.png?isig=0&q=80&wm=3",
    specs: {
      engine: "97.2 cc",
      power: "8.0 bhp",
      mileage: "65 kmpl",
      weight: "110 kg",
      fuelTank: "10 L"
    }
  },
  {
    id: 11,
    name: "Bajaj Platina 100",
    brand: "Bajaj",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 55000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-black--blue-1671529556548.png?q=80",
    specs: {
      engine: "99.7 cc",
      power: "8.5 bhp",
      mileage: "60 kmpl",
      weight: "112 kg",
      fuelTank: "10 L"
    }
  },
  {
    id: 12,
    name: "TVS Apache RTR 160",
    brand: "TVS",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 98000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-apache-160-rm-drum-black-edition1732629216165.jpg?q=80",
    specs: {
      engine: "159.7 cc",
      power: "16.6 bhp",
      mileage: "45 kmpl",
      weight: "138 kg",
      fuelTank: "12 L"
    }
  },
  {
    id: 13,
    name: "Yamaha FZ-S V4",
    brand: "Yamaha",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 130000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-select-model-matte-black-1704795170909.png?q=80",
    specs: {
      engine: "149 cc",
      power: "12.2 bhp",
      mileage: "50 kmpl",
      weight: "135 kg",
      fuelTank: "10 L"
    }
  },
  {
    id: 14,
    name: "Honda CB Hornet 2.0",
    brand: "Honda",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 115000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard-obd-2b1740150415645.jpg?q=80",
    specs: {
      engine: "184.4 cc",
      power: "17.2 bhp",
      mileage: "40 kmpl",
      weight: "142 kg",
      fuelTank: "12 L"
    }
  },
  {
    id: 15,
    name: "Suzuki Gixxer SF",
    brand: "Suzuki",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 125000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--ride-connect-obd-2b1742989550749.jpg?q=80",
    specs: {
      engine: "155 cc",
      power: "14.8 bhp",
      mileage: "45 kmpl",
      weight: "135 kg",
      fuelTank: "12 L"
    }
  },
  {
    id: 16,
    name: "KTM Duke 200",
    brand: "KTM",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 175000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ktm-duke-200-standard1732631072395.jpg?q=80",
    specs: {
      engine: "199.5 cc",
      power: "25 bhp",
      mileage: "35 kmpl",
      weight: "159 kg",
      fuelTank: "13.5 L"
    }
  },
  {
    id: 17,
    name: "Royal Enfield Bullet 350",
    brand: "Royal Enfield",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 165000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/royalenfield-bullet-battalion-black1740992373327.jpg?q=80",
    specs: {
      engine: "349 cc",
      power: "19.1 bhp",
      mileage: "35 kmpl",
      weight: "191 kg",
      fuelTank: "15 L"
    }
  },
  {
    id: 18,
    name: "Harley-Davidson Street 750",
    brand: "Harley-Davidson",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 450000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/harleydavidson-street-750-standard20200616012038.jpg?q=80",
    specs: {
      engine: "749 cc",
      power: "48 bhp",
      mileage: "25 kmpl",
      weight: "230 kg",
      fuelTank: "12 L"
    }
  },
  {
    id: 19,
    name: "Kawasaki Ninja 300",
    brand: "Kawasaki",
    type: "Motorcycle",
    fuelType: "Petrol",
    price: 320000,
    image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/203966/ninja-300-right-side-view-4.jpeg?isig=0&q=80&wm=3",
    specs: {
      engine: "296 cc",
      power: "39 bhp",
      mileage: "30 kmpl",
      weight: "171 kg",
      fuelTank: "17 L"
    }
  },
  // Adding more scooters to have 10 in each row
  {
    id: 20,
    name: "TVS Ntorq 125",
    brand: "TVS",
    type: "Scooter",
    fuelType: "Petrol",
    price: 82000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-ntorq-125-disc1725629749318.jpg?q=80",
    specs: {
      engine: "124.8 cc",
      power: "9.5 bhp",
      mileage: "45 kmpl",
      weight: "110 kg",
      fuelTank: "5.8 L"
    }
  },
  {
    id: 21,
    name: "Honda Dio",
    brand: "Honda",
    type: "Scooter",
    fuelType: "Petrol",
    price: 70000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard-20251736863978494.jpg?q=80",
    specs: {
      engine: "109.51 cc",
      power: "7.68 bhp",
      mileage: "55 kmpl",
      weight: "105 kg",
      fuelTank: "5.3 L"
    }
  },
  {
    id: 22,
    name: "Suzuki Burgman Street",
    brand: "Suzuki",
    type: "Scooter",
    fuelType: "Petrol",
    price: 95000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard-obd-2b1742971360166.jpg?q=80",
    specs: {
      engine: "125 cc",
      power: "8.7 bhp",
      mileage: "42 kmpl",
      weight: "112 kg",
      fuelTank: "6.1 L"
    }
  },
  {
    id: 23,
    name: "Yamaha Fascino 125",
    brand: "Yamaha",
    type: "Scooter",
    fuelType: "Petrol",
    price: 85000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--drum-hybrid1755152120249.jpg?q=80",
    specs: {
      engine: "125 cc",
      power: "8.2 bhp",
      mileage: "50 kmpl",
      weight: "115 kg",
      fuelTank: "5.2 L"
    }
  },
  // Adding more scooters to fill all four rows
  {
    id: 24,
    name: "Hero Maestro Edge 125",
    brand: "Hero",
    type: "Scooter",
    fuelType: "Petrol",
    price: 65000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/hero-maestro-edge-125.jpg?20191305145256&q=80",
    specs: {
      engine: "125 cc",
      power: "9.5 bhp",
      mileage: "52 kmpl",
      weight: "112 kg",
      fuelTank: "5.5 L"
    }
  },
  {
    id: 25,
    name: "TVS Wego",
    brand: "TVS",
    type: "Scooter",
    fuelType: "Petrol",
    price: 60000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/tvs-wego-drum20190723132409.jpg?q=80",
    specs: {
      engine: "110 cc",
      power: "7.8 bhp",
      mileage: "58 kmpl",
      weight: "109 kg",
      fuelTank: "5.2 L"
    }
  },
  {
    id: 26,
    name: "Honda Grazia",
    brand: "Honda",
    type: "Scooter",
    fuelType: "Petrol",
    price: 78000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/honda-grazia.jpg?20190103151915&q=80",
    specs: {
      engine: "125 cc",
      power: "9.2 bhp",
      mileage: "50 kmpl",
      weight: "111 kg",
      fuelTank: "5.3 L"
    }
  },
  {
    id: 27,
    name: "Suzuki LetsUp",
    brand: "Suzuki",
    type: "Scooter",
    fuelType: "Petrol",
    price: 58000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/suzuki-lets.jpg?20190103151915&q=80",
    specs: {
      engine: "113 cc",
      power: "8.8 bhp",
      mileage: "55 kmpl",
      weight: "107 kg",
      fuelTank: "5.0 L"
    }
  },
  {
    id: 28,
    name: "Yamaha Ray ZR",
    brand: "Yamaha",
    type: "Scooter",
    fuelType: "Petrol",
    price: 82000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--drum-hybrid1755152324780.jpg?q=80",
    specs: {
      engine: "113 cc",
      power: "9.0 bhp",
      mileage: "52 kmpl",
      weight: "110 kg",
      fuelTank: "5.1 L"
    }
  },
  {
    id: 29,
    name: "Okaya iPraise+ Plus",
    brand: "Okaya",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 98000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "90 km",
      chargingTime: "4 hours",
      weight: "96 kg",
      battery: "48V 24Ah"
    }
  },
  {
    id: 30,
    name: "Okinawa iPraise+",
    brand: "Okinawa",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 102000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "95 km",
      chargingTime: "4.5 hours",
      weight: "98 kg",
      battery: "48V 26Ah"
    }
  },
  {
    id: 31,
    name: "TVS Jupiter Grande",
    brand: "TVS",
    type: "Scooter",
    fuelType: "Petrol",
    price: 75000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/tvs-jupiter-grande.jpg?20190103151915&q=80",
    specs: {
      engine: "110 cc",
      power: "8.2 bhp",
      mileage: "50 kmpl",
      weight: "113 kg",
      fuelTank: "6.0 L"
    }
  },
  {
    id: 32,
    name: "Honda Activa 5G",
    brand: "Honda",
    type: "Scooter",
    fuelType: "Petrol",
    price: 72000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/honda-activa-5g-standard20190722180435.jpg?q=80",
    specs: {
      engine: "110 cc",
      power: "8.5 bhp",
      mileage: "48 kmpl",
      weight: "108 kg",
      fuelTank: "5.3 L"
    }
  },
  {
    id: 33,
    name: "Suzuki Access 125 Fi",
    brand: "Suzuki",
    type: "Scooter",
    fuelType: "Petrol",
    price: 88000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/suzuki-access-125-standard1738074352591.jpg?q=80",
    specs: {
      engine: "125 cc",
      power: "9.2 bhp",
      mileage: "52 kmpl",
      weight: "110 kg",
      fuelTank: "5.5 L"
    }
  },
  // Adding 10 more electric vehicles
  {
    id: 36,
    name: "Okaya iPraise+",
    brand: "Okaya",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 98000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "85 km",
      chargingTime: "4 hours",
      weight: "95 kg",
      battery: "48V 22Ah"
    }
  },
  {
    id: 37,
    name: "Okinawa iPraise+",
    brand: "Okinawa",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 102000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "90 km",
      chargingTime: "4.5 hours",
      weight: "96 kg",
      battery: "48V 24Ah"
    }
  },
  {
    id: 38,
    name: "TVS iQube Electric",
    brand: "TVS",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 115000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--22-kwh1747293190144.jpg?q=80",
    specs: {
      motor: "250 W",
      range: "95 km",
      chargingTime: "5 hours",
      weight: "98 kg",
      battery: "48V 26Ah"
    }
  },
  {
    id: 39,
    name: "Ola S1",
    brand: "Ola",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 120000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ola-s1-pro-gen-3-3-kwh1738318416778.jpg?q=80",
    specs: {
      motor: "850 W",
      range: "181 km",
      chargingTime: "4.5 hours",
      weight: "115 kg",
      battery: "48V 30Ah"
    }
  },
  {
    id: 40,
    name: "Hero Electric Photon",
    brand: "Hero Electric",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 95000,
    image: "https://imgd.aeplcdn.com/664x374/bw/models/heroelectric-photon.jpg?20191401111054&q=80",
    specs: {
      motor: "250 W",
      range: "75 km",
      chargingTime: "4 hours",
      weight: "92 kg",
      battery: "48V 20Ah"
    }
  },
  {
    id: 41,
    name: "Ather 450X",
    brand: "Ather",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 150000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ather-450x-29-kwh-20251735974741344.jpg?q=80",
    specs: {
      motor: "6000 W",
      range: "150 km",
      chargingTime: "5.5 hours",
      weight: "125 kg",
      battery: "48V 36Ah"
    }
  },
  {
    id: 42,
    name: "Revolt RV400",
    brand: "Revolt",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 130000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/revolt-select-model-pacific-blue-1706178230423.png?q=80",
    specs: {
      motor: "3000 W",
      range: "150 km",
      chargingTime: "4.5 hours",
      weight: "110 kg",
      battery: "48V 30Ah"
    }
  },
  {
    id: 43,
    name: "Okaya iPraise+ Plus",
    brand: "Okaya",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 105000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "95 km",
      chargingTime: "4 hours",
      weight: "97 kg",
      battery: "48V 25Ah"
    }
  },
  {
    id: 44,
    name: "Okinawa iPraise+",
    brand: "Okinawa",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 108000,
    image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-black-1689835990627.png?q=80",
    specs: {
      motor: "250 W",
      range: "100 km",
      chargingTime: "5 hours",
      weight: "99 kg",
      battery: "48V 28Ah"
    }
  },
  {
    id: 45,
    name: "Yamaha Fascino 125 Hybrid",
    brand: "Yamaha",
    type: "Electric Scooter",
    fuelType: "Electric",
    price: 125000,
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--drum-hybrid1755152120249.jpg?q=80",
    specs: {
      motor: "500 W",
      range: "120 km",
      chargingTime: "4.5 hours",
      weight: "105 kg",
      battery: "48V 30Ah"
    }
  }
];

export default vehicles;
