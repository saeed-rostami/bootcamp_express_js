const mongoose = require('mongoose');
const slugify = require("slugify");
const geocoder = require("../utilities/geocoder");


const BootcampSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxLength: [50, " Name can not be more than 50 characters"],
    },
    slug: String,

    description: {
        type: String,
        required: [true, "Please add a name"],
        maxlength: [250, " Description can not be more than 250 characters"],
    },
    website: {
        type: String,

    },
    phone: {
        type: String,
        maxLength: [50, " phone can not be more than 50 characters"],
    },

    email: {
        type: String,
    },

    address: {
        type: String,
        required: [true, "Please add a address"],
        maxLength: [1500, " address can not be more than 250 characters"],
    },

    location: {
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


//Create slug bu slugify
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

//geo code location field
BootcampSchema.pre('save', async function (next) {

    // const loc = await geocoder.geocode(this.address);
    //
    // this.location = {
    //     type: "Point",
    //     coordinates: [loc[0].longitude, loc[0].latitude],
    //     formattedAddress: loc[0].formattedAddress,
    //     street: loc[0].streetName,
    //     city: loc[0].citycode,
    //     state: loc[0].stateCode,
    //     zipcode: loc[0].zipcode,
    //     country: loc[0].country,
    // };

    //in case not found address
    this.address = "undefined";
    next();
});


module.exports = mongoose.model("Bootcamp", BootcampSchema);