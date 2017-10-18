'use strict';

import * as React       from "react";
import * as Pervasives  from "bs-platform/lib/es6/pervasives.js";
import * as ReasonReact from "reason-react/lib/es6/src/reasonReact.js";

var component = ReasonReact.statelessComponent("Story");

function make(story, index, _) {
  var renderUrl = function () {
    var match = story[/* url */6];
    var tmp;
    if (match) {
      var url = match[0];
      tmp = React.createElement("a", {
            href: url,
            target: "_blank"
          }, url);
    } else {
      tmp = null;
    }
    return React.createElement("p", undefined, tmp);
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("article", undefined, React.createElement("h2", undefined, Pervasives.string_of_int(index) + ". ", story[/* title */5]), renderUrl(/* () */0));
    });
  return newrecord;
}

export {
  component ,
  make      ,
  
}
/* component Not a pure module */
