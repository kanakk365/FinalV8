import React, { useState } from "react";
import { Input } from "./ui/input";
import { ShinyButton } from "./ui/shiny-button";
import axios from "axios";
import { Badge } from "./ui/badge";

function Hero() {
  const [topic, setTopic] = React.useState("");
  const [tag, setTag] = React.useState([]);
  const [competitors, setCompetitors] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);


  const handleTopicChange = async (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/search/ai", {
        data: topic,
      });
      
      
      let comStr = res.data.competitors;
      let comArray = comStr.split(",").map((item) => item.replace(/"/g, "").trim());

      setCompetitors(comArray);
      
        
    } catch (error) {
        console.log(error);
    }
  };

  const handleSubmitTagline = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/tagline/ai", {
        data: topic,
      });
      
      let tagStr = res.data.tagline;
      let tagArray = tagStr.split(",").map((item) => item.replace(/"/g, "").trim());

      setTag(tagArray);
      
        
    } catch (error) {
        console.log(error);
  }
}

const handleSubmitKeywords = async () => {
try {
    const res2 = await axios.post("http://localhost:3000/api/v1/keyword/ai",{data: topic});
    let keyStr = await res2.data.youtubeScrapper
   
    setKeywords(keyStr);

} catch (error) {
    console.log(error);
}
}

const handleSubmitYoutubeData = async () => {
  const res = await axios.post("http://localhost:3000/api/v1/youtube/ai",{data: keywords});
  console.log(res.data);
}
  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-5 gap-5 p-5 max-w-6xl ">
        {" "}
        <input
          onChange={handleTopicChange}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type="text"
          placeholder="Enter topics"
        />
        <ShinyButton onClick={handleSubmit}>Analyse</ShinyButton>
        <ShinyButton onClick={handleSubmitTagline}>Get Tagline</ShinyButton>
        <ShinyButton onClick={handleSubmitKeywords}>Get Keywords</ShinyButton>
        <ShinyButton onClick={handleSubmitYoutubeData}>Get Youtube Data</ShinyButton>
      </div>
      <div className="ans">
        <hr />
        <div className="flex p-5">
          <h1 className="text-2xl">Your Top Competitors : </h1>
          {competitors?.map((msg) => (
            <Badge className={"text-xl mx-2"} >{msg}</Badge>
          ))}
        </div>
        <div className="flex p-5">
          <h1 className="text-2xl">Your Tagline : </h1>
          {tag?.map((msg) => (
            <Badge className={"text-xl mx-2"} >{msg}</Badge>
          ))}
        </div>

        <div className="w-max rounded-md bg-slate-50 h-3"></div>
      </div>
    </div>
  );
}

export default Hero;
