const express = require("express");

const Feedback = require("../models/feedback");

const routerFeedback = express.Router();

routerFeedback.get("/count", (req, res) => {
  Feedback.countDocuments()
    .then((count) => res.json({ status: "success", data: count }))
    .catch((error) =>
      res.status(500).json({ status: "error", message: error.message })
    );
});
routerFeedback.get("/", (req, res) => {
  Feedback.find()
    .then((feedbacks) => res.json(feedbacks))
    .catch((error) =>
      res.status(404).json({ noOfFeedbacks: "No feedbacks found" })
    );
});
routerFeedback.get("/:id", (req, res) => {
  Feedback.findById(req.params.id)
    .then((feedbacks) => res.json(feedbacks))
    .catch(() => res.status(404).json({ msg: "cannot find feedbacks" }));
});
routerFeedback.post("/", (req, res) => {
  Feedback.create(req.body)
    .then(() => res.json({ msg: "Feedback added Sucessufully" }))
    .catch(() => res.status(404).json({ msg: "cannot add Feedback" }));
});
routerFeedback.delete("/:id", (req, res) => {
  Feedback.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Feedback Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Feedback ID" }));
});
routerFeedback.put("/:id", (req, res) => {
  Feedback.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Feedback Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerFeedback;
