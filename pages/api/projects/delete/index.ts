export default async function deleteProjects(id: string) {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/projects/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            }
        })

        return await response.json();
    }catch(e){
        return {message: "Not possible to delete Project"}
    }
}