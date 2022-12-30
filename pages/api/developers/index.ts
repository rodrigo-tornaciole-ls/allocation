export default async function getDevelopers() {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/users`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            }
        });

        return await response.json();
    }catch(e){
        return [];
    }
}