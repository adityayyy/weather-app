"use client"; // For Next.js client-side rendering

import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny } from "react-icons/wi"; // Weather icon for the title
import { BiMap } from "react-icons/bi"; // Location icon
import { FaSearch } from "react-icons/fa"; // Search icon

export default function WeatherApp() {
  const [city, setCity] = useState(""); // State to store user input for city
  const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data
  const [error, setError] = useState(null); // State to store error messages

  const apiKey = "522a29bcf6ed91ad523a945d38020eec"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Request for the entered city
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      // Set weather data
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error fetching weather data. Please check the city name.");
      setWeatherData(null); // Clear previous weather data
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Weather Input Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg py-4 px-6 sm:px-10">
        <div className="flex items-center mb-4 sm:mb-0">
          {/* Weather Title with Icon */}
          <WiDaySunny size={40} className="text-yellow-500 mr-3" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700">Weather</h1>
        </div>
        <form onSubmit={fetchWeather} className="flex items-center w-full sm:w-auto space-x-3">
          <BiMap size={24} className="text-gray-600" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search location..."
            className="w-full sm:w-64 py-2 px-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg transition duration-300"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>

      {/* Weather Info Section */}
      {weatherData && (
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-lg w-full sm:max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
            {weatherData.name}
          </h2>
          <div className="flex flex-col sm:flex-row justify-around items-center mb-6 space-y-6 sm:space-y-0">
            <div className="text-center">
              <p className="text-5xl sm:text-6xl font-semibold text-gray-800">
                {weatherData.main.temp}°C
              </p>
              <p className="text-gray-600">Feels like {weatherData.main.feels_like}°C</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl text-gray-600 capitalize">
                {weatherData.weather[0].description}
              </p>
              <p className="text-gray-600">Humidity: {weatherData.main.humidity}%</p>
              <p className="text-gray-600">Wind Speed: {weatherData.wind.speed} m/s</p>
              <p className="text-gray-600">Visibility: {weatherData.visibility / 1000} km</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg text-center shadow-sm">
              <p className="text-lg font-medium text-gray-700">Pressure</p>
              <p className="text-2xl font-semibold text-gray-800">{weatherData.main.pressure} hPa</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center shadow-sm">
              <p className="text-lg font-medium text-gray-700">Sunrise</p>
              <p className="text-2xl font-semibold text-gray-800">
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg text-center shadow-sm">
              <p className="text-lg font-medium text-gray-700">Sunset</p>
              <p className="text-2xl font-semibold text-gray-800">
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && <p className="mt-6 text-red-500 text-lg text-center">{error}</p>}
    </div>
  );
}
