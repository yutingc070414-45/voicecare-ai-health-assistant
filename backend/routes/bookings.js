const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const bookingsFile = path.join(__dirname, "..", "data", "bookings.json");

function readBookings() {
  try {
    const data = fs.readFileSync(bookingsFile, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
}

router.get("/", (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

router.post("/", (req, res) => {
  const bookings = readBookings();

  const newBooking = {
    id: Date.now(),
    patientName: req.body.patientName || "",
    email: req.body.email || "",
    phone: req.body.phone || "",
    date: req.body.date || "",
    time: req.body.time || "",
    department: req.body.department || "",
    reason: req.body.reason || "",
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.status(201).json({
    message: "Booking saved successfully",
    booking: newBooking
  });
});

module.exports = router;