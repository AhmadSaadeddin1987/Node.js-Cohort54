import express from "express";
import keys from "./sources/keys.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
res.send("Hello, from backend to frontend!");
});

app.post("/weather", async (req, res) => {
const { cityName } = req.body;

if (!cityName) {
return res.status(400).json({
    weatherText: "City name is required!",
});
}

try {
const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
);

const data = await response.json();

if (data.cod === "404") {
    return res.status(404).json({
    weatherText: "City is not found!",
    });
}

res.json({
    weatherText: `The temperature in ${data.name} is ${data.main.temp}°C.`,
});
} catch (error) {
res.status(500).json({
    weatherText: "Error fetching weather data.",
});
}
});

export default app;
