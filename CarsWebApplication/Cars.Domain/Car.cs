using System.ComponentModel.DataAnnotations;

namespace Cars.Domain;

public enum FuelType { Petrol, Hybrid, Diesel, LPG }
public enum BodyType { Hatchback, Sedan, Kombi, SUV, Roadster }

public class Car
{
    public Guid Id { get; set; }
    [Required]
    [StringLength(30)]
    public string Brand { get; set; }
    [Required]
    [StringLength(50)]
    public string Model { get; set; }
    public int DoorsNumber { get; set; }
    public int LuggageCapacity { get; set; }
    public int EngineCapacity { get; set; }
    public FuelType FuelType { get; set; }
    [DataType(DataType.Date)]
    public DateTime ProductionDate { get; set; }
    public double CarFuelConsumption { get; set; }
    public BodyType BodyType { get; set; }
}