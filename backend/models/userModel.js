import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    //general user info
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: true,
    },
    name: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String, required: false },
    //publisher
    slogan: { type: String, required: false },
    about_us: { type: String, required: false },
    industry: { type: String, required: false },
    organization_size: { type: String, required: false },
    specialities: { type: String, required: false },
    //developer
    work_status: { type: String, required: false },
    location: { type: String, required: false },
    school: { type: String, required: false },
    skills: { type: String, required: false },
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
