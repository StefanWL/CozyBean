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
    public class MenuModel : PageModel
    {
        public List<MenuItem> menuItems = new List<MenuItem> { };

        private DBConnection CozyBean = new DBConnection();
        public void OnGet(string category)
        {

            MySqlConnection Conn = CozyBean.AccessDatabase();
            Conn.Open();
            MySqlCommand cmd = Conn.CreateCommand();

            if (category == "popular")
            {
                cmd.CommandText = "Select * from Menu order by sales desc limit 6";
            }
            else if (category == "favourite")
            {

            }
            else
            {
                cmd.CommandText = "Select * from Menu where lower(category) like lower(@key)";
                cmd.Parameters.AddWithValue("@key", category);
            }
            
            cmd.Prepare();

            MySqlDataReader ResultSet = cmd.ExecuteReader();

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

                MenuItem NewItem = new MenuItem();
                NewItem.ID = ID;
                NewItem.Name = Name;
                NewItem.Description = Description;
                NewItem.Price = Price;
                NewItem.Category = Category;
                NewItem.MilkOptions = MilkOptions;
                NewItem.SugarOptions = SugarOptions;
                NewItem.SizeOptions = SizeOptions;
                NewItem.WarmOptions = WarmOptions;
                NewItem.Vegan = Vegan;
                NewItem.GlutenFree = GlutenFree;
                NewItem.Calories = Calories;
                NewItem.ImageURL = ImageURL;

                menuItems.Add(NewItem);
            }

            Conn.Close();

        }
    }
}
