import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello, from backend to frontend!');
});

app.post('/weather', (req, res) => {
const { cityName } = req.body;
if (!cityName)  {
return res.status(400).json({
    success: "false",
    message: "City name is required",
});
}
res.status(200).json({
success: "true",
message: "City received successfully",
Data: {
    City: `You entered: ${cityName}`,
},
});
});
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});