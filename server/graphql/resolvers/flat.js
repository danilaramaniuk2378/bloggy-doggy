export const allFlats = (parent, args, { models }) => models.Flat.find({ isApproved: true }).exec();
export const getFlat = (parent, { _id }, { models }) => models.Flat.findOne({ _id }).exec();
