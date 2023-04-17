"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.continueWatching = exports.isDub = exports.currentProvider = exports.currentEp = exports.playerOn = void 0;

var _store = require("svelte/store");

var _environment = require("$app/environment");

var playerOn = (0, _store.writable)(false);
exports.playerOn = playerOn;
var currentEp = (0, _store.writable)(null);
exports.currentEp = currentEp;
var currentProvider = (0, _store.writable)(_environment.browser && JSON.parse(localStorage.getItem("currentProvider")) || {
  name: "Zoro",
  value: "zoro",
  unavailable: false
});
exports.currentProvider = currentProvider;
currentProvider.subscribe(function (val) {
  _environment.browser && (localStorage.currentProvider = JSON.stringify(val));
});
var isDub = (0, _store.writable)(_environment.browser && JSON.parse(localStorage.getItem("isDub")) || {
  value: 'false',
  name: "Sub",
  unavailable: false
});
exports.isDub = isDub;
isDub.subscribe(function (val) {
  _environment.browser && (localStorage.isDub = JSON.stringify(val));
});
var continueWatching = (0, _store.writable)(_environment.browser && JSON.parse(localStorage.getItem("continueWatching")) || []);
exports.continueWatching = continueWatching;
continueWatching.subscribe(function (val) {
  _environment.browser && (localStorage.continueWatching = JSON.stringify(val));
});