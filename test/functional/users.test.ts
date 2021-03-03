import { Users } from "@src/models/users";


describe('Users functional tests', () => {
    beforeEach(async () => {
        await Users.deleteMany({});
      });
    describe('When creating a new user', () => {
        it('should succesfully creat a newuser', async() => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '1234',
              };

              const response = await global.testRequest.post('/users').send(newUser);
              expect(response.status).toBe(201);
              expect(response.body).toEqual(expect.objectContaining(newUser))
        });
    });
});