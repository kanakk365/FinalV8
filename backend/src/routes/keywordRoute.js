import express from "express";


// Replace 'YOUR_API_KEY' with your YouTube Data API key
const API_KEY = 'AIzaSyArmwGZbmCyLRogkY1mQ5ipKObYIz6meok';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function getYouTubeData(query) {
    try {
        // Fetch search results
        const searchParams = new URLSearchParams({
            part: 'snippet',
            q: query,
            maxResults: '5',
            type: 'video',
            key: API_KEY,
        });

        const searchResponse = await fetch(`${BASE_URL}/search?${searchParams}`);
        if (!searchResponse.ok) throw new Error(`Search error: ${searchResponse.status}`);
        const searchData = await searchResponse.json();

        // Fetch video details for each video
        const videoDetails = await Promise.all(
            searchData.items.map(async (item) => {
                const videoId = item.id.videoId;
                const description = item.snippet.description;
                const link = `https://www.youtube.com/watch?v=${videoId}`;

                const statsParams = new URLSearchParams({
                    part: 'statistics',
                    id: videoId,
                    key: API_KEY,
                });

                const statsResponse = await fetch(`${BASE_URL}/videos?${statsParams}`);
                const statsData = await statsResponse.json();
                const stats = statsData.items[0]?.statistics || {};

                const commentsParams = new URLSearchParams({
                    part: 'snippet',
                    videoId,
                    maxResults: '5',
                    key: API_KEY,
                });

                const commentsResponse = await fetch(`${BASE_URL}/commentThreads?${commentsParams}`);
                const commentsData = await commentsResponse.json();
                const topComments = commentsData.items?.map(item => item.snippet.topLevelComment.snippet.textDisplay) || [];

                return { description, link, stats, topComments };
            })
        );

        return videoDetails;
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return null;
    }
}



const keywordRouter = express.Router();

keywordRouter.post("/ai", async (req, res) => {
  console.log("keyword");
  const { data } = req.body;
  console.log(data);

  if (!data) {
    return res.status(400).send("Invalid or missing query parameter.");
  }

  async function initiateComRun(value) {
    const url =
      "https://api.langflow.astra.datastax.com/lf/2a2d7b01-2bf3-4dd5-82d1-501aa29b152e/api/v1/run/a99063c2-9ad7-4914-9aec-b25f0d334def?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer AstraCS:pbFdhxiPTPTlZBbOcbWqKoUw:d3bb8db55c4b29469be0533421736e1827ec33f32cf4610a6f81e5cc46294434`,
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

  async function youtubeLang(value) {
    const url =
      "https://api.langflow.astra.datastax.com/lf/2a2d7b01-2bf3-4dd5-82d1-501aa29b152e/api/v1/run/a99063c2-9ad7-4914-9aec-b25f0d334def?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer AstraCS:MpGUeZjTOgsTPLdZxTgtAyiv:e89c82024ab9a121cca775aa2a1a558f962a7b0a70dfc129c9e7adc5fdc4f344`,
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
  
    // Check if result exists and is of correct type
    if (!result) {
      return res
        .status(500)
        .send("Failed to process query through Langflow API.");
    }
  
    // Parse result into JSON if valid
    const resultObj = JSON.parse(result);
    const finalYoutubeData = resultObj?.YouTube;
  
    if (!finalYoutubeData) {
      return res.status(500).send("No YouTube data found in response.");
    }
  
    // Scrape YouTube data
    const youtubeScrapper = await getYouTubeData(finalYoutubeData);
    console.log(youtubeScrapper);
  
    // Handle youtubeScrapper not being valid
    if (!youtubeScrapper) {
      return res.status(500).send("Failed to scrape YouTube data.");
    }
  
    // Return the result as a response
    let message = { youtubeScrapper };
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error in query route:", error);
    return res.status(500).send("An error occurred while processing the query.");
  }
  
});
export default keywordRouter;
