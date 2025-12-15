using Cars.Domain;
using Microsoft.AspNetCore.Identity;

namespace Cars.Infrastructure;

public class Seed
{
 public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
 {
  if (!userManager.Users.Any())
  {
   
   Console.WriteLine("Nie ma użytkowników, dodajemy nowych!!!");
   var users = new List<AppUser>
   {
    new AppUser{DisplayName = "Michalek",UserName="michalek67",Email="michal67@gmail.com"},
    new AppUser{DisplayName = "Aśka", UserName = "asia123",Email = "asia123@gmail.com"}
   };

   foreach (var user in users)
   {
    await userManager.CreateAsync(user, "Zaq12wsx");
    Console.WriteLine("dodano użytkownika :" + user.DisplayName);
   }
  }
 }   
}