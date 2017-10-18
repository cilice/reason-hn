let component = ReasonReact.statelessComponent "Story";

let make story::(story: API.story) ::index _children => {
  let renderUrl () =>
    <p>
      (
        switch story.url {
        | Some url => <a href=url target="_blank"> (ReasonReact.stringToElement url) </a>
        | None => ReasonReact.nullElement
        }
      )
    </p>;
  {
    ...component,
    render: fun _ =>
      <article>
        <h2>
          (ReasonReact.stringToElement (string_of_int index ^ ". "))
          (ReasonReact.stringToElement story.title)
        </h2>
        (renderUrl ())
      </article>
  }
};
