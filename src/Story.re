let component = ReasonReact.statelessComponent("Story");

let stringEl = (str) => ReasonReact.stringToElement(str);

let make = (~story: API.story, _children) => {
  let renderHeader = () =>
    <header>
      (
        switch story.url {
        | Some(url) => <h2> <a href=url target="_blank"> (stringEl(story.title)) </a> </h2>
        | None => <h2> (stringEl(story.title)) </h2>
        }
      )
    </header>;
  {...component, render: (_) => <li> <article> (renderHeader()) </article> </li>}
};
