const express = require("express");
const { signUp, signIn } = require("../../controller/admin/auth");
const router = express.Router();

router.post("/admin/signin", signIn);

router.post("/admin/signup", signUp);

module.exports = router;
