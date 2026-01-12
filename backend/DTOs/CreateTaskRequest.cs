using System.ComponentModel.DataAnnotations;

namespace TaskApi.DTOs
{
    public class CreateTaskRequest
    {
        [Required(ErrorMessage = "Title tidak boleh kosong")]
        public required string Title { get; set; }

        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
