const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const presenceSchema = mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

presenceSchema.plugin(toJSON);
presenceSchema.plugin(paginate);

/**
 * @typedef Presence
 */
const Presence = mongoose.model("Presence", presenceSchema);

module.exports = Presence;
