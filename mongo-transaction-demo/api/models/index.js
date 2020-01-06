//execute arguments
// mongod --port 27017 --dbpath D:/600.data/mongo/data01 --replSet rs0
// mongod --port 27018 --dbpath D:/600.data/mongo/data01 --replSet rs0
// mongod --port 27019 --dbpath D:/600.data/mongo/data01 --replSet rs0

// rsconf = { _id: 'rs0',members: [{_id:0, host:"192.168.0.171:27017"}, {_id:1, host:"192.168.0.171:27018"}, {_id:2, host:"192.168.0.171:27019"}]}
// rs.initiate(rsconf)
const mongoose = require('mongoose');

module.exports = () => {
    const connect = async() => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(`mongodb://192.168.0.171:27017,192.168.0.171:27018,192.168.0.171:27019/admin?replicaSet=rs0`, {
                dbName: 'pos_system',
            }, (error) => {
                if (error) {
                    console.log('Connect MongoDB Error', error);
                } else {
                    console.log('Connect MongoDB Success');
                }

            });
    };

    connect();

    mongoose.connection.on('error', (error) => {
        console.log('Connect MongoDB Error', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected MongoDB, Retry connection');
    });
};