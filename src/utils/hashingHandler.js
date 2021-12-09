const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encrypt = async plaintextPassword => {
    return await bcrypt.hash(plaintextPassword, saltRounds);
}

exports.checkPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}