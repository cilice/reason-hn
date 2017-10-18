'use strict';

import * as React       from "react";
import * as ReasonReact from "reason-react/lib/es6/src/reasonReact.js";

var component = ReasonReact.statelessComponent("Story");

function stringEl(str) {
  return str;
}

function make(story, _) {
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
      return React.createElement("li", undefined, React.createElement("article", undefined, React.createElement("h2", undefined, story[/* title */5]), renderUrl(/* () */0)));
    });
  return newrecord;
}

export {
  component ,
  stringEl  ,
  make      ,
  
}
/* component Not a pure module */
