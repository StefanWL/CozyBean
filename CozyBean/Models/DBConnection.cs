using System;
using MySql.Data.MySqlClient;


namespace CozyBean.Models
{
    public class DBConnection
    {
        private static string User { get { return "root"; } }
        private static string Password { get { return "root"; } }
        private static string Database { get { return "cozybean"; } }
        private static string Server { get { return "localhost"; } }
        private static string Port { get { return "8889"; } }

        protected static string ConnectionString
        {
            get
            {
                //Concatonating connnection string values into a single line with proper formating
                return "server = " + Server
                + "; user = " + User
                + "; database = " + Database
                + "; port = " + Port
                + "; password = " + Password;
            }
        }

        public MySqlConnection AccessDatabase()
        {
            //Accessing Database with connection string
            return new MySqlConnection(ConnectionString);
        }

    }
}