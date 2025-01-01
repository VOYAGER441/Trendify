import { apiObject } from "@/constants";
import * as Interface from "@/interface";
import axios from "axios";
import service from ".";
import { getCurrentUserCategory } from "./appwrite.service";

// global variable
export const GLOBAL_FEED_NEWS: Interface.INewsResponse[] = [];
export const LATEST_FEED_NEWS: Interface.INewsResponse[] = [];
export const ALL_NEWS_FEED: Interface.INewsResponse[] = [];
export const SEARCH_NEWS_FEED: Interface.INewsResponse[] = [];
export const CATEGORY_NEWS_FEED: Interface.INewsResponse[] = [];
// functions to call multiple api and combine the data

//function for latest news component using News Data api
async function latestNewsCollectionByNewsData() {
  try {
    const response = await axios.get(
      `${apiObject.NEWS_DATA_URL}/latest?apikey=${apiObject.NEWS_DATA}&language=fr,en`
    );

    // Function to convert UTC time to IST
    const convertToIST = (utcTime: string): string => {
      const date = new Date(utcTime); // Parse UTC time
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // "Mon"
        year: "numeric", // "2024"
        month: "short", // "Dec"
        day: "numeric", // "30"
        hour: "numeric", // "8"
        minute: "numeric", // "30"
        second: "numeric", // "45"
        hour12: true, // 12-hour format
        timeZone: "Asia/Kolkata", // Set time zone to IST
      };
      return date.toLocaleString("en-IN", options); // Convert to IST format
    };

    // Map response data and convert time to IST
    const mappedData: Interface.INewsResponse[] = response.data.results.map(
      (item: any) => ({
        id: item.article_id,
        imageUrl:
          item.image_url ||
          "https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Fallback to an empty string if no image URL exists
        category: item.category || [], // Ensure the category is an array
        title: item.title,
        time: convertToIST(item.pubDate), // Convert and format the time to IST
        author: item.creator || "Mainak", // Fallback to "Unknown" if no author exists
        description: item.description,
        outerUrl: item.link,
      })
    );

    // Push each item into the GLOBAL_FEED_NEWS array
    mappedData.forEach((news) => {
      LATEST_FEED_NEWS.push(news);
      GLOBAL_FEED_NEWS.push(news);
    });

    console.log("News data successfully added to LATEST_FEED_NEWS");
    return LATEST_FEED_NEWS;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return []; // Return an empty array in case of error
  }
}

// function for get all news
async function getAllGeneralNewsByTheNewsApi() {
  try {
    const response = await axios.get(
      `${apiObject.THE_NEWS_API_URL}/all?api_token=${apiObject.THE_NEWS_API}&language=en`
    );

    // Access the 'data' field in the response
    const newsItems = response.data?.data;
    if (!newsItems || !Array.isArray(newsItems)) {
      console.error(
        "API response does not contain valid news items:",
        response.data
      );
      return []; // Return empty array if 'data' is invalid
    }

    // Function to convert UTC time to IST
    const convertToIST = (utcTime: string): string => {
      const date = new Date(utcTime); // Parse UTC time
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // "Mon"
        year: "numeric", // "2024"
        month: "short", // "Dec"
        day: "numeric", // "30"
        hour: "numeric", // "8"
        minute: "numeric", // "30"
        second: "numeric", // "45"
        hour12: true, // 12-hour format
        timeZone: "Asia/Kolkata", // Set time zone to IST
      };
      return date.toLocaleString("en-IN", options); // Convert to IST format
    };

    // Map the data to the expected structure
    const mappedData: Interface.INewsResponse[] = newsItems.map(
      (item: any) => ({
        id: item.uuid, // Using 'uuid' as the unique identifier
        imageUrl:
          item.image_url ||
          "https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Fallback to an empty string if no image URL exists
        category: item.categories || [], // Ensure 'categories' is an array
        title: item.title,
        time: convertToIST(item.published_at), // Convert and format time to IST
        author: item.source || "Mainak", // Fallback to "Unknown" if no author exists
        description: item.snippet,
        outerUrl: item.url,
      })
    );

    // Push each item into the arrays (if necessary)
    mappedData.forEach((news) => {
      ALL_NEWS_FEED.push(news);
      GLOBAL_FEED_NEWS.push(news);
    });

    // Combine all three arrays into one (without duplicates)
    const allNewsCombined = [...ALL_NEWS_FEED, ...GLOBAL_FEED_NEWS].filter(
      (value, index, self) => {
        // Filter out duplicates based on the 'id' (or 'uuid') of the news item
        return self.findIndex((news) => news.id === value.id) === index;
      }
    );

    // Optionally log the result for debugging
    // console.log("Combined News Feed:", allNewsCombined);

    return allNewsCombined; // Return the combined news data
  } catch (error) {
    console.error("Error fetching news data:", error);
    return []; // Return an empty array in case of error
  }
}

