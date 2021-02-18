const { Router } = require("express");

const router = Router();
const users = [];

// Register user inside the api
router.post("/api/register", (request, response) => {
  const data = request.body;

  if (users.filter((user) => user === data.name).length > 0) {
    return response.status(400).json({
      message: "Invalid user",
    });
  }

  users.push(request.body.name);

  return response.status(200).json({
    message: "Logged in",
  });
});

module.exports = { router, users };
