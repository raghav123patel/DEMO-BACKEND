const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
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
    },
    collection: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Collection", 
        required: true 
    },
    component: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Component", 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Variant", variantSchema);  
