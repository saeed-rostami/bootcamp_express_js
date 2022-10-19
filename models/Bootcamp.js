 const mongoose = require('mongoose');

 const BootcampSchema = new mongoose.Schema( {

    name : {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxLength: [50," Name can not be more than 50 characters"],
    },
    slug: String,

    description: {
        type: String,
        required: [true, "Please add a name"],
        maxLength: [250," Description can not be more than 250 characters"],
    },
    website : {
        type: String,
    
    },
    phone: {
        type: String,
        maxLength: [50," phone can not be more than 50 characters"],
    },

    email: {
        type: String,
    },

    address: {
        type: String,
        required: [true, "Please add a address"],
        maxLength: [1500," address can not be more than 250 characters"],
    },

    lcoation: {
        type: {
            type: String,
            required: false,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        country: String,
        zipcode: String,
    },

    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other',
        ]
    },

    averageRating: {
        type: Number,
        min: [1],
        max: [10],
    },

    averageCost: {
        type: Number
    },

    photo: {
        type: String,
        default: "no-photo.jpg", 
    },

    housing: {
        type: Boolean,
        default: false, 
    },

    jobAssistance: {
        type: Boolean,
        default: false, 
    },

    jobGuarantee: {
        type: Boolean,
        default: false, 
    },

    acceptGi: {
        type: Boolean,
        default: false, 
    },

    created_at: {
        type: Date,
        default: Date.now, 
    },

 });

 module.exports = mongoose.model("Bootcamp" , BootcampSchema)