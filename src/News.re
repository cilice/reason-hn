type state = {
  stories: API.stories,
  page: int,
  loading: bool
};

type action =
  | Loaded(API.stories)
  | Loading
  | LoadingFailed;

let name = "News";

let component = ReasonReact.reducerComponent(name);

let loadNextPage = ({ReasonReact.state, reduce}) => {
  API.fetchTopStories(state.page)
  |> Js.Promise.then_(
       (result) => {
         switch result {
         | Some(stories) => reduce((_) => Loaded(stories), ())
         | None => reduce((_) => LoadingFailed, ())
         };
         Js.Promise.resolve(None)
       }
     )
  |> ignore;
  reduce(() => Loading, ())
};

let make = (_children) => {
  ...component,
  initialState: () => {stories: [||], page: 0, loading: false},
  reducer: (action, state) =>
    switch action {
    | Loading => ReasonReact.Update({...state, loading: true})
    | LoadingFailed => ReasonReact.Update({...state, loading: false})
    | Loaded(data) =>
      let stories = Array.append(state.stories, data);
      ReasonReact.Update({stories, page: state.page + 1, loading: false})
    },
  didMount: (self) => {
    loadNextPage(self);
    ReasonReact.NoUpdate
  },
  render: (self) =>
    switch self.state {
    | {loading: true} => <div> (ReasonReact.stringToElement("Loading")) </div>
    | {loading: false, stories: [||]} => <div> (ReasonReact.stringToElement("Failed")) </div>
    | {loading: false} =>
      let titles =
        Array.map(
          (story: API.story) => <Story key=(string_of_int(story.id)) story />,
          self.state.stories
        );
      <ol> (ReasonReact.arrayToElement(titles)) </ol>
    }
};
