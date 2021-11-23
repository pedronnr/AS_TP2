const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const studentSchema = mongoose.Schema(
  {
    studentId: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    card: {
      type: { code: Number, expireDate: Date },
      required: true,
    },
    presences: [
      {
        type: { day: Date, hour: Number, minute: Number, room: String },
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * @typedef Student
 */
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
