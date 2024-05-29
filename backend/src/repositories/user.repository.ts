import { Model, Document } from 'mongoose';
import { Repository } from './repository';
import UserModel, {IUser} from '../models/user.model';

export class UserRepository<T extends Document> extends Repository<T> {
  constructor(private userModel: Model<T>) {
    super(userModel);
  }

  async findUserByEmail(email: string): Promise<T | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}