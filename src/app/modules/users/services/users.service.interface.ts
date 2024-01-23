export interface UsersServiceInterface {
  findByUsername(username: string): Promise<void>;
}
