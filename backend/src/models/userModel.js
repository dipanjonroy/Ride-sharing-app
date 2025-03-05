const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      minlength: [3, "Firstname must be at least 3 characters long."],
      maxlength: [150, "Firstname must be maximum 150 characters long."],
      required: [true, "Firstname is required."],
    },

    lastname: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required."],
      validate: {
        validator: (v) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please use a valid email.",
      },
    },

    password: {
      type: String,
      min: [6, "Password must be 6 characters long."],
      required: [true, "Password is required."],
      select: false,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

module.exports = User;
