using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskApi.Data;
using TaskApi.DTOs;
using TaskApi.Models;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            // Validasi username
            if (string.IsNullOrWhiteSpace(request.Username))
                return BadRequest(new { success = false, message = "Username tidak boleh kosong" });

            // Validasi password
            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Password tidak boleh kosong" });

            // Check username sudah ada
            if (_db.Users.Any(x => x.Username == request.Username))
                return BadRequest(new { success = false, message = "Username sudah terdaftar" });

            // Buat user baru
            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };
            
            // Simpan ke database
            _db.Users.Add(user);
            _db.SaveChanges();
            
            return Ok(new 
            { 
                success = true,
                message = "Register berhasil",
                id = user.Id, 
                username = user.Username 
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            // Validasi input
            if (string.IsNullOrWhiteSpace(request.Username))
                return BadRequest(new { success = false, message = "Username tidak boleh kosong" });

            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Password tidak boleh kosong" });

            // Cari user di database
            var dbUser = _db.Users.FirstOrDefault(x => x.Username == request.Username);
            
            // Jika user tidak ditemukan
            if (dbUser == null)
                return Unauthorized(new { success = false, message = "Username atau password salah" });

            // Verifikasi password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, dbUser.PasswordHash);
            
            // Jika password salah
            if (!isPasswordValid)
                return Unauthorized(new { success = false, message = "Username atau password salah" });

            // Password benar, generate token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, dbUser.Id.ToString()),
                new Claim(ClaimTypes.Name, dbUser.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? string.Empty));

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                success = true,
                message = "Login berhasil",
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = new { id = dbUser.Id, username = dbUser.Username }
            });
        }
    }
}