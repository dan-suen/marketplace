require('dotenv').config();
const { urlencoded } = require('express');
const db = require('../connection');

let featuredData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY random() OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let newData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY date_added DESC LIMIT 10 OFFSET $1`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY price LIMIT 10 OFFSET $1`, [pageRange])
    .then(data => {
      return data.rows;
    })
  };

  let priceDataDesc = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
  .query(`SELECT items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
  FROM items
  JOIN users ON items.seller_id = users.id
  LEFT JOIN favourites ON favourites.user_id = users.id
  ORDER BY price DESC LIMIT 10 OFFSET $1`, [pageRange])
  .then(data => {
    return data.rows;
  })
};

let filterData = function (pageNumber, name, min, max, boolean) {
  let pageRange = (pageNumber - 1)*10;
  let realMin = min * 100;
  let realMax = max * 100;
  let queryString = `SELECT items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
  FROM items
  JOIN users ON items.seller_id = users.id
  LEFT JOIN favourites ON favourites.user_id = users.id
  `;
  let parameters = [];
  if (name) {
    parameters.push(`username LIKE '%${name}%'`);
  }
  if(min) {
    parameters.push(`price >= ${realMin}`);
  }
  if (max) {
    parameters.push(`price <= ${realMax}`);
  }
  if (parameters.length > 0) {
    queryString = queryString + "WHERE " + parameters.join(" AND ");
  }
  queryString += " ORDER BY price"
  if (boolean) {
    queryString += " DESC";
  }
  queryString += ` LIMIT 10 OFFSET ${pageRange}`;
  console.log (queryString);
  return db
    .query(queryString)
    .then(data => {
      return data.rows;
    })
};



// let favouritesSearch = function (pageNumber) {
//   let pageRange = (pageNumber - 1)*10;
//   return db
//   .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
//   FROM items
//   JOIN users ON items.seller_id = users.id
//   LEFT JOIN favourites ON favourites.user_id = users.id
//   ORDER BY price DESC LIMIT 10 OFFSET $1`, [pageRange])
//   .then(data => {
//     return data.rows;
//   })
// };



let convoSearch = function(seller, user, item) {
  return db
  .query(`SELECT id AS conversation_id
  FROM conversations
  WHERE sender_id = $1 AND receiver_id = $2 AND item_id = $3
  `)
  .then(data => {
    return data.rows;
  })
};



  module.exports = {featuredData, newData, filterData, priceData, priceDataDesc, convoSearch};
