using System.ComponentModel.DataAnnotations;

namespace TaskApi.DTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username tidak boleh kosong")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password tidak boleh kosong")]
        public required string Password { get; set; }
    }
}
