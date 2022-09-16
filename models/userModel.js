import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
    unique: true
	},
	password: {
		type: String,
		required: true
	}
});

// signup user method
userSchema.statics.signup = async function (email, password) {
	const existsEmail = await this.findOne({ email });
	if (existsEmail) {
		throw Error('Email already in use');
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ email, password: hash });
	return user;
}

export default mongoose.model('User', userSchema);
