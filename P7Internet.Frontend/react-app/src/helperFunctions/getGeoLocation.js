import { toast } from "react-toastify";

//Function for collection Geolocation
export function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      localStorage.setItem(
        "geolocation",
        JSON.stringify({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          acc: pos.coords.accuracy,
        })
      );
    });
  } else toast.error("Geolokation understøttes ikke af din browser");
}
