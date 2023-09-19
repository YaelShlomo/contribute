namespace ContributesProjectServer.Models
{
    public interface IContributeStoreDataBaseSettings
    {
        string ConntributesListCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
