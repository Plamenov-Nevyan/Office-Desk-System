const { Schema, model, Types, ObjectId } = require("mongoose");

const deskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please fill out your desk name"],
      minLength: [3, "Desk name should be atleast 3 characters!"],
      maxLength: [10, "Desk name can't be longer than 10 characters"],
    },
    symbol: {
      type: String,
      trim: true,
      required: [true, "Please paste a link to your desk symbol(image)"],
      match: [/^https?:\/\/(.*)/, "Please paste a valid URL"],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Desk = model("Desk", deskSchema);

exports.Desk = Desk;
