import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const playerOn = writable(false)
export const currentEp = writable(null)

export const currentProvider = writable(browser && JSON.parse(localStorage.getItem("currentProvider")) || { name: "Zoro", value: "zoro", unavailable: false })
currentProvider.subscribe((val) => { browser && (localStorage.currentProvider = JSON.stringify(val))})

export const isDub = writable(browser && JSON.parse(localStorage.getItem("isDub")) || { value: 'false', name: "Sub", unavailable: false })
isDub.subscribe((val) => { browser && (localStorage.isDub = JSON.stringify(val))})

export const continueWatching = writable(browser && JSON.parse(localStorage.getItem("continueWatching")) || [])
continueWatching.subscribe((val) => { browser && (localStorage.continueWatching = JSON.stringify(val))})
