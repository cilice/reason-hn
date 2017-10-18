'use strict';

import * as $$Array     from "bs-platform/lib/es6/array.js";
import * as Block       from "bs-platform/lib/es6/block.js";
import * as Curry       from "bs-platform/lib/es6/curry.js";
import * as React       from "react";
import * as API$Fido    from "./API.js";
import * as Pervasives  from "bs-platform/lib/es6/pervasives.js";
import * as ReasonReact from "reason-react/lib/es6/src/reasonReact.js";

var name = "News";

var component = ReasonReact.reducerComponent(name);

function loadNextPage(param) {
  var reduce = param[/* reduce */3];
  var errorCallback = Curry._1(reduce, (function () {
          return /* LoadingFailed */1;
        }));
  var callback = Curry._1(reduce, (function (payload) {
          return /* Loaded */[payload];
        }));
  API$Fido.fetchTopStories(param[/* state */4][/* page */1], /* tuple */[
        errorCallback,
        callback
      ]);
  return Curry._2(reduce, (function () {
                return /* Loading */0;
              }), /* () */0);
}

function make() {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      loadNextPage(self);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      var match = self[/* state */4];
      if (match[/* loading */2] !== 0) {
        return React.createElement("div", undefined, "Loading");
      } else if (match[/* stories */0].length !== 0) {
        var titles = $$Array.mapi((function (index, story) {
                return React.createElement("div", {
                            key: Pervasives.string_of_int(index)
                          }, story[/* title */5]);
              }), self[/* state */4][/* stories */0]);
        return React.createElement("div", undefined, titles);
      } else {
        return React.createElement("div", undefined, "Failed");
      }
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* stories : array */[],
              /* page */0,
              /* loading : false */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        if (action !== 0) {
          return /* Update */Block.__(0, [/* record */[
                      /* stories */state[/* stories */0],
                      /* page */state[/* page */1],
                      /* loading : false */0
                    ]]);
        } else {
          return /* Update */Block.__(0, [/* record */[
                      /* stories */state[/* stories */0],
                      /* page */state[/* page */1],
                      /* loading : true */1
                    ]]);
        }
      } else {
        var match = action[0];
        var stories = $$Array.append(state[/* stories */0], match[1]);
        return /* Update */Block.__(0, [/* record */[
                    /* stories */stories,
                    /* page */match[0] + 1 | 0,
                    /* loading : false */0
                  ]]);
      }
    });
  return newrecord;
}

export {
  name         ,
  component    ,
  loadNextPage ,
  make         ,
  
}
/* component Not a pure module */