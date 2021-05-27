const express = require('express');
const router =express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getSingle);


router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);

router.get('/concerts/day/:day', ConcertController.getByDay);


router.route('/concerts').post(ConcertController.post);

  router.route('/concerts/:id').delete(ConcertController.delete);
  
router.route('/concerts/:id').put(ConcertController.put);

  module.exports = router;