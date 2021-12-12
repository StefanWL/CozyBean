using System;
using Microsoft.Data.SqlClient;


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
                return "Server=tcp:cozybean.database.windows.net,1433;" +
                "Database=menu;User ID=stefanwhittakerlee;" +
                "Password=CXZfmpq7;Encrypt=True;" +
                "TrustServerCertificate=False;Connection Timeout=30;";
            }
        }

        public SqlConnection AccessDatabase()
        {
            //Accessing Database with connection string
            return new SqlConnection("Server = tcp:cozybean.database.windows.net, 1433; Initial Catalog = cozybean; Persist Security Info = False; User ID = stefanwhittakerlee; Password = CXZfmpq7; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30;");
        }

    }
}