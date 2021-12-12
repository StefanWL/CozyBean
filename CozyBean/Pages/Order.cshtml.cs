using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using CozyBean.Models;
using Microsoft.Data.SqlClient;

namespace CozyBean.Pages
{
    public class OrderModel : PageModel
    {
        private DBConnection CozyBean = new DBConnection();

        public MenuItem Item = new MenuItem();

        public void OnGet(int id)
        {
            SqlConnection Conn = CozyBean.AccessDatabase();
            Conn.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = Conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"Select * from Menu where id = {id}";

            SqlDataReader ResultSet = cmd.ExecuteReader();

            while (ResultSet.Read())
            {
                int ID = Convert.ToInt32(ResultSet["id"]);
                string Name = ResultSet["name"].ToString();
                string Description = ResultSet["description"].ToString();
                double Price = Convert.ToDouble(ResultSet["price"]);
                string Category = ResultSet["category"].ToString();
                bool MilkOptions = Convert.ToBoolean(ResultSet["milkoptions"]);
                bool SugarOptions = Convert.ToBoolean(ResultSet["sugaroptions"]);
                bool SizeOptions = Convert.ToBoolean(ResultSet["sizeoptions"]);
                bool WarmOptions = Convert.ToBoolean(ResultSet["warmoptions"]);
                bool Vegan = Convert.ToBoolean(ResultSet["vegan"]);
                bool GlutenFree = Convert.ToBoolean(ResultSet["glutenfree"]);
                int Calories = Convert.ToInt32(ResultSet["calories"]);
                string ImageURL = ResultSet["imageurl"].ToString();

                Item.ID = ID;
                Item.Name = Name;
                Item.Description = Description;
                Item.Price = Price;
                Item.Category = Category;
                Item.MilkOptions = MilkOptions;
                Item.SugarOptions = SugarOptions;
                Item.SizeOptions = SizeOptions;
                Item.WarmOptions = WarmOptions;
                Item.Vegan = Vegan;
                Item.GlutenFree = GlutenFree;
                Item.Calories = Calories;
                Item.ImageURL = ImageURL;
            }

            Conn.Close();

        }
    }
}

