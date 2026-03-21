const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bookmarks route working!' });
});

module.exports = router;