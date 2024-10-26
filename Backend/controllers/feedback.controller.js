const Feedback = require("../Models/feedback.model.js");

const postfeedback = async (req, res) => {
  const { username, feedback } = req.body;
  const newFeedback = await Feedback.create({ username, feedback });
  res.status(201).json({ message: "Feedback submitted successfully" });
};

const getfeedback = async (req, res) => {
  const feedbacks = await Feedback.find().populate("username", "phno");
  res.json(feedbacks);
};

module.exports = { postfeedback, getfeedback };
