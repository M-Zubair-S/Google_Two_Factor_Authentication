using Google.Authenticator;
using LoginApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace LoginApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpPost]
        [Route("Registration")]
        public string registration(Registration registration)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            SqlCommand cmd = new SqlCommand("INSERT INTO Registration (Username, Password) VALUES (@Username, @Password)", con);
            cmd.Parameters.AddWithValue("@Username", registration.Username);
            cmd.Parameters.AddWithValue("@Password", registration.Password);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i > 0)
            {
                return "Data Inserted";
            }
            else
            {
                return "Error";
            }
        }

        [HttpPost]
        [Route("login")]
        public string login(Registration registration)
        {
            if (string.IsNullOrEmpty(registration.Username) || string.IsNullOrEmpty(registration.Password))
            {
                return "Invalid User";
            }

            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM Registration WHERE Username = @Username AND Password = @Password", con);
            cmd.Parameters.AddWithValue("@Username", registration.Username);
            cmd.Parameters.AddWithValue("@Password", registration.Password);

            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                return "Valid User";
            }
            else
            {
                return "Invalid User";
            }
        }

        [HttpGet]
        [Route("generatetoken")]
        public string GenerateToken()
        {
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            var setupInfo = tfa.GenerateSetupCode("Google Authenticator", "2FA", "ZUBAIR", true, 5); //the width and height of the Qr Code in pixels
            string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
            return qrCodeImageUrl;
        }


        [HttpPost]
        [Route("validate")]
        public async Task<string> Validate()
        {
            
            string googleAuthKey = _configuration.GetValue<string>("appSettings:GoogleAuthKey");

           
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string val = await reader.ReadToEndAsync();

                var result = JsonConvert.DeserializeObject<PinCalss>(val);


                // Create a two-factor authenticator.
                TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();

                // Validate the PIN.
                bool isCorrectPIN = tfa.ValidateTwoFactorPIN(googleAuthKey, result.pin, true);

                // Return the result.
                if (isCorrectPIN)
                {
                    return "Success";
                }
                else
                {
                    return "Authentication Unsuccessful";
                }
            }
        }


        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
        public class PinCalss
        {
            public string pin { get; set; }
        }

    }
}
