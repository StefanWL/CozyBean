using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using CozyBean.Models;
using MySql.Data.MySqlClient;


namespace CozyBean.Pages
{
    public class OrderConfirmedModel : PageModel
    {
        public string debug;

        private DBConnection CozyBean = new DBConnection();
        public void OnGet(string order, string quantities)
        {
            order = order.Remove(order.Length - 1);
            quantities = quantities.Remove(quantities.Length - 1);
            string[] items = order.Split(';');
            string[] additions = quantities.Split(';');
            var totals = new List<int>();

            for (int i = 0; i < items.Length; i++)
            {
                MySqlConnection Conn = CozyBean.AccessDatabase();
                Conn.Open();

                int total = 0;

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = Conn;
                cmd.CommandType = System.Data.CommandType.Text;

                cmd.CommandText = $"SELECT Sales FROM Menu WHERE Name = '{items[i]}' ";

                MySqlDataReader ResultSet = cmd.ExecuteReader();

                while (ResultSet.Read())
                {
                    total = Convert.ToInt32(ResultSet["Sales"]);

                }

                totals.Add(total + Convert.ToInt32(additions[i]));

                Conn.Close();

            }

            for (int i = 0; i < items.Length; i++)
            {
                MySqlConnection Conn = CozyBean.AccessDatabase();
                Conn.Open();
                MySqlCommand cmd2 = new MySqlCommand();
                cmd2.Connection = Conn;
                cmd2.CommandType = System.Data.CommandType.Text;

                cmd2.CommandText = $"UPDATE Menu SET Sales = {totals[i]} WHERE Name = '{items[i]}'";

                //SqlDataAdapter adapter = new SqlDataAdapter();
                //adapter.InsertCommand = new SqlCommand(cmd2.CommandText, Conn);
                //adapter.InsertCommand.ExecuteNonQuery;

                cmd2.ExecuteNonQuery();
                Conn.Close();
            }
            //SqlCommand command;
            //    SqlDataAdapter adapter = new SqlDataAdapter();
            //    String sql = "";

            //    sql = "Update demotb set TutorialName='"VB.Net Complete"+"' where TutorialID=3";


            //command = new SqlCommand(sql, cnn);

            //adapter.InsertCommand = new SqlCommand(sql, cnn);
            //adapter.InsertCommand.ExecuteNonQuery;

            //command.Dispose(): 
            //cnn.Close();

        }
    }
}
