const mongoose = require('mongoose');
const Bridge = require('../models/bridge'); // Import your Bridge model
const { dbUrl } = require('../app.js');

// connecting to database  
mongoose.connect(dbUrl)   
    .then(() => {
        console.log('Mongo connection open');
    })
    .catch(err => {
        console.log('Oh no, Mongo express error');
        console.log(err);
    })
const groups = ['A', 'B','C','D','E'];
const bridgeImages =
['https://c.animaapp.com/Bf9qfsP6/img/image-3@2x.png', 'https://c.animaapp.com/Bf9qfsP6/img/image-5@2x.png', 'https://c.animaapp.com/Bf9qfsP6/img/image-8@2x.png', 'https://res.cloudinary.com/dt6vwovu0/image/upload/v1706113867/D111_xfqly1.png', 'https://c.animaapp.com/Bf9qfsP6/img/image-9@2x.png'];
const teams = ["Deng, Gerstner, Kim, Limnardy, Lu","Jha, Karunakaran, Kumar, Sezer, Yalçıklı","Alrabab'h, Balaj, Junior, Inal, Trimborn",  "Avgoren, Ahmann, Karaserçe, Wrabel, Yeltekin", "Demirli, Tavakoli"];
const seedBridges = async() => {
  await Bridge.deleteMany({});
  // Create a new instance of the Bridge model
  for(let i = 0; i<5;i++) {

    const newBridge = new Bridge({
      name: `DESIGN TEAM : ITBE - GROUP ${groups[i]}`,
      images: [bridgeImages[i]],
      cost: Math.floor(Math.random() * (476 - 200)) + 200,
      durationMonths: Math.floor(Math.random() * (50 - 24 + 1)) + 24,
      architect: teams[i],
      likes: 0, // Placeholder value for likes
      dislikes: 0, // Placeholder value for dislikes
      ifcLink: groups[i],
      description:`Designed by the team of  ${teams[i]}, the upcoming bridge is poised to be a welcome addition to the Munich skyline, injecting a burst of freshness and modernity into the heart of the city. The design promises to seamlessly blend functionality with aesthetic appeal, ensuring that the new structure becomes an iconic symbol of Munich\'s vibrant spirit. Lush greenery provides a welcome respite from the dust and noise pollution and contributes towards changing aesthetics through the 4 seasons. The integrated bus bays means safety for bus passengers and  you can travel smoothly without constraints.`
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
