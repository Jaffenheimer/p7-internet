using System;
using System.Collections.Generic;

namespace SharedObjects
{
  class Fridge
  {
    public Guid Id { get; set; }
    public Guid ConnectedUserId { get; set; }
    List<string> FoodItems { get; set; }

    public Fridge(Guid id, Guid connectedUserId, List<string> foodItems)
    {
      Id = id;
      ConnectedUserId = connectedUserId;
      FoodItems = foodItems;
    }
  }
}