// function for search news
async function searchByGNews(searchValue: string) {
  const query = searchValue.trim(); // Trim any extra spaces

  if (!query) {
    console.error("Empty search query");
    return []; // Return empty if search query is empty
  }

  const url = `${apiObject.G_NEWS_API_URL}search?q=${query}&apikey=${apiObject.G_NEWS_API}`;
  // console.log("Request URL:", url); // Log the URL to verify it is correct

  try {
    const response = await axios.get(url);

    // Handle successful response and map data
    const mappedData = response.data.articles.map((item: any) => ({
      id: item.url,
      imageUrl:
        item.image ||
        "https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: item.source?.name || [],
      title: item.title,
      time: item.publishedAt,
      author: item.author || "Unknown",
      description: item.content,
      outerUrl: item.url,
    }));

    // console.log("Mapped News Data:", mappedData);
    // Push each item into the arrays (if necessary)
    mappedData.forEach((news: Interface.INewsResponse) => {
      SEARCH_NEWS_FEED.push(news);
      GLOBAL_FEED_NEWS.push(news);
    });

    // Combine all three arrays into one (without duplicates)
    const allNewsCombined = [...SEARCH_NEWS_FEED, ...GLOBAL_FEED_NEWS].filter(
      (value, index, self) => {
        // Filter out duplicates based on the 'id' (or 'uuid') of the news item
        return self.findIndex((news) => news.id === value.id) === index;
      }
    );
    return allNewsCombined;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return []; // Return an empty array if there's an error
  }
}

async function categorySearch(categoryValue: string) {
  try {
    const response = await axios.get(
      `${apiObject.NEWS_API_URL}/everything?q=${categoryValue}&language=en&pageSize=20&apiKey=${apiObject.NEWS_API}`
    );

    // Access the articles directly from response.data.articles
    const newsItems = response.data?.articles;

    if (!newsItems || !Array.isArray(newsItems)) {
      console.error(
        "API response does not contain valid news items:",
        response.data
      );
      return []; // Return empty array if 'articles' is invalid
    }

    // Function to convert UTC time to IST
    const convertToIST = (utcTime: string): string => {
      const date = new Date(utcTime); // Parse UTC time
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // "Mon"
        year: "numeric", // "2024"
        month: "short", // "Dec"
        day: "numeric", // "30"
        hour: "numeric", // "8"
        minute: "numeric", // "30"
        second: "numeric", // "45"
        hour12: true, // 12-hour format
        timeZone: "Asia/Kolkata", // Set time zone to IST
      };
      return date.toLocaleString("en-IN", options); // Convert to IST format
    };

    // Map the data to the expected structure
    const mappedData: Interface.INewsResponse[] = newsItems.map(
      (item: any) => ({
        id: item.title, // Using 'title' as the unique identifier
        imageUrl: item.urlToImage || "https://via.placeholder.com/150", // Fallback if image URL is not available
        category: [], // 'categories' field doesn't exist in the response, so it can be empty
        title: item.title,
        time: convertToIST(item.publishedAt), // Convert and format time to IST
        author: item.author || "Unknown", // Fallback to "Unknown" if no author exists
        description: item.content,
        outerUrl: item.url,
      })
    );

    // Optional: Ensure no duplicates in the global feed
    mappedData.forEach((news) => {
      CATEGORY_NEWS_FEED.push(news);
      GLOBAL_FEED_NEWS.push(news);
    });

    // Combine all three arrays into one (without duplicates)
    const allNewsCombined = [...CATEGORY_NEWS_FEED, ...GLOBAL_FEED_NEWS].filter(
      (value, index, self) => {
        return self.findIndex((news) => news.id === value.id) === index; // Filter out duplicates based on 'id'
      }
    );

    return allNewsCombined;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return []; // Return an empty array in case of an error
  }
}

// get user selected news

async function fetchAndStoreCategoryNews() {
  console.log('enter the user selected news category');
  
  try {
    // Step 1: Get the current user's selected category
    const selectedCategories = await getCurrentUserCategory();
    if (!selectedCategories || selectedCategories.length === 0) {
      console.error("No categories found for the current user.");
      return;
    }

    // Step 2: Fetch news for each selected category
    for (const category of selectedCategories) {
      const newsData = await categorySearch(category); // Use the categorySearch function
      if (newsData.length > 0) {
        // Step 3: Store fetched news into global arrays
        newsData.forEach((news) => {
          CATEGORY_NEWS_FEED.push(news); // Store in category-specific feed
          GLOBAL_FEED_NEWS.push(news); // Store in global feed
        });
      }
    }

    // Step 4: Remove duplicates from GLOBAL_FEED_NEWS
    const uniqueGlobalFeed = GLOBAL_FEED_NEWS.filter(
      (value, index, self) =>
        self.findIndex((news) => news.id === value.id) === index
    );
    GLOBAL_FEED_NEWS.length = 0; // Clear the existing array
    GLOBAL_FEED_NEWS.push(...uniqueGlobalFeed); // Add back the unique news

    console.log("Category news stored successfully!");
  } catch (error) {
    console.error("Error fetching and storing category news:", error);
  }
}

fetchAndStoreCategoryNews();

export default {
  latestNewsCollectionByNewsData,
  getAllGeneralNewsByTheNewsApi,
  searchByGNews,
  categorySearch,
  fetchAndStoreCategoryNews,
};
