var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(`${__pv_elements}list`, { title: 'List items' });
});

module.exports = router;
