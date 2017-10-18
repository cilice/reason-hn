let component = ReasonReact.statelessComponent "Story";

let stringEl str => ReasonReact.stringToElement str;

let make story::(story: API.story) _children => {
  let renderUrl () =>
    <p>
      (
        switch story.url {
        | Some url => <a href=url target="_blank"> (stringEl url) </a>
        | None => ReasonReact.nullElement
        }
      )
    </p>;
  {
    ...component,
    render: fun _ =>
      <li> <article> <h2> (stringEl story.title) </h2> (renderUrl ()) </article> </li>
  }
};
