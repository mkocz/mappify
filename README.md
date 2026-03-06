# Mappify

Page url: https://mappify-production.up.railway.app/

## Project Overview

Mappify is a web application that allows users to explore regions and sites displayed on an interactive map. The project uses Mapbox for map visualization and React for the frontend interface. 
Locations are stored in a MongoDB database and managed through a REST API.
Each region contains multiple sites that are displayed on the map with detailed information such as descriptions, 
images, and navigation options.

## Technologies

- **Frontend:** React, React Context API, React-Router, Tailwind, Mapbox
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

## How to Run

### Database (MongoDB)


1. Create a MongoDB Atlas cluster and a database user, then whitelist your IP.  
Add your connection string to a `.env` file as `MONGO_URL`, including the database name (e.g., `mappify`).
2. Configure the database connection in the `.env` file (initial data will be added via the seed script later):
   
````bash

MONGO_URL="mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@<YOUR_CLUSTER>.mongodb.net/mappify"

````

### Frontend

Client is built and served from the backend. The only setup needed on the client is configuring the Mapbox API token:
1. Get an Access Token from MapBox
2. Create a `.env` file in the client folder and add:
   
```bash

REACT_APP_MAPBOX = YOUR_TOKEN

````

### Backend

````bash
npm install
npm run seed
npm build
npm start
````
