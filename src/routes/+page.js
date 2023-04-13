export const load = async({fetch, setHeaders})=>{
    const data =  fetch('https://api-consumet-rust.vercel.app/meta/anilist/trending')
    const data2 =  fetch('https://api-consumet-rust.vercel.app/meta/anilist/recent-episodes')
    const data3 =  fetch('https://api-consumet-rust.vercel.app/meta/anilist/popular?perPage=12')

    const [trending, recentEps, popularAnime ] = await Promise.all([data, data2, data3])

    setHeaders({"cache-control": "max-age=3600"})

    // data.headers.get("cache-control")

    return{
        trend: trending.ok ?  trending.json() : undefined,
        recent:  recentEps.ok ? recentEps.json() : undefined,
        popular:  popularAnime.ok ?  popularAnime.json() : undefined,
        title: 'Home'
    }
}