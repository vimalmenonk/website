using Glowvitra.Api.Data;
using Glowvitra.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Repositories;

public class UserRepository(AppDbContext dbContext) : IUserRepository
{
    public Task<User?> GetByEmailAsync(string email) =>
        dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

    public Task<User?> GetByIdAsync(int id) =>
        dbContext.Users.FindAsync(id).AsTask();

    public async Task<User> AddAsync(User user)
    {
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return user;
    }
}
