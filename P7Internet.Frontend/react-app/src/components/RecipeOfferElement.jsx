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

    fetchOffer().then((res) => {
      for (let i = 0; i < res.length; i++) {
        let _offer = new Offer();
        _offer.name = res[i].name;
        _offer.id = res[i].id;
        _offer.price = Math.round(CalcMin(res));
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

export default RecipeOfferElement;
