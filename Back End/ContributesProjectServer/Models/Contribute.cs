using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ContributesProjectServer.Models
{
    [BsonIgnoreExtraElements]
    public class Contribute
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("myId")]
        public int MyId { get; set; }

        [BsonElement("name")]
        [Required(ErrorMessage = "Name is required.")]
        [EnglishHebrewOnly(ErrorMessage = "Name can only contain English or Hebrew characters")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("sum")]
        [Required(ErrorMessage = "Sum is required.")]

        public double Sum { get; set; }

        [BsonElement("contributeType")]
        [Required(ErrorMessage = "Contribute Type is required.")]

        public int ContributeType { get; set; } 

        [BsonElement("destination")]
        [Required(ErrorMessage = "Destination is required.")]
        [EnglishHebrewOnly(ErrorMessage = "Destination can only contain English or Hebrew characters")]

        public string Destination { get; set; } = String.Empty;


        [BsonElement("conditions")]
        [EnglishHebrewOnly(ErrorMessage = "Conditions can only contain English or Hebrew characters")]

        public string Conditions { get; set; } = String.Empty;

        [BsonElement("coinType")]
        [Required(ErrorMessage = "Coin Type is required.")]

        public int CoinType { get; set; }

        [BsonElement("gate")]
        [Required(ErrorMessage = "Gate is required.")]

        public double Gate { get; set; }
    }
    
}
