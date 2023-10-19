using P7Internet.Persistence.UserRepository;
using P7Internet.Persistence.Connection;
using SharedObjects;

class CreateUserService
{

    static IDbConnectionFactory connectionFactory = new MySqlConnectionFactory("Server=127.0.0.1;Port=3308;Database=p7-internet;Uid=root;Pwd=password;");
    IUserRepository userRepository = new UserRepository(connectionFactory);

    public CreateUserService()
    {
        
    }
}