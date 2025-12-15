using Cars.Application.Cars;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers
{
    public class CarsController  :BaseApiController
    {    public CarsController()
        {

        }
        [HttpGet] // api/cars
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            Console.WriteLine("GetCars called");
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar(Guid id)
        {

            var result = await Mediator.Send(new Details.Query { Id = id });
            if (result == null || result.Value == null)
                return NotFound();
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(Guid id,[FromBody] Car car)
        {
            car.Id = id;
            var result =  await Mediator.Send(new Edit.Command { Car = car });
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }

        [HttpPost] // api/cars
        public async Task<IActionResult> CreateCar([FromBody] Car car)
        {
            var result =  await Mediator.Send(new Create.Command { Car = car });
            if (result.IsSuccess && result.Value != null)
            {
                return CreatedAtAction(nameof(GetCar), new { id = car.Id }, result.Value);
            }
            return BadRequest(result.Error);
        }
        [HttpPatch] // api/cars
        public async Task<IActionResult> EditCar([FromBody] Car car)
        {
            var result = await Mediator.Send(new Edit.Command { Car = car });
            if(result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.Error);
        }

        [HttpDelete("{id}")] // api/cars
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            if (result.IsSuccess)
            {
                return NoContent();
            }
            return BadRequest(result.Error);
        }
        
    }
}
