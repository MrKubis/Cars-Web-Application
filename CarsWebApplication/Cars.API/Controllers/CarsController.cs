using Cars.Application.Cars;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
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
        public async Task<IActionResult> GetCar(Guid Id)
        {

            var result = await Mediator.Send(new Details.Query { Id = Id });
            if (result == null || result.Value == null)
                return NotFound();
            if (result.IsSuccess)
                return Ok(result.Value);
            return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(Guid id, Car car)
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
        public async Task<IActionResult> CreateCar(Car car)
        {
            var result =  await Mediator.Send(new Create.Command { Car = car });
            if (result.IsSuccess && result.Value != null)
            {
                return CreatedAtAction(nameof(GetCar), new { id = car.Id }, result.Value);
            }
            return BadRequest(result.Error);
        }
    }
}
