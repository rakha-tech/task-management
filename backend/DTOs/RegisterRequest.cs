using System.ComponentModel.DataAnnotations;

namespace TaskApi.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username tidak boleh kosong")]
        [MinLength(3, ErrorMessage = "Username minimal 3 karakter")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password tidak boleh kosong")]
        [MinLength(6, ErrorMessage = "Password minimal 6 karakter")]
        public required string Password { get; set; }
    }
}
