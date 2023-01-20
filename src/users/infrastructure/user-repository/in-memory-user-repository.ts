import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { USERS } from "./users";

export class InMemoryUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    const user = USERS.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return new User(user.id, user.email, user.slackUserId);
  }
}
