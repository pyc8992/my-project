const mongoose = require('mongoose');

const { Schema } = mongoose;

// schema
const schema = new Schema({
    user_id:String,
    name:String,
});

// model & export
module.exports = mongoose.model("user_info", schema, "user_info");