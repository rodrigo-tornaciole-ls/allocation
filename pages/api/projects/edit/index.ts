import { IEditProjects } from "../interface/edit.projects.interface";

export default async function editProject(id: string, data: IEditProjects) {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/projects/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    }catch(e){
        return {message: "Not possible to edit Project"}
    }
}