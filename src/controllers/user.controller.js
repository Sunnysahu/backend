import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(500).json({ message: "sunny sahu" });
  // get user details from Frontend
  // Validation - Not Empty
  // Check if user already exists:  username & email
  // Check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object = create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response || Error

  const { fullName, email, password } = req.body;
  console.log(
    "Email: " + email,
    "Password: " + password,
    "Full Name: " + fullName
  );

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required!!!");
  }

  const existedUSer = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUSer) {
    throw new ApiError(409, "User with Email and username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  console.log("Avatar Image", avatarLocalPath);
  console.log("Cover Image", coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar files is Required...");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar files is Required...");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user!!!"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered successfully..."));
  // return ApiResponse(200, res.body(createUser), "User Successfully Create" )
});

export { registerUser };
