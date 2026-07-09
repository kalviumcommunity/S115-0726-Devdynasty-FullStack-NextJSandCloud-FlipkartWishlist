const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to query database." });
  }
});

module.exports = router;
