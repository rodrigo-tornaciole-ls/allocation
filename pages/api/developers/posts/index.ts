interface IPostDevelopers {
    name: string;
    email: string;
    availability: string;
}

export default async function postDevelopers(data: IPostDevelopers) {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    }catch(e){
        return {message: "Not possible to create Developer"}
    }
}