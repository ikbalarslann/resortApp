import asyncHandler from "express-async-handler";
import Host from "../models/hostModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authHost = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const host = await Host.findOne({ email });

  if (host && (await Host.matchPassword(password))) {
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

// @desc    Register a new Host
// @route   POST /api/Hosts
// @access  Public
const registerHost = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hostExists = await Host.findOne({ email });

  if (hostExists) {
    res.status(400);
    throw new Error("Host already exists");
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
    throw new Error("Invalid Host data");
  }
});

// @desc    Logout Host / clear cookie
// @route   POST /api/Hosts/logout
// @access  Public
const logoutHost = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get Host profile
// @route   GET /api/Hosts/profile
// @access  Private
const getHostProfile = asyncHandler(async (req, res) => {
  const host = await Host.findById(req.Host._id);

  if (host) {
    res.json({
      _id: host._id,
      name: host.name,
      email: host.email,
    });
  } else {
    res.status(404);
    throw new Error("Host not found");
  }
});

// @desc    Update Host profile
// @route   PUT /api/Hosts/profile
// @access  Private
const updateHostProfile = asyncHandler(async (req, res) => {
  const host = await Host.findById(req.Host._id);

  if (host) {
    host.name = req.body.name || host.name;
    host.email = req.body.email || host.email;

    if (req.body.password) {
      host.password = req.body.password;
    }

    const updatedHost = await host.save();

    res.json({
      _id: updatedHost._id,
      name: updatedHost.name,
      email: updatedHost.email,
    });
  } else {
    res.status(404);
    throw new Error("Host not found");
  }
});
export {
  authHost,
  registerHost,
  logoutHost,
  getHostProfile,
  updateHostProfile,
};
