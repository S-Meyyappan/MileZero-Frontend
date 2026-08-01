const vehicles = [
    {
        "id": 2,
        "manufacturer": "Toyota",
        "model": "Hilux",
        "manufacturingYear": 2024,
        "fuelType": "DIESEL",
        "transmission": "AT",
        "driveType": "AWD",
        "withAc": true,
        "seatCount": 5,
        "luggageCapacity": 400,
        "currentOdometer": 12296,
        "features": [
            {
                "id": 1,
                "name": "Adaptive Cruise Control",
                "featureGroup": "SAFETY",
                "description": "Automatically adjusts the vehicle speed to maintain a safe distance from vehicles ahead.",
                "isActive": true
            },
            {
                "id": 4,
                "name": "Surround View Camera",
                "featureGroup": "SAFETY",
                "description": "Provides a 360-degree view around the vehicle for easier parking.",
                "isActive": true
            },
            {
                "id": 8,
                "name": "Autonomous Emergency Braking",
                "featureGroup": "SAFETY",
                "description": "Automatically applies brakes to prevent low-speed collisions.",
                "isActive": true
            }
        ]
    },
    {
        "id": 8,
        "manufacturer": "Hyundai",
        "model": "Verna",
        "manufacturingYear": 2024,
        "fuelType": "PETROL",
        "transmission": "IVT",
        "driveType": "AWD",
        "withAc": false,
        "seatCount": 5,
        "luggageCapacity": 400,
        "currentOdometer": 11717,
        "features": [
            {
                "id": 1,
                "name": "Adaptive Cruise Control",
                "featureGroup": "SAFETY",
                "description": "Automatically adjusts the vehicle speed to maintain a safe distance from vehicles ahead.",
                "isActive": true
            },
            {
                "id": 2,
                "name": "Panoramic Sunroof",
                "featureGroup": "COMFORT",
                "description": "Dual-pane glass sunroof with power tilt and slide functionality.",
                "isActive": true
            },
            {
                "id": 3,
                "name": "Blind Spot Monitoring",
                "featureGroup": "SAFETY",
                "description": "Alerts the driver when vehicles are detected in adjacent lanes.",
                "isActive": true
            },
            {
                "id": 5,
                "name": "Ventilated Seats",
                "featureGroup": "COMFORT",
                "description": "Heated and ventilated front seats for maximum seasonal comfort.",
                "isActive": true
            },
            {
                "id": 8,
                "name": "Autonomous Emergency Braking",
                "featureGroup": "SAFETY",
                "description": "Automatically applies brakes to prevent low-speed collisions.",
                "isActive": true
            }
        ]
    },
    {
        "id": 15,
        "manufacturer": "Honda",
        "model": "City",
        "manufacturingYear": 2024,
        "fuelType": "PETROL",
        "transmission": "CVT",
        "driveType": "AWD",
        "withAc": true,
        "seatCount": 5,
        "luggageCapacity": 400,
        "currentOdometer": 11140,
        "features": [
            {
                "id": 1,
                "name": "Adaptive Cruise Control",
                "featureGroup": "SAFETY",
                "description": "Automatically adjusts the vehicle speed to maintain a safe distance from vehicles ahead.",
                "isActive": true
            },
            {
                "id": 3,
                "name": "Blind Spot Monitoring",
                "featureGroup": "SAFETY",
                "description": "Alerts the driver when vehicles are detected in adjacent lanes.",
                "isActive": true
            },
            {
                "id": 7,
                "name": "Heads-up Display",
                "featureGroup": "TECHNOLOGY",
                "description": "Displays speed and navigation details directly onto the windshield.",
                "isActive": true
            },
            {
                "id": 8,
                "name": "Autonomous Emergency Braking",
                "featureGroup": "SAFETY",
                "description": "Automatically applies brakes to prevent low-speed collisions.",
                "isActive": true
            }
        ]
    }
]

export default vehicles