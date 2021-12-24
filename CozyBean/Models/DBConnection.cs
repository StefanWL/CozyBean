using System;
using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;


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
                string connection = Environment.GetEnvironmentVariable("MYSQLCONNSTR_localdb");
                var dbhost = Regex.Match(connection, @"Data Source=(.+?);").Groups[1].Value;
                var server = dbhost.Split(':')[0].ToString();
                var port = dbhost.Split(':')[1].ToString();
                var dbname = Regex.Match(connection, @"Database=(.+?);").Groups[1].Value;
                var dbusername = Regex.Match(connection, @"User Id=(.+?);").Groups[1].Value;
                var dbpassword = Regex.Match(connection, @"Password=(.+?)$").Groups[1].Value;

                return $@"server={server};userid={dbusername};password={dbpassword};database={dbname};port={port};pooling = false; convert zero datetime=True;";
                //Concatonating connnection string values into a single line with proper formating
                //return "Server=tcp:cozybean.database.windows.net,1433;" +
                //"Database=menu;User ID=stefanwhittakerlee;" +
                //"Password=CXZfmpq7;Encrypt=True;" +
                //"TrustServerCertificate=False;Connection Timeout=30;";
            }
        }

        public MySqlConnection AccessDatabase()
        {
            //Accessing Database with connection string
            return new MySqlConnection(ConnectionString);
        }

    }
}