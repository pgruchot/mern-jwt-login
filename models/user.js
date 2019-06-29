const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: { type: String, unique: false },
    lastName: { type: String, unique: false },
    email: { type: String, unique: true },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	facebook: {
		facebookId: { type: String, required: false }
	},
    photos: [],
});

userSchema.methods = {
    checkPassword: (inputPassword, localPassword) => {
        return bcrypt.compareSync(inputPassword, localPassword);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

// userSchema.pre('save', next => {
//     console.log('preeeeeeeeeeeeeeeeeeeeeeeeeeee');
//     if(!this.local.password) {
//         console.log('-------- no password provided --------');
//         next();
//     } else {
//         this.local.password = this.hashPassword(this.local.password);
//         next();
//     };
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
