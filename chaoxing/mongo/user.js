const mongoose = require('mongoose');

const userMod = new mongoose.Schema({
    user: String,
    password: String,
    cookie: Object,
    userInit: Object,
    urlHost: String,
    baseURL: String,
    isQRZ: Boolean
});

const User = mongoose.model('User', userMod, 'user');

async function createUser(createParam) {

    var model = User;

    try {
        var result = await model.findOne({ user: createParam['user'] });

        if (result) {
            return await model.updateOne({
                user: createParam['user']
            }, createParam);
        } else {
            return await model.create(createParam);
        }
    } catch (err) {
        console.log(err);
        console.log('保存用户失败' + createParam['user']);
        throw new Error(err);
    }

}

module.exports = { createUser, User };