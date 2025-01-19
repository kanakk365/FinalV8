import express from "express";

const youtubeDataRoute = express.Router();

youtubeDataRoute.post("/ai", async (req, res) => {
  console.log("i");
  const { data } = req.body;

  if (!data) {
    return res.status(400).send("Invalid or missing query parameter.");
  }

  async function initiateComRun(value) {
    const url =
      "https://api.langflow.astra.datastax.com/lf/2a2d7b01-2bf3-4dd5-82d1-501aa29b152e/api/v1/run/cb953ab2-a2a5-489c-ae7c-552d877043f5?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer AstraCS:mlsYaIeZlPyZqgtIgcITArUO:a20c507a4bf4e07b32ea7bae3ba420e31e4f02a0f7e5d06ef6aeade4025119d2`,
    };

    const body = {
      input_value: value,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-2dFP4": {},
        "Prompt-sSYWc": {},
        "ChatOutput-42H9e": {},
        "GoogleGenerativeAIModel-HzlwC": {},
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(
          `Langflow API error: ${response.status} - ${response.statusText}`
        );
        return null;
      }

      const data = await response.json();
      const message = data.outputs?.[0]?.outputs?.[0]?.artifacts?.message;

      if (!message) {
        console.error("No message returned from Langflow API.");
        return null;
      }

      return message;
    } catch (error) {
      console.error("Error initiating Langflow API flow run:", error);
      return null;
    }
  }

  try {
    const finalData = JSON.stringify(data);
    const result = await initiateComRun(finalData);

    console.log("Result" + result);

    if (!result) {
      return res
        .status(500)
        .send("Failed to process query through Langflow API.");
    }

    let message = {
      youtubeData: result,
    };

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in query route:", error);
    return res
      .status(500)
      .send("An error occurred while processing the query.");
  }
});

export default youtubeDataRoute;
