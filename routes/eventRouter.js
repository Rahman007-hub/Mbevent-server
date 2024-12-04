const router = require("express").Router();
const {
  createEvent,
  getUpComingEvent,
  getfreeEvent,
  getSingelEvent,
} = require("../controllers/eventConttoller");
const auth = require("../middleware/auth");

router.post("/", auth, createEvent);
router.get("/upcoming", getUpComingEvent);
router.get("/free", getfreeEvent);
router.get("/:eventId", getSingelEvent);

module.exports = router;
