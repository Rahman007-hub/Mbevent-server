const router = require("express").Router();
const {
  createEvent,
  getUpComingEvent,
  getfreeEvent,
  getSingleEvent,
  getAllEvent,
  payForAnEvent,
  getHostedEvent,
  getEventToAttend,
  getpreviousEvent,
} = require("../controllers/eventConttoller");
const auth = require("../middleware/auth");

router.post("/", auth, createEvent);
router.get("/upcoming", getUpComingEvent);
router.get("/free", getfreeEvent);
router.get("/", getAllEvent);
router.get("/hosted", auth, getHostedEvent);
router.get("/pay/:eventId", auth, payForAnEvent);
router.get("/previous", auth, getpreviousEvent);
router.get("/attending", auth, getEventToAttend);
router.get("/:eventId", getSingleEvent);

module.exports = router;
