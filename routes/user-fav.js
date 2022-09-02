const express = require('express');
const router  = express.Router();

const {
  checkFavData,
  checkConvoData,
  updateUserFavData,
  favouritedData
} = require("../db/queries/userfavs.js");

router.get('/', (req, res) => {
  const username = req.session.user_name;
  const user_id = req.session.id;
  const templateVars = {
    user: username,
    id: user_id
  }
  res.render('user-fav',templateVars);
});


router.post('/', (req, res) => {
  checkFavData(req.session.user_id, req.body.item_id).then(data => {
    console.log("Data Line 24", data);
    checkConvoData(req.session.user_id, req.body.item_id, req.body.user_id).then(data1 => {
      // console.log("user-fav.js Data: ", data);
      // console.log("user-fav.js Data 1: ", data1);
      return res.json([data, data1]);
    })
  })
});

router.put('/', (req, res) => {
  updateUserFavData(req.body.favourite_id).then(data => {
    return res.json(data);
  })
});

router.post('/items', (req, res) => {
  const login_id = req.session.user_id;
  favouritedData(login_id).then(data => {
    //console.log("FEATURE BUTTON POST", data);
    return res.json([data, login_id]);
  })
});

module.exports = router;
