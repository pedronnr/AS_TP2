const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const registrySchema = mongoose.Schema(
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

registrySchema.plugin(toJSON);
registrySchema.plugin(paginate);

/**
 * @typedef Registry
 */
const Registry = mongoose.model("Registry", registrySchema);

module.exports = Registry;
