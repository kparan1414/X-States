import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Arrays
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // selected data
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // useEff for fetching countries
  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.data)
      .then((data) => setCountries(data))
      .catch((err) => {
        console.log("Error in fetching countries", err);
      });
  }, []);

  // useEff for fetching states
  useEffect(() => {
    // reset data if changing/ selecting a new country
    setSelectedState("");
    // setStates([]);
    setSelectedCity("");
    // setCities([]);

    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((res) => res.data)
        .then((data) => setStates(data))
        .catch((err) => {
          console.log("Error in fetching states", err);
        });
    }
  }, [selectedCountry]);

  // useEff for fetching cities
  useEffect(() => {
    // reset data if changing/ selecting a new state
    setSelectedCity("");
    // setCities([]);

    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => res.data)
        .then((data) => setCities(data))
        .catch((err) => {
          console.log("Error in fetching cities", err);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="wrapper">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          className="dropdown"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
          }}
        >
          <option className="dropdown" value="">
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          className="dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
          }}
          disabled={!selectedCountry}
        >
          <option className="" value="">
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          className="dropdown"
          disabled={!selectedState}
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          <option className="" value="">
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}, </span>
          <span className="fade">
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
