const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day, seat, client, email });
    if (!Seat.exists({ day: newSeat.day, seat: newSeat.seat })) {
      await newSeat.save();
      req.io.emit('seatsUpdated', Seat);
      res.json({ message: 'Ok' });
    } else return res.status(404).json({ message: 'The seat is taken' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      dep.day = day;
      dep.seat = seat;
      dep.client = client;
      dep.email = email;
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};