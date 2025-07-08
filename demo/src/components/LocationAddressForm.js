

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LocationAddressForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);


  const getLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setValue("latitude", lat);
        setValue("longitude", lon);

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
          headers: {
            "User-Agent": "GroceryApp/1.0 (email@example.com)"
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              setValue("address", data.display_name);
            } else {
              alert("Could not retrieve address");
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error in Nominatim fetch:", err);
            alert("Geocoding failed");
            setLoading(false);
          });
      },
      (error) => {
        console.error("Location permission error:", error);
        alert("Permission denied or not available");
        setLoading(false);
      }
    );
  };

  const onSubmit = (data) => {
    console.log("Submitting order:", data);

    fetch("http://localhost:8000/api/submit-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert("Order submitted!");
        console.log(resData);
      })
      .catch((err) => {
        console.error(err);
        alert("Order submission failed");
      });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Shipping Address</h2>
      <button onClick={getLocation} disabled={loading}>
        {loading ? "Getting Location..." : "Use My Current Location"}
      </button>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        <div>
          <label>Address:</label><br />
          <textarea {...register("address", { required: true })} rows="4" cols="50" />
        </div>

        <div>
          <label>Latitude:</label><br />
          <input type="text" {...register("latitude")} readOnly />
        </div>

        <div>
          <label>Longitude:</label><br />
          <input type="text" {...register("longitude")} readOnly />
        </div>

        <button type="submit" style={{ marginTop: 20 }}>Submit Order</button>
      </form>
    </div>
  );
}
