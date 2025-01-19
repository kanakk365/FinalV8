import express from "express";

const searchRouter = express.Router();

searchRouter.post("/ai", async (req, res) => {
  console.log("i");
  const { data } = req.body;

  if (!data) {
    return res.status(400).send("Invalid or missing query parameter.");
  }

  async function initiateComRun(value) {
    const url =
      "https://api.langflow.astra.datastax.com/lf/bbcbdfcc-0418-4a40-b0b9-22e474561e53/api/v1/run/28c884c6-c63f-48b2-b915-e42840ebde1b?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer AstraCS:pQWKaQcNZKtlekrwNAqIdWgY:9b5b704463fe3cc23469deb83c04354bf388d02ac9700ffb5f38ac790a3625d5`,
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
      competitors: result,
    };

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in query route:", error);
    return res
      .status(500)
      .send("An error occurred while processing the query.");
  }
});

export default searchRouter;
