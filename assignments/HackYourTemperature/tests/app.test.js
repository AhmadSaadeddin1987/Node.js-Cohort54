import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return 400 if no cityName is provided", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required!");
  });

  it("should return 404 if city is not found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "UnknownCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return weather data for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Amsterdam");
  });
});
