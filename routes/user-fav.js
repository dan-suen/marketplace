const express = require('express');
const router  = express.Router();

const {
  checkFavData,
  checkConvoData,
  updateUserFavData,
  favouritedData
} = require("../db/queries/userfavs.js");

router.get('/', (req, res) => {

  console.log(req.body)
  const username = req.session.user_name;
  const user_id = req.session.user_id;
  const templateVars = {
    user: username,
    id: user_id
  }
  res.render('user-fav',templateVars);
  return;
});

router.post('/', (req, res) => {
  checkFavData(req.session.user_id, req.body.item_id).then(data => {
    checkConvoData(req.session.user_id, req.body.item_id, req.body.user_id).then(data1 => {
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
