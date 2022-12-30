interface IEditDevelopers {
    name?: string;
    email?: string;
    availability?: string;
}

export default async function editDeveloper(id: string, data: IEditDevelopers) {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/users/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    }catch(e){
        return {message: "Not possible to edit Developer"}
    }
}