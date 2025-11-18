using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    internal class Delete
    {
        public class Command: IRequest<Unit>
        {
            public class CommandValidator : AbstractValidator<Command>
            {
                /*
                public CommandValidator()
                {
                    RuleFor(x => x.Car).SetValidator(new CarValidator());
                }
                */

            }
        }
    }
}
