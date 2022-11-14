# Marketplace
Marketplace is a full stack web application built with Express, PostgreSql and Node.js.

The application itself simulates the ability to create and delete items in an online marketplace. Users are view items being listed and mark them as favourites or even inquire the owner via a messaging system.


## Final Product
 !["Main Page"](https://github.com/dan-suen/marketplace/blob/master/public/screens/1.png?raw=true)
 - The main page features a randomized loadout of the first 10 item listings with the ability to filter by price or username and the results can be filtered in a descending order using the checkbox. Users can also choose preset filter options via yellow buttons.

 - Each item listing has a variety of information shown, such as a picture, seller, description, sold-out status, etc.

 !["Login"](https://github.com/dan-suen/marketplace/blob/master/public/screens/2.png?raw=true)
 - Users can login via a login page to access user specific featuers on the site

 !["Logged in Main Page"](https://github.com/dan-suen/marketplace/blob/master/public/screens/3.png?raw=true)
 !["Favourites"](https://github.com/dan-suen/marketplace/blob/master/public/screens/4.png?raw=true)

 -These features include access to the favourites system shown in the upper right of each item, which allows users to add the item to their favourites, and the ability to message sellers about an item in the lower right(provided the item is NOT sold out already)

  !["Profile"](https://github.com/dan-suen/marketplace/blob/master/public/screens/6.png?raw=true)
  !["Item Creation"](https://github.com/dan-suen/marketplace/blob/master/public/screens/7.png?raw=true)
 - Users also have access to their personal page where they can edit their own profile and see a listing of the items they are selling
 - Items being sold by the user can be deleted, marked as sold and related messages can be viewed.
 !["Inbox"](https://github.com/dan-suen/marketplace/blob/master/public/screens/8.png?raw=true)

 - The robust messaging systems allows for real-time messaging via web-sockets
 !["Messages"](https://github.com/dan-suen/marketplace/blob/master/public/screens/9.png?raw=true)


## Project Setup

1. This project requires a local or remote installation of PostgreSql.
Log into PostgreSql and run the following commands: 
```
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE marketplace OWNER labber;
```
Update the .env file with your correct information: 
e.g. 
  - username: `labber` 
  - password: `labber` 
  - database: `marketplace`

2. Install all dependencies:
```
npm run install 
```

3. Follow instructions.md in db/schema to create the database tables locally.

4. Follow instructions.md in db/seeds to seed the created database tables locally.


## Getting Started

1. Fix to binaries for sass: `npm rebuild node-sass`
2. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
3. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
