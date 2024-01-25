const express = require("express");
let path = require("path");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
const session = require("express-session");
const { Console } = require("console");
const cors = require("cors");

const app = express();
// the AccessToken is relevant for any endpoint to be queried later. Prepare storage in process.env
process.env.ACCESS_TOKEN = "EMPTY";

// Set up session management
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Replace these values with your BimCollab credentials
const clientId = "PlayGround_Client";
const clientSecret = "k!xWcjad!u@L%ZWHc%%yKtMTqR%o1be@qWfWYaDL";
const callbackUrl = "http://localhost:5000/Callback";

// Configure the OAuth2 strategy
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL:
        "https://playground.bimcollab.com/identity/connect/authorize",
      tokenURL: "https://playground.bimcollab.com/identity/connect/token",
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("[INFO] Retrieved Access Token from BIMcollab. ");

      // store the token into the process.env
      process.env.ACCESS_TOKEN = accessToken;

      // You can store the user information in your database or session
      return done(null, { accessToken: accessToken, profile: profile });
    }
  )
);

const baseurl = "https://playground.bimcollab.com";

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Deliver static data
const rootDirectory = path.join(__dirname, "public");
app.use(express.static(rootDirectory));

// Allow CORS for all routes
app.use(cors());

// Route to initiate the OAuth2 authentication
app.get(
  "/auth",
  passport.authenticate("oauth2", {
    scope: "openid offline_access bcf", // Replace with your desired scope
  })
);

// OAuth2 callback endpoint
app.get(
  "/Callback",
  passport.authenticate("oauth2", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.redirect("/simple.html"); // Redirect to the main page
    //res.redirect("/");
  }
);

// Protected route that requires authentication
app.get("/profile", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Route to request the token
app.get("/token", (req, res) => {
  res.send(process.env.ACCESS_TOKEN);
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Home route
app.get("/", (req, res) => {
  // res.send('Home page - <a href="/auth">Login</a>');
  res.sendFile(path.join(__dirname, "index.html"));
});

// Express middleware for parsing JSON in the request body
//app.use(bodyParser.json());

// Express endpoint for "/allProjects"
app.get("/allProjects", isAuthenticated, async (req, res) => {
  try {
    // Retrieve data from the fetchData function
    const projectsData = await fetchData("/bcf/2.1/projects");

    // Send the received JSON object to the client
    res.json(projectsData);
  } catch (error) {
    // Handle errors thrown by the fetchData function
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express endpoint for "/allTopics"
app.get("/allTopics/:project_id", isAuthenticated, async (req, res) => {
  try {
    const project_id = req.params.project_id;
    console.log("ProjectID =" + req.params.project_id);

    // Retrieve data from the fetchData function
    const projectsData = await fetchData(
      `/bcf/2.1/projects/${project_id}/topics`
    );

    // Send the received JSON object to the client
    res.json(projectsData);
  } catch (error) {
    // Handle errors thrown by the fetchData function
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express endpoint for "/allComments"
app.get(
  "/allComments/:project_id/:topic_id",
  isAuthenticated,
  async (req, res) => {
    try {
      const project_id = req.params.project_id;
      console.log("ProjectID =" + req.params.project_id);

      const topic_id = req.params.topic_id;
      console.log("TopicID =" + req.params.topic_id);

      // Retrieve data from the fetchData function
      const commentsData = await fetchData(
        `/bcf/2.1/projects/${project_id}/topics/${topic_id}/comments`
      );

      // Send the received JSON object to the client
      res.json(commentsData);
    } catch (error) {
      // Handle errors thrown by the fetchData function
      console.error("Error processing the request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

async function fetchData(apiUrl) {
  try {
    console.log("Fetching data from " + baseurl + apiUrl);

    // Configure the Fetch request with the OAuth2 token
    const response = await fetch(baseurl + apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `Error in request: ${response.status} ${response.statusText}`
      );
    }

    // Extract and return the received JSON object
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors during the Fetch operation
    console.error("Error fetching data:", error);
    throw error; // Optional: Continue throwing the error to handle it in the caller
  }
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
