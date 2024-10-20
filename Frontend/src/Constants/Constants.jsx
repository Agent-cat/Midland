export const Navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Buy",
    link: "/buy",
  },
  {
    name: "Rent",
    link: "/rent",
  },
  {
    name: "Commercial",
    link: "/commercial",
  },
  {
    name: "Favourites",
    link: "/favourites",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
];

export const PropertyData = [
  {
    name: "Luxury Villa",
    id: 1,
    type: "villas",
    sqft: 3500,
    location: "vijayawada",
    bhk: 4,
    isFavourite: false,
    address: "123 Palm Street, Vijayawada",
    ownerName: "John Doe",
    saleOrRent: "sale",
    price: 15000000,
    details: "Spacious 4BHK villa with modern amenities",
    dimensions: "60x80 ft",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview:
      "A beautiful villa in a prime location with lush green surroundings",
    amenities: ["Swimming Pool", "Garden", "Gym", "Security"],
    locationMap: "https://maps.example.com/luxury-villa",
    bedroom: 4,
    bathroom: 4,
    kitchen: 1,
  },
  {
    name: "City Center Apartment",
    id: 2,
    type: "flats",
    sqft: 1200,
    location: "guntur",
    bhk: 2,
    isFavourite: true,
    address: "456 Main Road, Guntur",
    ownerName: "Jane Smith",
    saleOrRent: "rent",
    price: 15000,
    details: "Modern 2BHK apartment in the heart of the city",
    dimensions: "30x40 ft",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview:
      "Conveniently located apartment with all necessary amenities nearby",
    amenities: ["Parking", "Elevator", "24/7 Water Supply"],
    locationMap: "https://maps.example.com/city-center-apartment",
    bedroom: 2,
    bathroom: 2,
    kitchen: 1,
  },
  {
    name: "Commercial Shop",
    id: 3,
    type: "shops",
    sqft: 800,
    location: "amravathi",
    bhk: 0,
    isFavourite: false,
    address: "789 Market Street, Amravathi",
    ownerName: "Robert Johnson",
    saleOrRent: "sale",
    price: 5000000,
    details: "Prime location shop suitable for retail business",
    dimensions: "20x40 ft",
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview: "Excellent opportunity for business in a high-footfall area",
    amenities: ["Power Backup", "CCTV", "Storage Room"],
    locationMap: "https://maps.example.com/commercial-shop",
    bedroom: 0,
    bathroom: 1,
    kitchen: 0,
  },
  {
    name: "Farmhouse Retreat",
    id: 4,
    type: "farmhouse",
    sqft: 5000,
    location: "vijayawada",
    bhk: 5,
    isFavourite: false,
    address: "101 Rural Road, Vijayawada Outskirts",
    ownerName: "Emily Brown",
    saleOrRent: "sale",
    price: 25000000,
    details: "Spacious farmhouse with organic garden and livestock facilities",
    dimensions: "100x200 ft",
    images: [
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview:
      "Perfect getaway from city life with ample space for farming and relaxation",
    amenities: [
      "Organic Garden",
      "Livestock Facilities",
      "Solar Power",
      "Well",
    ],
    locationMap: "https://maps.example.com/farmhouse-retreat",
    bedroom: 5,
    bathroom: 5,
    kitchen: 1,
  },
  {
    name: "Residential Plot",
    id: 5,
    type: "residential land",
    sqft: 2400,
    location: "guntur",
    bhk: 0,
    isFavourite: false,
    address: "202 New Layout, Guntur",
    ownerName: "Michael Wilson",
    saleOrRent: "sale",
    price: 8000000,
    details: "Prime residential plot in a developing area",
    dimensions: "40x60 ft",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    ],
    overview:
      "Excellent investment opportunity in a rapidly growing residential area",
    amenities: ["Electricity Connection", "Water Connection", "Road Access"],
    locationMap: "https://maps.example.com/residential-plot",
    bedroom: 0,
    bathroom: 0,
    kitchen: 0,
  },
  {
    name: "Penthouse Suite",
    id: 6,
    type: "flats",
    sqft: 2800,
    location: "vijayawada",
    bhk: 4,
    isFavourite: true,
    address: "303 Skyline Towers, Vijayawada",
    ownerName: "Sarah Davis",
    saleOrRent: "rent",
    price: 50000,
    details: "Luxurious 4BHK penthouse with panoramic city views",
    dimensions: "50x56 ft",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview:
      "Experience luxury living with stunning views of the city skyline",
    amenities: [
      "Private Terrace",
      "Jacuzzi",
      "Home Theater",
      "Concierge Service",
    ],
    locationMap: "https://maps.example.com/penthouse-suite",
    bedroom: 4,
    bathroom: 4,
    kitchen: 1,
  },
  {
    name: "Agricultural Land",
    id: 7,
    type: "agriculture land",
    sqft: 217800, // 5 acres
    location: "amravathi",
    bhk: 0,
    isFavourite: false,
    address: "Rural Zone, Amravathi Outskirts",
    ownerName: "David Thompson",
    saleOrRent: "sale",
    price: 10000000,
    details: "Fertile agricultural land suitable for various crops",
    dimensions: "5 acres",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    ],
    overview: "Prime agricultural land with good irrigation facilities",
    amenities: ["Irrigation Well", "Farmhouse", "Storage Shed"],
    locationMap: "https://maps.example.com/agricultural-land",
    bedroom: 0,
    bathroom: 0,
    kitchen: 0,
  },
  {
    name: "Modern Office Space",
    id: 8,
    type: "shops",
    sqft: 1500,
    location: "vijayawada",
    bhk: 0,
    isFavourite: false,
    address: "404 Tech Park, Vijayawada",
    ownerName: "Lisa Anderson",
    saleOrRent: "rent",
    price: 75000,
    details: "Contemporary office space in a prime business district",
    dimensions: "30x50 ft",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    ],
    overview: "Ideal for startups and small businesses with modern amenities",
    amenities: [
      "High-speed Internet",
      "Conference Room",
      "Cafeteria",
      "Parking",
    ],
    locationMap: "https://maps.example.com/modern-office-space",
    bedroom: 0,
    bathroom: 2,
    kitchen: 1,
  },
  {
    name: "Riverside Bungalow",
    id: 9,
    type: "houses",
    sqft: 4000,
    location: "guntur",
    bhk: 5,
    isFavourite: true,
    address: "505 Riverside Lane, Guntur",
    ownerName: "Thomas Clark",
    saleOrRent: "sale",
    price: 30000000,
    details: "Elegant 5BHK bungalow with river views and spacious garden",
    dimensions: "70x90 ft",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    overview: "Luxurious living with scenic river views and modern comforts",
    amenities: ["Private Pool", "Garden", "Home Office", "Guest House"],
    locationMap: "https://maps.example.com/riverside-bungalow",
    bedroom: 5,
    bathroom: 5,
    kitchen: 1,
  },
  {
    name: "Budget Studio Apartment",
    id: 10,
    type: "flats",
    sqft: 500,
    location: "amravathi",
    bhk: 1,
    isFavourite: false,
    address: "606 College Road, Amravathi",
    ownerName: "Jennifer Lee",
    saleOrRent: "rent",
    price: 8000,
    details:
      "Cozy 1BHK studio apartment ideal for students or young professionals",
    dimensions: "20x25 ft",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    ],
    overview:
      "Affordable living solution in a convenient location near educational institutions",
    amenities: ["Furnished", "Wi-Fi", "Communal Laundry", "Bike Parking"],
    locationMap: "https://maps.example.com/budget-studio-apartment",
    bedroom: 1,
    bathroom: 1,
    kitchen: 1,
  },
];