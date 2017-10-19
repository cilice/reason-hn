'use strict';

import * as React       from "react";
import * as ReasonReact from "reason-react/lib/es6/src/reasonReact.js";

var component = ReasonReact.statelessComponent("Story");

function stringEl(str) {
  return str;
}

function make(story, _) {
  var renderHeader = function () {
    var match = story[/* url */6];
    return React.createElement("header", undefined, match ? React.createElement("h2", undefined, React.createElement("a", {
                          href: match[0],
                          target: "_blank"
                        }, story[/* title */5])) : React.createElement("h2", undefined, story[/* title */5]));
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("li", undefined, React.createElement("article", undefined, renderHeader(/* () */0)));
    });
  return newrecord;
}

export {
  component ,
  stringEl  ,
  make      ,
  
}
/* component Not a pure module */
