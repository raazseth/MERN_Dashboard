const express = require("express");
const {
  createRequest,
  getRequests,
  handleStatus,
} = require("../Controllers/requestController");
const { requireSignin } = require("../Middlewares");

const router = express.Router();

router.post("/p/request", requireSignin, createRequest);
router.get("/g/request", requireSignin, getRequests);
router.put("/s/request", requireSignin, handleStatus);

module.exports = router;
