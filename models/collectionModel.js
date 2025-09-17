const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    code: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


collectionSchema.virtual('variants', {
    ref: 'Variant',
    localField: '_id',
    foreignField: 'collection'
});

module.exports = mongoose.model("Collection", collectionSchema);
