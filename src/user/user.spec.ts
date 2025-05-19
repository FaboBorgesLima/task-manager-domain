import { User } from './user';

describe('User', () => {
  it('should be defined', () => {
    expect(
      new User({
        name: 'name',
        email: 'email@email.com',
      }),
    ).toBeDefined();
  });

  it('should create a user', () => {
    const user = User.create({
      name: 'name',
      email: 'email@email.com',
    });
    expect(user).toBeDefined();
    expect(user.id).toBeUndefined();
    expect(user.getEmail()).toEqual('email@email.com');
    expect(user.getName()).toEqual('name');
  });

  it('should throw an error if email is invalid', () => {
    expect(() => {
      User.create({
        name: 'name',
        email: 'invalid-email',
      });
    }).toThrow();
  });
});
