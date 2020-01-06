const mongoose = require('mongoose');
const user_info = require('../models/users');

exports.getUser = async (req, res, next) => {
    try{
        let retData = await user_info.find();

        if(retData.length <= 0) return res.status(204).end();

        return res.json(retData);
    }catch(e) {
        console.log(e);
        res.status(500).json({
            error : e
        });
    }
};

exports.createUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        // if(!req.body.user_id || !req.body.name) return res.status(400).end();

        const opts = { session, new: true, upsert: true };
        const newData = await user_info.findOneAndUpdate({ user_id: 'test2' }, { $set: { name: 'test2' } }, opts);
          
        await session.commitTransaction();
        session.endSession();

        return res.json(newData);
    }catch(e) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            error:e
        });
    }
};

