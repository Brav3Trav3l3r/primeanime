import {writable, derived} from "svelte/store"
import {fail} from '@sveltejs/kit'
import {supabaseClient} from '$lib/supabase.js'
import { browser } from "$app/environment"


export const getProfile = async(n) =>{
    if(!n){
        return profile.set(null)
    }
    let { data, error:err } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', n.user.id)
    .single();
    
    if(err){
        return fail(500,{
            massage:'Server error'
        })
    }
    
    return profile.set(data) 
}

export const profile = writable(browser && JSON.parse(localStorage.getItem("profile")) || null)
profile.subscribe((val) => { browser && (localStorage.profile = JSON.stringify(val))})

export const lib = derived(profile , ($profile) => {
        if($profile){
            const arr = $profile.library?.map(e=>e.id)
            return arr
        }
    }
)

export const addToLib = async(n, anime ) =>{

    let arr
    if(n.library === null){
         arr = []
    }else{
         arr = (n.library)
    }
    
    let newArr =  [{id:anime.id, image:anime.image, rating:anime.rating, totalEpisodes:anime.totalEpisodes, title:(anime.title?.english ?? anime.title.romaji)}, ...arr]

    const updates = {
        id:n.id,
        username:n.username,
        email: n.email,
        cover_url: n.cover_url,
        avatar_url: n.avatar_url,
        library: newArr
    }  
    
    profile.set(updates)

    let {error} = await supabaseClient
        .from('users')
        .update(updates)
        .eq("id", n.id)

} 

export const deleteFromLib = async(n, anime) =>{
    const newArr = await n.library.filter((m)=> m?.id != anime.id )

    const updates = {
        id:n.id,
        username:n.username,
        email: n.email,
        cover_url: n.cover_url,
        avatar_url: n.avatar_url,
        library: newArr
    } 
    
    profile.set(updates)
    
    let {error} = await supabaseClient
    .from('users')
    .update(updates)
    .eq("id", n.id)
}


 