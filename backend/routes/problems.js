const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Problems route working!' });
});

module.exports = router;