using Cars.Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class CarValidator :AbstractValidator<Car>

    {
        public CarValidator() { 
            RuleFor(x=> x.Brand).NotEmpty().WithMessage("Brand is required");
            RuleFor(x=> x.Model).NotEmpty().WithMessage("Model is required");
            RuleFor(x=> x.DoorsNumber).InclusiveBetween(2,10).WithMessage("Doors number must be between 2 and 5");
            RuleFor(x=>x.LuggageCapacity).NotEmpty().WithMessage("Luggage capacity is required");
            RuleFor(x=>x.EngineCapacity).NotEmpty().WithMessage("Engine capacity is required");
            RuleFor(x=>x.FuelType).IsInEnum().WithMessage("Fuel type is required");
            RuleFor(x=>x.ProductionDate).NotEmpty().WithMessage("Production date is required");
            RuleFor(x=>x.CarFuelConsumption).NotEmpty().WithMessage("Car fuel consumption is required");
            RuleFor(x=>x.BodyType).IsInEnum().WithMessage("Body type is required");
        }


    }
}
