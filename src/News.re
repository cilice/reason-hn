type state = {
  stories: API.stories,
  page: int,
  loading: bool
};

type action =
  | Loaded API.stories
  | Loading
  | LoadingFailed;

let name = "News";

let component = ReasonReact.reducerComponent name;

let loadNextPage {ReasonReact.state: state, reduce} => {
  API.fetchTopStories state.page
  |> Js.Promise.then_ (
       fun result => {
         switch result {
         | Some stories => reduce (fun _ => Loaded stories) ()
         | None => reduce (fun _ => LoadingFailed) ()
         };
         Js.Promise.resolve None
       }
     )
  |> ignore;
  reduce (fun () => Loading) ()
};

let make _children => {
  ...component,
  initialState: fun () => {stories: [||], page: 0, loading: false},
  reducer: fun action state =>
    switch action {
    | Loading => ReasonReact.Update {...state, loading: true}
    | LoadingFailed => ReasonReact.Update {...state, loading: false}
    | Loaded data =>
      let stories = Array.append state.stories data;
      ReasonReact.Update {stories, page: state.page + 1, loading: false}
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
        Array.map
          (fun (story: API.story) => <Story key=(string_of_int story.id) story />)
          self.state.stories;
      <ol> (ReasonReact.arrayToElement titles) </ol>
    }
};
