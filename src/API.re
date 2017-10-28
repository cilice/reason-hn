type story = {
  by: string,
  descendants: int,
  id: int,
  score: int,
  time: int,
  title: string,
  url: option(string)
}
and stories = array(story);

let apiBaseUrl = "https://serverless-api.hackernewsmobile.com/";

let topStoriesUrl = (page) => apiBaseUrl ++ ("topstories-25-" ++ (string_of_int(page) ++ ".json"));

let parseStory = (json) : story =>
  Json.Decode.{
    by: json |> field("by", string),
    descendants: json |> field("descendants", int),
    id: json |> field("id", int),
    score: json |> field("score", int),
    time: json |> field("time", int),
    title: json |> field("title", string),
    url: json |> optional(field("url", string))
  };

let parseStories = (json) : array(story) => Json.Decode.(json |> array(parseStory));

let getJson = (url) => Fetch.fetch(url) |> Js.Promise.then_(Fetch.Response.json);

let fetchTopStories = (page) =>
  getJson(topStoriesUrl(page))
  |> Js.Promise.then_(
       (json) => json |> parseStories |> ((stories) => Js.Promise.resolve(Some(stories)))
     )
  |> Js.Promise.catch((_) => Js.Promise.resolve(None));
