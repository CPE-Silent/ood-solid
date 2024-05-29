import UserModel, { IUser } from '../models/user.model';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository'; 

const userRepository = new UserRepository<IUser>(UserModel);
class UserService {
 
  
  
  async getAllUsers() {
    try {
      const users = await userRepository.findAll();
      return users;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await userRepository.findUserByEmail(email);
      return user;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async getUserById(_id: string) {
    try {
      const user = await userRepository.findById(_id);
      console.log('user:', user);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async createUser(user: IUser) {
    try {
      const existUser = await this.getUserByEmail(user.email);
      if (existUser) throw new Error('User already exists');
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = userRepository.create({ ...user, password: hashedPassword });
      return newUser;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async updateUser(_id: string, user: IUser) {
    try {
      const existUser = await userRepository.findById(_id);
      if (!existUser) throw new Error('User not found');
      const updatedUser = await userRepository.update(_id, user);
      return updatedUser;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async deleteUser(_id: string) {
    try {
      const existUser = await userRepository.findById(_id);
      if (!existUser) throw new Error('User not found');
      const deletedUser = await userRepository.delete(_id);
      return deletedUser;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }

  async comparePassword(
    providedPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { UserService };
