import mongoose from 'mongoose';

const flatSchema = new mongoose.Schema({
  address: {
    latitude: String,
    longitude: String,
    streetNumber: String,
    street: String,
    city: String,
  },
  apartments: {
    accountingDocuments: Boolean,
    airConditioning: Boolean,
    appliances: String,
    balcony: String,
    floor: Number,
    furniture: String,
    heatedFloors: Boolean,
    nearPlaces: String,
    parking: String,
    priceInHolidays: Number,
    repairs: String,
    sleepPlaces: String,
    studioApartment: Boolean,
    transfer: Boolean,
    twoFloorFlat: Boolean,
    wifi: Boolean,
  },
  cottage: {
    alcove: Boolean,
    appliances: String,
    billiards: Boolean,
    fireplace: Boolean,
    floors: Number,
    karaoke: Boolean,
    parking: Boolean,
    pool: Boolean,
    sleepPlaces: Number,
    spa: Boolean,
    summerCuisine: Boolean,
    terrace: Boolean,
  },
  type: String,
  ownerId: { type: String, required: true },
  price: { type: Number, required: true },
  roomsNumber: { type: Number },
  phone: { type: String },
  isApproved: { type: Boolean, default: true }, // TODO: when admin ready should be changed to false
  photoUrls: [String],
});

export default mongoose.model('Flat', flatSchema);
