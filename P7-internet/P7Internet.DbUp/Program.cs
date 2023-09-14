using System.Reflection;
using DbUp;

namespace P7_DbUp
{
    class Program
    {
        static int Main(string[] args)
        {
            var connectionString = "this is my connectionstring";

            var upgrader =
                DeployChanges.To
                    .MySqlDatabase(connectionString)
                    .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                    .LogToConsole()
                    .Build();

            upgrader.PerformUpgrade();

            return 0;
        }
    }
}