const express = require("express");

const Faqs = require("../models/faq");

const routerFaq = express.Router();

routerFaq.get("/", (req, res) => {
  Faqs.find()
    .then((leave) => res.json(leave))
    .catch((error) =>
      res.status(404).json({ noOfCustomers: "No Questions found" })
    );
});
routerFaq.get("/:id", (req, res) => {
  Faqs.findById(req.params.id)
    .then((leave) => res.json(leave))
    .catch(() => res.status(404).json({ msg: "cannot find Questions" }));
});
routerFaq.post("/", (req, res) => {
  Faqs.create(req.body)
    .then(() => res.json({ msg: "Question added Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Add Question" }));
});
routerFaq.delete("/:id", (req, res) => {
  Faqs.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Question Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find Question ID" }));
});
routerFaq.put("/:id", (req, res) => {
  Faqs.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Question Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerFaq;
