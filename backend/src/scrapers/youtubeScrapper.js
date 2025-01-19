// // Replace 'YOUR_API_KEY' with your YouTube Data API key
// const API_KEY = 'AIzaSyC3jQGqPVQi1TmODPOE8nYxq3hw9UlbhHo';
// const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// async function getYouTubeData(query) {
//     try {
//         // Fetch search results
//         const searchParams = new URLSearchParams({
//             part: 'snippet',
//             q: query,
//             maxResults: '5',
//             type: 'video',
//             key: API_KEY,
//         });

//         const searchResponse = await fetch(`${BASE_URL}/search?${searchParams}`);
//         if (!searchResponse.ok) throw new Error(`Search error: ${searchResponse.status}`);
//         const searchData = await searchResponse.json();

//         // Fetch video details for each video
//         const videoDetails = await Promise.all(
//             searchData.items.map(async (item) => {
//                 const videoId = item.id.videoId;
//                 const description = item.snippet.description;
//                 const link = `https://www.youtube.com/watch?v=${videoId}`;

//                 const statsParams = new URLSearchParams({
//                     part: 'statistics',
//                     id: videoId,
//                     key: API_KEY,
//                 });

//                 const statsResponse = await fetch(`${BASE_URL}/videos?${statsParams}`);
//                 const statsData = await statsResponse.json();
//                 const stats = statsData.items[0]?.statistics || {};

//                 const commentsParams = new URLSearchParams({
//                     part: 'snippet',
//                     videoId,
//                     maxResults: '5',
//                     key: API_KEY,
//                 });

//                 const commentsResponse = await fetch(`${BASE_URL}/commentThreads?${commentsParams}`);
//                 const commentsData = await commentsResponse.json();
//                 const topComments = commentsData.items?.map(item => item.snippet.topLevelComment.snippet.textDisplay) || [];

//                 return { description, link, stats, topComments };
//             })
//         );

//         return videoDetails;
//     } catch (error) {
//         console.error('Error fetching YouTube data:', error);
//         return null;
//     }
// }

// // Example Usage
// getYouTubeData('Learn JavaScript').then((data) => console.log(JSON.stringify(data, null, 2)));
