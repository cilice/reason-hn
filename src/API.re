type story = {
  by: string,
  descendants: int,
  id: int,
  score: int,
  time: int,
  title: string,
  url: option string
};

type stories = array story;

let apiBaseUrl = "https://serverless-api.hackernewsmobile.com/";

let topStoriesUrl page => apiBaseUrl ^ "topstories-25-" ^ string_of_int page ^ ".json";

let parseStory json :story =>
  Json.Decode.{
    by: json |> field "by" string,
    descendants: json |> field "descendants" int,
    id: json |> field "id" int,
    score: json |> field "score" int,
    time: json |> field "time" int,
    title: json |> field "title" string,
    url: json |> optional (field "url" string)
  };

let parseStories json :array story => Json.Decode.(json |> array parseStory);

let fetchTopStories page (errorCallback, callback) =>
  Fetch.fetch (topStoriesUrl page)
  |> Js.Promise.then_ Fetch.Response.json
  |> Js.Promise.then_ (
       fun json =>
         json
         |> parseStories
         |> (
           fun stories => {
             callback (page, stories);
             Js.Promise.resolve None
           }
         )
     )
  |> Js.Promise.catch (
       fun _ => {
         errorCallback ();
         Js.Promise.resolve None
       }
     );
