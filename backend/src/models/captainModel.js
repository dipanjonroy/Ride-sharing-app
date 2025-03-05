const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const captainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      trim: true,
      maxLength: [150, "Firstname must be maximum 150 characters long."],
      minLength: [3, "Firstname must be at least 3 characters long."],
      required: [true, "Firstnam is required."],
    },
    lastname: {
      type: String,
      trim: true,
      maxLength: [150, "Lastname must be maximum 150 characters long."],
    },
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please use a valid email.",
    },
    required: [true, "Email is required."],
  },

  password: {
    type: String,
    minLength: [6, "Password must be 6 characters long."],
    required: [true, "Password is required."],
    select: false,
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },

  isactive: {
    type: Boolean,
    default: true,
  },

  socketId: {
    type: String,
  },

  vehicle: {
    color: {
      type: String,
      trim: true,
    },
    numberplate: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
  },

  location: {
    lat: {
      type: Number,
    },

    long: {
      type: Number,
    },
  },
});

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Captain = model("Captain", captainSchema);

module.exports = Captain;
