﻿using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.Connection;
using SharedObjects;

namespace P7Internet.Persistence.CachedOfferRepository;

public class CachedOfferRepository : ICachedOfferRepository
{
    private static readonly string TableName = "CachedOfferTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public CachedOfferRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<Offer> GetOffer(string ingredientName)
    {
        var query = $@"SELECT IngredientName, Price, Store FROM {TableName} WHERE IngredientName = @IngredientName";
        
        var resultFromDb = await Connection.QueryFirstOrDefaultAsync<Offer>(query, new {IngredientName = ingredientName});
        
        return resultFromDb;
    }
    
    public async Task<Offer> GetOfferByStore(string ingredientName, string store)
    {
        var query = $@"SELECT IngredientName, Price, Store FROM {TableName} WHERE IngredientName = @IngredientName AND Store = @Store";
        
        var resultFromDb = await Connection.QueryFirstOrDefaultAsync<Offer>(query, new {IngredientName = ingredientName, Store = store});

        return resultFromDb;
    }
    
    public async Task<bool> UpsertOffer(string ingredientName, decimal price, string store)
    {
        var deleteDeprecatedQuery = $@"DELETE FROM {TableName} WHERE CreatedAt < DATE_SUB(NOW(), INTERVAL 7 DAY)";
        
        await Connection.ExecuteAsync(deleteDeprecatedQuery);
        
        var query = $@"INSERT INTO {TableName} (Id, IngredientName, Price, Store, CreatedAt)
                       VALUES (@Id, @IngredientName, @Price, @Store @CreatedAt)
                       ON DUPLICATE KEY UPDATE Price = @Price";
        
        var parameters = new
        {
            Id = Guid.NewGuid(),
            IngredientName = ingredientName,
            Price = price,
            Store = store,
            CreatedAt = DateTime.UtcNow
        };
        
        return await Connection.ExecuteAsync(query, parameters) > 0;
    }
}