const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ message: "Message received! We'll get back to you soon. 📬" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all contact messages (admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
