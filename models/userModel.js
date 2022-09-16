import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

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

	// validation fields
	if (!email || !password) {
		throw Error('All fields must be filled');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}

	const existsEmail = await this.findOne({ email });
	if (existsEmail) {
		throw Error('Email already in use');
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return await this.create({ email, password: hash });
}

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('All fields must be filled');
	}
	const user = this.findOne({ email });
	const match = bcrypt.compare(password, user.password);
	if (!user || !match) {
		throw Error('Incorrect login or password');
	}

	return user;
}

export default mongoose.model('User', userSchema);
