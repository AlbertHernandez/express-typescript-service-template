import { User } from "./user";

export interface UserRepository {
  getById(id: string): Promise<User | null>;
}
