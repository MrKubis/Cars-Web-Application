using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Car Car {  get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Car).SetValidator(new CarValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.Car.Id);
                if(car == null) return null;
                car.Brand = request.Car.Brand ?? car.Brand;
                car.Model = request.Car.Model ?? car.Model;
                car.DoorsNumber = request.Car.DoorsNumber;
                car.LuggageCapacity = request.Car.LuggageCapacity;
                car.EngineCapacity = request.Car.EngineCapacity;
                car.FuelType = request.Car.FuelType;
                car.ProductionDate = request.Car.ProductionDate;
                car.CarFuelConsumption = request.Car.CarFuelConsumption;
                car.BodyType = request.Car.BodyType;
                await _context.SaveChangesAsync();
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!success) return Result<Unit>.Failure("Failed to update car");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
