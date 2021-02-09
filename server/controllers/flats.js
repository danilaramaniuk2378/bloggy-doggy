import Flat from '../models/flat';

const addFlat = async (req, res) => {
  const { body } = req;
  const newFlat = new Flat({
    address: {
      latitude: body.latLng.lat,
      longitude: body.latLng.lng,
      streetNumber: body.streetNumber,
      street: body.street,
      city: body.city,
    },
    ownerId: req.user._id,
    price: body.price,
    photoUrls: body.photoUrls,
  });

  await newFlat.save();

  return res.status(200).json({ success: true });
};

export default {
  addFlat,
};
