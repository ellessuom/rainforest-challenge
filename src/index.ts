import fetch from 'node-fetch';

interface ChallengeResponse {
  follow: string;
  message: string;
}

async function rainforestChallenge(url: string): Promise<void> {
  console.log(`## Visiting ${url} ##`);
  try {
    const response = await fetch(url);
    const data = await response.json() as ChallengeResponse;

    console.log(data.message); // To see the message in each step

    if (data.message === "This is not the end") {
      // Create a URL object from the 'follow' link
      const followUrl = new URL(data.follow);

      // Add '.json' before the query parameters
      followUrl.pathname += '.json';

      // Convert URL object back to string
      const newUrl = followUrl.toString();

      console.log(`Following to: ${newUrl}`);

      // Recursively call the function with the new URL
      await rainforestChallenge(newUrl);
    } else {
      console.log("End of the challenge reached!");
      console.log(data);
    }
  } catch (error) {
    console.error("Error encountered: ", error);
  }
}

// Starting URL
const startingUrl: string = "https://www.letsrevolutionizetesting.com/challenge.json";

// Initiate the process
rainforestChallenge(startingUrl);
