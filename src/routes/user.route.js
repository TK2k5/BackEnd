import axios from "axios";

// /api/v1/users
app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await axios.get("http://localhost:4200/users");

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({
      message: "Get all users",
      success: true,
      data: users.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, data: error });
  }
});

// /api/v1/users/:id
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await axios.get(`http://localhost:4200/users/${id}`);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Get user successfully",
      data: user.data,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, data: error });
  }
});

// /api/v1/users
app.post("/api/v1/users", async (req, res) => {
  try {
    const body = req.body;
    console.log("🚀 ~ app.post ~ body:", body);

    const user = await axios.post("http://localhost:4200/users", body);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Create user successfully",
      success: true,
      data: user.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, data: error });
  }
});

// /api/v1/users/:id
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await axios.delete(`http://localhost:4200/users/${id}`);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Delete user successfully",
      data: user.data,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, data: error });
  }
});

// /api/v1/users/:id
app.put("/api/v1/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const user = await axios.put(`http://localhost:4200/users/${id}`, body);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Update user successfully",
      data: user.data,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, data: error });
  }
});
