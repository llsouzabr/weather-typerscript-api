import { User } from "@src/models/users";


describe('Users functional tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
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

        it('Should return 422 when there is a validation error', async () => {
            const newUser = {
              email: 'john@mail.com',
              password: '1234',
            };
            const response = await global.testRequest.post('/users').send(newUser);
      
            expect(response.status).toBe(422);
            expect(response.body).toEqual({
              code: 422,
              error: "User validation failed: name: Path `name` is required.",
            });
          });
          
    });
});