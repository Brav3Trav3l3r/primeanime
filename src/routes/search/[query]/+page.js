export const load = async({params, fetch})=>{
    const searchRes = await fetch(`https://api-consumet-rust.vercel.app/meta/anilist/${params.query}?perPage=18`)
    const searchJson = await searchRes.json()

    return{
        results : searchJson,
        title : params.query,
        hasNextPage: searchJson.hasNextPage,
        currentPage: 1
    }
}
