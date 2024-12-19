const bcrypt = require('bcryptjs');

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10);
    return hash;
}

const compare = async (textPlain, hashPasword) => {
    return bcrypt.compare(textPlain, hashPasword);
}

module.exports = { encrypt, compare };