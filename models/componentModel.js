const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    code: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    displayName: { 
        type: String, 
        required: true 
    },
    collection: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Collection", 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Component", componentSchema);
