# comnect

A web application for displaying events hosted by community memembers.

## Technologies Used:

- Express
- MongoDB
- Auth0
- React
- Axios
- Bootstrap & React-BootStrap
- React Icons
- React Router
- uuid (library)
- date-fns (library)

## Learning

With this being my first hackathon, this was a worthwhile experience. Overall, this project brought a lot of problems I didn't expect to occur. For one, I was expecting to desing a frontend based applicaiton but ended up needing to learn how to work with backend and connecting the 2. I ended up resorting to the MongoDB tutorial on how to use the MERN stack.

Most of the project was styled using `react-boostrap`. Since I don't use bootstrap that often (in addition to `react-bootstrap`), it took some experimenting to get the looks of the pages.

Utilizing Auth0 in my app was surprisingly easy. There was a great tutorial on how to use it with React and in addition, they had a separate tutorial going over how to make protected routes which were crucial in my application for some aspects.

## Some Future Features That I Didn't Have Time to Implement/Enough Time to Understand the Documentation

- Allow the organizer of the event to "cancel" an event
- Add some verification checks on the event form
- Sort the events on the homepage by "All", "Live", and "Cancelled"
- Removing events that have passed on the homepage
- On the user profile, separate their events by "Current", "Past", and "Cancelled"
- Add tags to the events (gives some info about the event without having to open it)

  - However, don't allow users to edit events that have already passed or been cancelled

- Add labels for events that are "New", "Live", and "Cancelled"
- Allow users to change their profile information (ie: username, email, password for their Auth0 account - this required the backend to do so which I'm still new at from this experience)
- Have location verification using Google's map API
- Display a map of the location where the event will take place (given that it's in-person)
- Have an option to sort the events by nearest to a given inputted location

# Technical Stuff

Since this project contains both the frontend & backend, we have to remember to run `npm i` in the root folder of the project and in the `server` folder.

- For the server, I installed `nodemon` globally using `npm i -g nodemon` and `nodemon server` to get the server up and running

To get the page running, run `npm start` in the root directory

## Note on Required Environment Variables For the Backend & Frontend

1. In the `server` folder, we need a `config.env` file with:

   - `ATLAS_URI` containing the filled out URI for your MongoDB cluster

   - `PORT` containing the port number you want to use for the server

2. In the root, we need a `.env` file with:

   - `REACT_APP_AUTH0_DOMAIN` containing the domain for your AUTH0 app

   - `REACT_APP_AUTH0_CLIENT_ID` containing the client id for your AUTH0 app
