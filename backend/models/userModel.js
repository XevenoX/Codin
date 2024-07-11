import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    //general user info
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String, required: false },
    avatar: { type: String, required: false },
    //publisher
    banner: { type: String, required: false },
    slogan: { type: String, required: false },
    about_us: { type: String, required: false },
    industry: { type: String, required: false },
    organization_size: { type: String, required: false },
    specialities: { type: String, required: false },
    //developer
    work_status: { type: String, required: false },
    location: { type: String, required: false },
    school: { type: String, required: false },
    skills: { type: String, required: false }
  },
  { timestamps: true }
);

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
