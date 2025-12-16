using System.Net;
using System.Security.Claims;
using Cars.API.DTO;
using Cars.API.Services;
using Cars.Application.Cars;
using Cars.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars.API.Controllers
{
    [ApiController]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (isPasswordValid)
            {
                var token = _tokenService.CreateToken(user);
                SetTokenCookie(token);

                return new UserDto()
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                };
            }

            return Unauthorized();
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username is already taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
            };
            var result = _userManager.CreateAsync(user,registerDto.Password);
            if (result.IsCompletedSuccessfully)
            {
                var token = _tokenService.CreateToken(user);
                SetTokenCookie(token);
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                };
            }
            return BadRequest("Registration failed");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var token = _tokenService.CreateToken(user);
            SetTokenCookie(token);
            return new UserDto
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName
            };
        }

        private void SetTokenCookie(string token)
        {
            Response.Cookies.Append("jwt",token,new CookieOptions
            {
                HttpOnly = true,
                Secure = false, //development purposes only
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.Now.AddDays(2)
            });
        }
    }
}

