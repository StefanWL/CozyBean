using System;
using MySql.Data.MySqlClient;


namespace CozyBean.Models
{
    public class DBConnection
    {
        private static string User { get { return "azure"; } }
        private static string Password { get { return "6#vWHD_$"; } }
        private static string Database { get { return "cozybean"; } }
        private static string Server { get { return "127.0.0.1"; } }
        private static string Port { get { return "55401"; } }

        protected static string ConnectionString
        {
            get
            {
                //Concatonating connnection string values into a single line with proper formating
                return "Data Source = " + Server
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