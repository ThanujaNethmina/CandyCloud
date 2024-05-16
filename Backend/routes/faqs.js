const express = require("express");

const FAQ = require("../models/FAQ");

const routerFAQ = express.Router();

routerFAQ.get("/", (req, res) => {
  FAQ.find()
    .then((faqs) => res.json(faqs))
    .catch((error) => res.status(404).json({ noOfFaqs: "No FAQs found" }));
});
routerFAQ.get("/:id", (req, res) => {
  FAQ.findById(req.params.id)
    .then((faqs) => res.json(faqs))
    .catch(() => res.status(404).json({ msg: "cannot find faqs" }));
});
routerFAQ.post("/", (req, res) => {
  FAQ.create(req.body)
    .then(() => res.json({ msg: "FAQ added Successfully" }))
    .catch(() => res.status(404).json({ msg: "cannot add faqs" }));
});
routerFAQ.delete("/:id", (req, res) => {
  FAQ.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "FAQ Deleted Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Find FAQ ID" }));
});
routerFAQ.put("/:id", (req, res) => {
  FAQ.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "FAQ Updated Successfully" }))
    .catch(() => res.status(404).json({ msg: "Cannot Update" }));
});

module.exports = routerFAQ;
