type state = {
  stories: API.stories,
  page: int,
  loading: bool
};

type action =
  | Loaded (int, API.stories)
  | Loading
  | LoadingFailed;

let name = "News";

let component = ReasonReact.reducerComponent name;

let loadNextPage {ReasonReact.state: state, reduce} => {
  let errorCallback = reduce (fun _ => LoadingFailed);
  let callback = reduce (fun payload => Loaded payload);
  API.fetchTopStories state.page (errorCallback, callback) |> ignore;
  reduce (fun () => Loading) ()
};

let make _children => {
  ...component,
  initialState: fun () => {stories: [||], page: 0, loading: false},
  reducer: fun action state =>
    switch action {
    | Loading => ReasonReact.Update {...state, loading: true}
    | LoadingFailed => ReasonReact.Update {...state, loading: false}
    | Loaded (page, data) =>
      let stories = Array.append state.stories data;
      ReasonReact.Update {stories, page: page + 1, loading: false}
    },
  didMount: fun self => {
    loadNextPage self;
    ReasonReact.NoUpdate
  },
  render: fun self =>
    switch self.state {
    | {loading: true} => <div> (ReasonReact.stringToElement "Loading") </div>
    | {loading: false, stories: [||]} => <div> (ReasonReact.stringToElement "Failed") </div>
    | {loading: false} =>
      let titles =
        Array.mapi
          (
            fun index (story: API.story) =>
              <div key=(string_of_int index)> (ReasonReact.stringToElement story.title) </div>
          )
          self.state.stories;
      <div> (ReasonReact.arrayToElement titles) </div>
    }
};
