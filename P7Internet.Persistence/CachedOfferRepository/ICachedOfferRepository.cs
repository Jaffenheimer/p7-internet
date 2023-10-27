﻿using System.Threading.Tasks;
using P7Internet.Shared;

namespace P7Internet.Persistence.CachedIngredientPricesRepository;

public interface ICachedOfferRepository
{
    public Task<Offer> GetOffer(string ingredientName);
    public Task<Offer> GetOfferByStore(string ingredientName, string store);
    public Task<bool> UpsertOffer(string ingredientName, decimal price, string store);
}