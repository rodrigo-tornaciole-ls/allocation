
export default async function getProject(id:string|undefined) {
    try{
        if(id !== undefined){
            const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/projects/${id}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
                }
            });

            return await response.json();
        }else {
            return {}
        }
    }catch(e){
        return {};
    }
}