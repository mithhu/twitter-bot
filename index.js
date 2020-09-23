const Twitter = require("twitter");
const Sheet = require("./sheet");

(async function () {
  //connect to twitter via api
  const client = new Twitter({
    consumer_key: "FNnLYtmhtuNsSWTA0nGlX86y1",
    consumer_secret: "vbv02XVkyhxpGohPvB4t9JPrV8qeLLEdk4967QNJLpyWHVSNPb",
    access_token_key: "1307320736734879745-OEsRdZbDgkwlImfZr23C7ohJ0I3L3h",
    access_token_secret: "XvRTBKPGT5QS7P8FWtWmEcOxG2ZQ63zLmduRkkknqfZjq",
  });

  // pull next tweet from SS
  const sheet = new Sheet();
  await sheet.load();

  const quotes = await sheet.getRows();
  const status = quotes[0].quote;
  // send tweet
  client.post("statuses/update", { status: status }, function (
    error,
    tweet,
    response
  ) {
    if (error) throw error;
    console.log(tweet); // Tweet body..
  });
  // remove quote from SS
  await quotes[0].delete();

  console.log("tweeted", quotes[0].quote);
})();
