const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const studentSchema = mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: true,
    },
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
