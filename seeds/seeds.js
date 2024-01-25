const mongoose = require('mongoose');
const Bridge = require('../models/bridge'); // Import your Bridge model
const { dbUrl } = require('../app.js');

const bridgeNames = [
  "Quantum Leap Viaduct",
  "Celestial Artery Bridge",
  "Ethereal Rainbow Crossing",
  "Time-Warp Trestle",
  "Infinity Spire Bridge",
  "Starlight Symphony Overpass",
  "Galactic Gateway Arch",
  "Dreamweaver Skywalk",
  "Nebula Nexus Bridge",
  "Enchanted Serenity Suspension Bridge",
  "Dimensional Destiny Causeway",
  "Cosmic Cascade Connector",
  "Aurora Borealis Skybridge",
  "Whimsical Wonderland Walkway",
  "Mystical Mirage Overpass",
  "Oracle of Obscurity Bridge",
  "Quasar Quest Arched Path",
  "Futuristic Fantasy Footbridge",
  "Zephyr Ziggurat Crossing",
  "Psychedelic Portal Passage",
  "Lunar Labyrinth Link",
  "Vortex Voyage Viaduct",
  "Surreal Symphony Skyway",
  "Abyssal Abyss Arch",
  "Interstellar Illusion Incline",
  "Whirlwind Wonder Bridge",
  "Hypnotic Horizon Highway",
  "Celestial Citadel Causeway",
  "Melody of Madness Suspension Bridge",
  "Aetherial Amazement Arched Path",
  "Vivid Visionary Viaduct",
  "Serendipitous Spiral Skywalk",
  "Warping Whimsy Walkway",
  "Stellar Synchronicity Suspension Bridge",
  "Otherworldly Odyssey Overpass",
  "Epic Ecliptic Elevated Path",
  "Tranquil Trajectory Trestle",
  "Enigmatic Elevation Express",
  "Majestic Mirage Monorail",
  "Bewildering Breeze Bridge",
  "Astral Ascent Arched Avenue",
  "Vibrant Vision Vista",
  "Timeless Transcendence Trail",
  "Harmony of Haze Highway",
  "Celestial Circuit Catwalk",
  "Supernova Spiral Stroll",
  "Labyrinth of Luminescence Link",
  "Funky Flux Footbridge",
];



// Famous Architects' Names
const architects = [
  "Elena Rodriguez",
  "Sebastian Chen",
  "Aria Thompson",
  "Isaac Patel",
  "Lila Wang",
  "Dominic Lee",
  "Zoe Lewis",
  "Nolan Davis",
  "Avery Garcia",
  "Adriana Miller",
  "Lucas Turner",
  "Eva Smith",
  "Oscar Brown",
  "Sofia Martinez",
  "Elijah Wilson",
  "Amelia Harris",
  "Leo Taylor",
  "Mia Johnson",
  "Caleb Anderson",
  "Isabella Clark",
  "Henry White",
  "Ella Moore",
  "Jack Martinez",
  "Sophia Taylor",
  "Daniel Wilson",
  "Aria Johnson",
  "Oliver Harris",
  "Ava Turner",
  "Mason Davis",
  "Emma Miller",
  "Liam Lee",
  "Grace Smith",
  "Noah White",
  "Chloe Anderson",
  "Logan Turner",
  "Lily Brown",
  "Ethan Clark",
  "Harper Moore",
  "Benjamin Taylor",
  "Avery Wilson",
  "Scarlett Smith",
  "Elijah Lewis",
  "Mia Moore",
  "James Johnson",
  "Charlotte Garcia",
  "Olivia Turner",
  "Lucas Taylor",
  "Sophie Brown"
];



const bridgeImages = [
  'https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765035/tapio-haaja-r1r7KT3BCPs-unsplash_habwib.jpg','https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765034/dhaval-tejlavwala-ZYD9y6tjjV0-unsplash_lopyhx.jpg','https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765032/renate-dreyer-iD0l6ctD-K4-unsplash_plpiei.jpg',
  'https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765032/the-gallery-h9DTS9fbRzY-unsplash_jjvknp.jpg','https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765031/pascal-bernardon-EqLi3REA0mU-unsplash_h6c6rr.jpg','https://res.cloudinary.com/dt6vwovu0/image/upload/v1700765031/shivam-tripathi-IqlR22SCX9U-unsplash_npwkdg.jpg']

// connecting to database  
mongoose.connect(dbUrl)   
    .then(() => {
        console.log('Mongo connection open');
    })
    .catch(err => {
        console.log('Oh no, Mongo express error');
        console.log(err);
    })

const seedBridges = async() => {
  await Bridge.deleteMany({});
  // Create a new instance of the Bridge model
  for(let i = 0; i<5;i++) {
    const random = Math.floor(Math.random() * 50) ;
    const randomImg1 = Math.floor(Math.random() * 6);
    const randomImg2 = Math.floor(Math.random() * 6);
    const randomImg3 = Math.floor(Math.random() * 6);
    const newBridge = new Bridge({
      name: bridgeNames[random],
      images: [bridgeImages[randomImg1],bridgeImages[randomImg2],bridgeImages[randomImg3]],
      cost: Math.floor(Math.random() * (476 - 200)) + 200,
      durationMonths: Math.floor(Math.random() * (50 - 24 + 1)) + 24,
      architect: architects[random],
      likes: 0, // Placeholder value for likes
      dislikes: 0, // Placeholder value for dislikes
      description:'The upcoming bridge, envisioned by renowned architect Santiago Calatrava, blends cutting-edge design with sustainability. Seamlessly integrating with the environment, it\'s a green marvel, connecting heritage and modernity for enhanced community accessibility and cultural preservation.'
    });

    await newBridge.save()
    .then(savedBridge => {
      console.log('Bridge saved:', savedBridge);
    })
    .catch(error => {
      console.error('Error saving bridge:', error);
    });
  }


}

seedBridges()


// Save the new bridge to the database
