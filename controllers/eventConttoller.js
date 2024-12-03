const EVENT = require("../models/event");
const USER = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const createEvent = async (req, res) => {
  const { userId } = req.user;
  const {
    date,
    title,
    startTime,
    endTime,
    location,
    description,
    tags,
    free,
    online,
    category,
  } = req.body;
  try {
    if (
      !date ||
      !startTime ||
      !endTime ||
      !description ||
      !tags ||
      !free ||
      !title ||
      !category ||
      (!location && !online)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are requires" });
    }

    //image upload
    const imageFile = req.files.image.tempFilePath;
    //upload the image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
      use_fileName: true,
      folder: "mbevent",
    });
    fs.unlinkSync(req.files.image.tempFilePath);

    //   create a new event
    const newEvent = new EVENT({
      image: uploadedImage.secure_url,
      title,
      date,
      startTime,
      endTime,
      description,
      category,
      location: online === "true" ? "online" : location,
      tags,
      price: {
        free: free === "true",
        regular: free === "true" ? 0 : req.body?.regularPrice,
        vip: free === "true" ? 0 : req.body?.vipPrice,
      },
      hostedBy: userId,
    });
    const event = await newEvent.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

const getUpComingEvent = async (req, res) => {
  res.send("get upcoming event");
};
const getfreeEvent = async (req, res) => {
  res.send("get free event");
};
module.exports = { createEvent, getUpComingEvent, getfreeEvent };
