using Glowvitra.Api.DTOs;
using Glowvitra.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductService productService, IInventoryService inventoryService, IWebHostEnvironment env) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll() => Ok(await productService.GetAllAsync());

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await productService.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [RequestSizeLimit(10_000_000)]
    public async Task<IActionResult> Create([FromForm] ProductCreateRequest request)
    {
        var imageUrl = request.ImageUrl?.Trim() ?? string.Empty;

        if (request.ImageFile is not null)
        {
            var uploadsDir = Path.Combine(env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot"), "uploads");
            Directory.CreateDirectory(uploadsDir);

            var extension = Path.GetExtension(request.ImageFile.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var fullPath = Path.Combine(uploadsDir, fileName);

            await using var stream = System.IO.File.Create(fullPath);
            await request.ImageFile.CopyToAsync(stream);

            imageUrl = $"/uploads/{fileName}";
        }

        var product = await productService.CreateAsync(new ProductRequest(
            request.Name,
            request.Description,
            request.Price,
            request.CategoryId,
            imageUrl));

        await inventoryService.UpdateAsync(new InventoryUpdateRequest(product.Id, request.StockQuantity));

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductRequest request)
    {
        var updated = await productService.UpdateAsync(id, request);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await productService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
