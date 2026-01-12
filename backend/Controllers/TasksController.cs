using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskApi.Data;
using TaskApi.DTOs;
using TaskApi.Models;

namespace TaskApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TasksController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            return Ok(_db.Tasks.Where(t => t.UserId == userId).ToList());
        }

        [HttpPost]
        public IActionResult Create(CreateTaskRequest request)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var task = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted,
                UserId = userId
            };

            _db.Tasks.Add(task);
            _db.SaveChanges();
            return Ok(new { success = true, message = "Task berhasil dibuat", task });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateTaskRequest request)
        {
            var data = _db.Tasks.Find(id);
            if (data == null) 
                return NotFound(new { success = false, message = "Task tidak ditemukan" });

            // Update hanya field yang dikirim (partial update)
            if (!string.IsNullOrWhiteSpace(request.Title))
                data.Title = request.Title;

            if (request.Description != null)
                data.Description = request.Description;

            if (request.IsCompleted != null)
                data.IsCompleted = request.IsCompleted.Value;

            _db.SaveChanges();

            return Ok(new { success = true, message = "Task berhasil diupdate", task = data });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = _db.Tasks.Find(id);
            if (data == null) return NotFound();

            _db.Tasks.Remove(data);
            _db.SaveChanges();

            return Ok();
        }
    }
}