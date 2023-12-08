import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { useGetOfferMutation } from "../services/offerEndpoints";
import Offer from "../objects/Offer";

const RecipeOfferElement = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  const stores = useSelector((state) => state.offers.stores);
  const radius = useSelector((state) => state.offers.radius);
  const recipes = useSelector((state) => state.recipe.recipes);

  const currentRecipeIndex = useSelector(
    (state) => state.recipe.currentRecipeIndex
  );

  const recipe = recipes[currentRecipeIndex];
  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );

  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState(new Offer());

  const [getOffer, { isOfferLoading }] = useGetOfferMutation();

  function CalcMin(arr) {
    let min;
    for (let i = 0; i < arr.length; i++) {
      min = Math.min(arr[i].price);
    }
    return min;
  }

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        //let _radius = toggleStateIsRadius ? radius : 3000; //TODO: INDSÆT DETTE VED MERGE MED DEVELOP
        let _radius = 3000;
        var response = await getOffer({
          lat: encodeURIComponent(
            Math.round(JSON.parse(localStorage.getItem("geolocation")).lat)
          ),
          lon: encodeURIComponent(
            Math.round(JSON.parse(localStorage.getItem("geolocation")).lon)
          ),
          pageSize: 24,
          searchTerm: encodeURIComponent(ingredient.text),
          radius: encodeURIComponent(_radius),
          upcoming: false,
          stores: encodeURIComponent(stores),
        }).unwrap();
      } catch (error) {
        console.log("Error " + error);
      }
      return response;
    };
    if (ingredient.text != "") {
      //Empty check should be removed when the empty ingredient issue is fixed
      fetchOffer().then((res) => {
        res.forEach((offer) => {
          let _offer = new Offer();
          _offer.name = offer.name;
          _offer.id = offer.id;
          _offer.price = offer.price;
          _offer.size = offer.size;
          _offer.store = offer.store;
          _offer.created = offer.created;
          _offer.ending = offer.ending;
          _offer.storeImage = offer.image;
          let _offers = offers;
          _offers.push(_offer);
          setOffers(_offers);
          setOffer(FindCheapestProduct(_offers));
        });
      });
    }

    fetchOffer().then((res) => {
      for (let i = 0; i < res.length; i++) {
        let _offer = new Offer();
        _offer.name = res[i].name;
        _offer.id = res[i].id;
        _offer.price = res[i].price;
        _offer.store = res[i].store;
        _offer.created = res[i].created;
        _offer.ending = res[i].ending;
        _offer.storeImage = res[i].image;
        setOffer(_offer);
        let _offers = offers;
        _offers.push(_offer);
        setOffers(_offers);
      }
    });
  }, []);

  return (
    <div className="RecipeOfferElement" data-testid="RecipeOfferElement">
      <li>
        {FindFullIngredientName(ingredient.text, recipe)}
        {ingredientIsOwned(ingredient, ownedIngredientsList) ? (
          <b className=""> Ejet </b>
        ) : (
          <>
            <p className="offer-default no-print offer-price">
              {offer.price},-
            </p>
            <img
              className="IngredientStoreLogo offer-default no-print"
              src={offer.storeImage}
              alt=""
            />
          </>
        )}
      </li>
    </div>
  );
};
//#region Helpers
function FindCheapestProduct(arr) {
  let offer;
  offer = arr.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
  return offer;
}
function FindFullIngredientName(shortName, recipe) {
  let fullName;
  const fullNames = recipe.recipe.ingredients;
  fullName = fullNames.find((fullName) =>
    fullName.toLowerCase().includes(shortName.toLowerCase())
  );
  return fullName;
}
//#endregion

export default RecipeOfferElement;
