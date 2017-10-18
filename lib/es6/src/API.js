'use strict';

import * as Curry       from "bs-platform/lib/es6/curry.js";
import * as Pervasives  from "bs-platform/lib/es6/pervasives.js";
import * as Json_decode from "bs-json/lib/es6/src/Json_decode.js";

var apiBaseUrl = "https://serverless-api.hackernewsmobile.com/";

function topStoriesUrl(page) {
  return apiBaseUrl + ("topstories-25-" + (Pervasives.string_of_int(page) + ".json"));
}

function parseStory(json) {
  return /* record */[
          /* by */Json_decode.field("by", Json_decode.string, json),
          /* descendants */Json_decode.field("descendants", Json_decode.$$int, json),
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* score */Json_decode.field("score", Json_decode.$$int, json),
          /* time */Json_decode.field("time", Json_decode.$$int, json),
          /* title */Json_decode.field("title", Json_decode.string, json),
          /* url */Json_decode.optional((function (param) {
                  return Json_decode.field("url", Json_decode.string, param);
                }), json)
        ];
}

function parseStories(json) {
  return Json_decode.array(parseStory, json);
}

function fetchTopStories(page, param) {
  var callback = param[1];
  var errorCallback = param[0];
  return fetch(topStoriesUrl(page)).then((function (prim) {
                    return prim.json();
                  })).then((function (json) {
                  var stories = Json_decode.array(parseStory, json);
                  Curry._1(callback, /* tuple */[
                        page,
                        stories
                      ]);
                  return Promise.resolve(/* None */0);
                })).catch((function () {
                Curry._1(errorCallback, /* () */0);
                return Promise.resolve(/* None */0);
              }));
}

export {
  apiBaseUrl      ,
  topStoriesUrl   ,
  parseStory      ,
  parseStories    ,
  fetchTopStories ,
  
}
/* No side effect */
