import {redirect} from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({locals}) {
    if(!locals.session){
        throw redirect(307, '/login')
    }
}