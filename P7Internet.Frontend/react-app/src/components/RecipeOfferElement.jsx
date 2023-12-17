import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { useGetOfferMutation } from "../services/offerEndpoints";
import Offer from "../objects/Offer";
import { offersActions } from "../features/offersSlice";

const RecipeOfferElement = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  const stores = useSelector((state) => state.offers.stores);
  const radius = useSelector((state) => state.offers.realRadius);
  const recipe = useSelector((state) => state.recipe.recipeToShow);

  const ownedIngredients = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );

  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState(new Offer());

  const [getOffer] = useGetOfferMutation();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        let _radius = toggleStateIsRadius ? radius : 3000;
        var response = await getOffer({
          lat: encodeURIComponent(
            Math.round(JSON.parse(localStorage.getItem("geolocation")).lat)
          ),
          lon: encodeURIComponent(
            Math.round(JSON.parse(localStorage.getItem("geolocation")).lon)
          ),
          pageSize: 1,
          searchTerm: encodeURIComponent(ingredient.text),
          radius: encodeURIComponent(_radius),
          upcoming: false,
          stores: encodeURIComponent(stores),
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
      return response;
    };
    if (!ingredientIsOwned(ingredient, ownedIngredients)) {
      fetchOffer().then((res) => {
        if (res != null) {
          for (let i = 0; i < res.length; i++) {
            let _offer = new Offer();
            _offer.name = res[i].name;
            _offer.id = res[i].id;
            _offer.price = res[i].price;
            _offer.store = res[i].store;
            _offer.created = res[i].created;
            _offer.ending = res[i].ending;
            _offer.storeImage = res[i].image;
            let _offers = offers;
            _offers.push(_offer);
            setOffers(_offers);
            setOffer(FindCheapestProduct(_offers));
          }
          if (FindCheapestProduct(offers).name !== undefined) {
            dispatch(
              offersActions.addTotalPrice({
                [FindCheapestProduct(offers).name]: `${
                  FindCheapestProduct(offers).price
                }`,
              })
            );
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#region Helpers
  function FindCheapestProduct(arr) {
    let offer;
    if (typeof arr === "undefined" || arr.length === 0) return new Offer();
    offer = arr.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
    return offer;
  }

  function FindFullIngredientName(shortName, recipe) {
    let fullName;
    const fullNames = recipe.ingredients;
    // eslint-disable-next-line
    fullName = fullNames.find((fullName) => {
      if (
        new RegExp("(?:^|\\s)" + shortName.toLowerCase(), "i").test(
          fullName.toLowerCase()
        )
      ) {
        return fullName;
      } // i is case insensitive
    });

    return fullName;
  }
  //#endregion

  return (
    <div className="RecipeOfferElement" data-testid="RecipeOfferElement">
      <li>
        {FindFullIngredientName(ingredient.text, recipe)}
        {ingredientIsOwned(ingredient, ownedIngredientsList) ? (
          <b className="no-print"> Ejet </b>
        ) : (
          <>
            <p className="offer-default no-print offer-price">
              {offer.name == null ? "[pris ikke fundet]" : offer.price + ",-"}
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

export default RecipeOfferElement;
