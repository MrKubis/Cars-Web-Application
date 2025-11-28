using FluentValidation;
using MediatR;
using Cars.Domain;
using Cars.Infrastructure;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Guid Id {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
            {

                public CommandValidator()
                {
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
                var car = await _context.Cars.FindAsync(request.Id, cancellationToken);

                if (car == null)
                    return Result<Unit>.Failure($"Car with id {request.Id} not found.");

                _context.Cars.Remove(car);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!success) return Result<Unit>.Failure("Failed to delete car");

                return Result<Unit>.Success(Unit.Value);
            }
        }        
    }
}
