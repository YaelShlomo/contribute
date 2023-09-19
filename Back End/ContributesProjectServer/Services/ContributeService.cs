using ContributesProjectServer.Models;
using MongoDB.Driver;

namespace ContributesProjectServer.Services
{
    public class ContributeService : IContributeService
    {
        private readonly IMongoCollection<Contribute> _contributes;

        public ContributeService(IContributeStoreDataBaseSettings settings, IMongoClient mongoClient) { 
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _contributes = database.GetCollection<Contribute>(settings.ConntributesListCollectionName);
        }
        public Contribute Create(Contribute contribute)
        {
            _contributes.InsertOne(contribute);
            return contribute;
        }

        public List<Contribute> Get()
        {
            return _contributes.Find(Contribute => true).ToList();
        }

        public Contribute Get(int myId)
        {
            return _contributes.Find(contribute => contribute.MyId == myId).FirstOrDefault();   
        }


        public void Remove(int myId)
        {
            _contributes.DeleteOne(contribute => contribute.MyId == myId);
        }

        public void Update(string id, Contribute contribute)
        {
            contribute.Id = id;
            _contributes.ReplaceOne(contribute1 => contribute1.MyId == contribute.MyId, contribute);
        }
    }
}
