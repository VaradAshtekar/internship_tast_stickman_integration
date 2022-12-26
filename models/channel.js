const mongoose = require("mongoose");
const channelModel = new mongoose.Schema({
    sno: {
        type: Number
    },
    name: {
        type: String

    },
    number: {
        type: Number,
        min: 0
    },
    token_number: {
        type: Number
    }
})

const ChannelModel = mongoose.model('Channel', channelModel)

module.exports = ChannelModel