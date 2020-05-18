const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
    res.send("This is a test blog post.");
});

module.exports = router;