const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const validDevices = ['IOS', 'ANDROID', 'WEB'];

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require : [true, 'Provide user Id for session']
        },
        valid: {
            type: Boolean,
            default: true,
        },
        invalidedAt: {
            type: Date,
            default: null
        },
        deviceId: {
            type: String,
            default: null
        },
        deviceToken: {
            type: String,
            default: null
        },
        deviceType: {
            type: [String],
            validate: {
                validator: function (v) {
                    let isValid = 1;
                    v.map((d) => {
                        isValid *= validDevices.indexOf(d) > -1 ? 1 : 0;
                    });
                    return v.length > 0 && isValid;
                },
                message: 'Invalid Device'
            },
            required: [true, 'Session Device is required']
        }
    },
    {
        timestamps: true
    }
);

let sessionModel = Mongoose.model('session', sessionSchema);

module.exports = sessionModel;
