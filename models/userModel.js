import mongoose from 'mongoose';

const userSchema = {
  name: String,
};
const UserModel = mongoose.model('user', userSchema);
export default UserModel;