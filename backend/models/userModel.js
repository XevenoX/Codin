import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// const projectSchema = new mongoose.Schema({
//   // publisher
//   publisher: { type: String, required: true },
//   project_name: { type: String, required: true },
//   description: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   keyTechnologies: { type: String },
//   contractAmount: { type: float, required: true },
//   projectStatus: { type: String, required: true },
//   // project label
//   projectIndex: { type: projectLabel, required: true },
//   // candidates
//   candidates: [{ type: [candidate], reuiqred: true }],
// });

// TODO
// const projectLabel = new mongoose.Schema({
//   index: {},

// });

// TODO
// const candidate = new mongoose.Schema({
//   name: {},
// });

// const label = new mongoose.Schema({
//   labelID: { type: Integer, required: true, unique: true },
//   labelName: { type: String, required: true, unique: true },
// });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// pw = password entered by user in plain text
userSchema.methods.checkPassword = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
