using System.ComponentModel.DataAnnotations;

namespace Cars.API.DTO;

public class RegisterDto
{
    [Required]
    public string UserName{ get; set; }
    [Required]
    public string DisplayName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    // Przynajmniej 1 cyfra ,1 mała litera z [a-z], 1 duża litera z [A-Z], długość 4-8 znaków 
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4-8}$")]
    public string Password { get; set; }   
}