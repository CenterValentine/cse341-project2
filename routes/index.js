const router = require('express').Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['Index'] 
    res.send('API is running...')});
router.use('/users', require('./users'));
router.use('/swagger', require('./swagger'));
router.use('/objects', require('./objects'));

module.exports = router;
