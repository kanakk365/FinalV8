import express from "express";

const taglineRouter = express.Router();

taglineRouter.post("/ai", async (req, res) => {
  console.log("tagline");
  const { data } = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).send("Invalid or missing query parameter.");
  }

  async function initiateComRun(value) {
    const url =
      "https://api.langflow.astra.datastax.com/lf/bbcbdfcc-0418-4a40-b0b9-22e474561e53/api/v1/run/cb13a70f-07f2-4be4-80ef-fa7db264e63b?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer AstraCS:tscbIcxFPPfOCXYpZOZsSTte:1d0f3035e7462a9ba9da1e1fd88e9640a9eb0ab372720433fa3df7de9db5031f`,
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

      const info = await response.json();
      const message = info.outputs?.[0]?.outputs?.[0]?.artifacts?.message;

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
      tagline: result,
    };

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in query route:", error);
    return res
      .status(500)
      .send("An error occurred while processing the query.");
  }
});

export default taglineRouter;
