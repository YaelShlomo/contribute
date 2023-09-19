using ContributesProjectServer.Models;
using ContributesProjectServer.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ContributeStoreDataBaseSettings>(
builder.Configuration.GetSection(nameof(ContributeStoreDataBaseSettings)));

builder.Services.AddSingleton<IContributeStoreDataBaseSettings>(sp =>
sp.GetRequiredService<IOptions<ContributeStoreDataBaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("ContributeStoreDataBaseSettings:ConnectionString")));

builder.Services.AddScoped<IContributeService, ContributeService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
