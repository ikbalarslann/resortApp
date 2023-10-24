import asyncHandler from "express-async-handler";
import Host from "../models/hostModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth host & get token
// @route   POST /api/hosts/auth
// @access  Public
const authHost = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const host = await Host.findOne({ email });

  if (host && (await host.matchPassword(password))) {
    generateToken(res, host._id);

    res.json({
      _id: host._id,
      name: host.name,
      email: host.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new host
// @route   POST /api/hosts
// @access  Public
const registerHost = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hostExists = await Host.findOne({ email });

  if (hostExists) {
    res.status(400);
    throw new Error("host already exists");
  }

  const host = await Host.create({
    name,
    email,
    password,
  });

  if (host) {
    generateToken(res, host._id);

    res.status(201).json({
      _id: host._id,
      name: host.name,
      email: host.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid host data");
  }
});

// @desc    Logout host / clear cookie
// @route   POST /api/hosts/logout
// @access  Public
const logoutHost = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get host profile
// @route   GET /api/hosts/profile
// @access  Private
const getHostProfile = asyncHandler(async (req, res) => {
  const host = await Host.findById(req.item._id);

  if (host) {
    res.json({
      _id: host._id,
      name: host.name,
      email: host.email,
    });
  } else {
    res.status(404);
    throw new Error("host not found");
  }
});

// @desc    Update host profile
// @route   PUT /api/hosts/profile
// @access  Private
const updateHostProfile = asyncHandler(async (req, res) => {
  const host = await Host.findById(req.item._id);

  if (host) {
    host.name = req.body.name || host.name;
    host.email = req.body.email || host.email;

    if (req.body.password) {
      host.password = req.body.password;
    }

    const updatedhost = await host.save();

    res.json({
      _id: updatedhost._id,
      name: updatedhost.name,
      email: updatedhost.email,
    });
  } else {
    res.status(404);
    throw new Error("host not found");
  }
});
export {
  authHost,
  registerHost,
  logoutHost,
  getHostProfile,
  updateHostProfile,
};
