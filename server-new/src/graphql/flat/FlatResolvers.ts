import FlatModel, { IFlat } from './FlatModel';

interface IFlatArgs {
  price: IFlat['price'];
  phone?: IFlat['phone'];
}

const resolvers = {
  addFlat: async (obj: IFlat, args: IFlatArgs): Promise<IFlat | null> => {
    const { price, phone } = args;

    const flat = new FlatModel({
      ownerId: 'just-mock-for-now',
      price,
      phone,
    });

    await flat.save();

    const { _id } = flat;

    return await FlatModel.findOne({ _id });
  },
  getFlats: async (): Promise<IFlat[] | null> => {
    return await FlatModel.find({});
  },
};

export default resolvers;
