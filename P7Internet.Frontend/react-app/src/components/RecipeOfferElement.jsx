import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { offersActions } from "../features/offersSlice";
import { useGetOfferMutation } from "../services/offerEndpoints";
import Offer from "../objects/Offer";
import bilkatogo_logo from "../data/bilkatogo_logo.png";

const RecipeOfferElement = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  const radius = useSelector((state) => state.offers.radius);

  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState(new Offer());

  const [getOffer, { isOfferLoading }] = useGetOfferMutation();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        var response = await getOffer({
          lat: encodeURIComponent(
            JSON.parse(localStorage.getItem("geolocation")).lat
          ),
          lon: encodeURIComponent(
            JSON.parse(localStorage.getItem("geolocation")).lon
          ),
          pagesize: encodeURIComponent(24),
          searchTerm: encodeURIComponent(ingredient.text),
          radius: encodeURIComponent(radius),
          upcoming: encodeURIComponent(false),
        }).unwrap();
      } catch (error) {
        console.log("Error " + error);
      }
      return response;
    };
    if (ingredient.text != "") {
      fetchOffer().then((res) => {
        res.forEach((offer) => {
          let _offer = new Offer();
          _offer.name = offer.name;
          _offer.id = offer.id;
          _offer.price = Math.round(CalcMin(res));
          _offer.store = offer.store;
          _offer.created = offer.created;
          _offer.ending = offer.ending;
          _offer.storeImage = offer.image;
          setOffer(_offer);
          let _offers = offers;
          _offers.push(_offer);
          setOffers(_offers);
        });
      });
    }
  }, []);

  return (
    <div className="RecipeOfferElement" data-testid="RecipeOfferElement">
      <li>
        {ingredient.text}
        {ingredientIsOwned(ingredient, ownedIngredientsList) ? (
          <b> Ejet </b>
        ) : (
          <>
            {" - "}
            <p>{offer.price},-</p>
            <img
              className="IngredientStoreLogo"
              src={offer.storeImage}
              alt="new"
            />
          </>
        )}
      </li>
    </div>
  );
};

function CalcMin(arr) {
  let min;
  arr.forEach(function (offer) {
    min = Math.min(offer.price);
  });
  return min;
}

export default RecipeOfferElement;
