import { fail, redirect } from '@sveltejs/kit';
import {AuthApiError} from "@supabase/supabase-js"


/** @type {import('./$types').Actions} */
export const actions = {
    login: async({locals, request})=>{
        const body = Object.fromEntries(await request.formData())
        const { data , error:err} = await locals.sb.auth.signInWithPassword({
            email: body.email ,
            password: body.password
        })
    
        if(err){
            if(err instanceof AuthApiError && err.status === 400){
                return fail(400,{
                    error: 'Invalid Credentials'
                })
            }
            return fail(500,{
                massage:'Server error'
            })
        }

        throw redirect(303, '/')
    }
    
};