using ContributesProjectServer.Models;

namespace ContributesProjectServer.Services
{
    public interface IContributeService
    {
        List<Contribute> Get();
        //Contribute Get(string id);
        Contribute Get(int myID);
        Contribute Create(Contribute contribute);
        void Update(string id, Contribute contribute);
        void Remove(int myId);
    }
}
