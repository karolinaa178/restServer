const sanitize = require('mongo-sanitize');
const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postTestimonial = async (req, res) => {
  try {
    const author = sanitize(req.body.author);
    const text = sanitize(req.body.text);
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if(dep) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putTestimonial = async (req, res) => {
  try {
    const { author, text } = req.body;
    const dep = await Testimonial.findById(req.params.id);
    if(dep) {
      dep.author = author;
      dep.text = text;
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};