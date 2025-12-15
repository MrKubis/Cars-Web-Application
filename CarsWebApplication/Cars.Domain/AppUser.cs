using Microsoft.AspNetCore.Identity;

namespace Cars.Domain;


public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
}