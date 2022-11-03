require('dotenv').config();
const db = require('../connection');


let favData = function (userName) {
  return db
    .query(`SELECT items.id as item_id, img_url, items.sold_status, price, title, items.description AS item_description, users.id AS user_id
    FROM items
    JOIN users ON items.seller_id = users.id
    WHERE users.username = $1
    LIMIT 10;`, [userName])
    .then(data => {
      return data.rows;
    })
};

let MarkSoldData = function (itemName) {
  return db
    .query(`UPDATE items
    SET sold_status = true
    WHERE id = $1 RETURNING *`, [itemName])
    .then(data => {
      return data.rows;
    })
};


let checkFavData = function (user, item) {
  if (!user) {
    return new Promise((res) => {
      res([null, null]);
    })
  }
  return db.query(`SELECT id, active FROM favourites
  WHERE user_id = $1 AND item_id = $2`, [user, item])
    .then(data => {
      if (data.rowCount === 0) {
        return db.query(`INSERT INTO favourites (
        user_id,
        item_id,
        active) VALUES ($1, $2, false) RETURNING *`, [user, item]).then(data => {
          return data.rows[0];
        })
      }
      return data.rows[0];
    }
    );
};
let checkConvoData = function (user, item, seller) {
  if (!user) {
    return new Promise((res) => {
      res([null]);
    })
  }
  let userId = Number(user);
  let sellerId = Number(seller);
  let itemId = Number(item);
  return db.query(`SELECT id FROM conversations
  WHERE receiver_id = $1 AND item_id = $2`, [userId, itemId])
    .then(data => {
      // console.log("Line 61:", data);
      // console.log("seller:", sellerId);
      // console.log("user:", user);
      // console.log("item:", itemId);
      if (data.rowCount === 0 && user !== sellerId) {
        // console.log("userfavs.js line 66:");
        return db.query(`INSERT INTO conversations (
        sender_id,
        receiver_id,
        item_id
        ) VALUES ($1, $2, $3) RETURNING *`, [sellerId, userId, itemId]).then(data => {
          // console.log("userfavs.js Line 72:", data.rows[0]);
          return data.rows[0];
        })
      }
      // console.log("userfavs.js Line 76:", data.rows[0]);
      return data.rows[0];
    }
    );
};

let updateUserFavData = function (favid) {
  return db.query(`UPDATE favourites
      SET active =  NOT active
      WHERE id = $1 RETURNING *`, [favid])
    .then(data => {
      return data.rows[0];
    })
};

let favouritedData = function (user) {
  return db.query(`
    SELECT item_id
    FROM favourites
    WHERE active = true AND user_id = $1`, [user])
    .then (data => {
      let x = [];
      data.rows.forEach((element) => {
        x.push(element.item_id);
      })
      let y = (x.length > 0) ? x.join(" OR items.id = ") : null;
      let queryString = "SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username FROM items JOIN users ON items.seller_id = users.id WHERE items.id = "
      queryString = queryString + y + " LIMIT 10";
    return db
      .query(queryString)
      .then(data => {
        return data.rows;
      })

  })
};


const getConvoId2 = (user_id, item_id) => {
  return db.query(
    `SELECT id, receiver_id
    FROM conversations
    WHERE (sender_id = $1) AND item_id = $2;`, [user_id, item_id])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { favData, MarkSoldData, checkFavData, checkConvoData, updateUserFavData, favouritedData, getConvoId2 };
