namespace ContributesProjectServer.Models
{
    public class ContributeStoreDataBaseSettings : IContributeStoreDataBaseSettings
    {
        public string ConntributesListCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
