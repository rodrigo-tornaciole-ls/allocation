import { IEditDevelopers } from "../../developers/interface/edit.developers.interface";
import { IEditProjects } from "../../projects/interface/edit.projects.interface";

interface IEditAppointments {
    weakOfYear?: string;
    year?: string;
    user?: IEditDevelopers;
    project?: IEditProjects;
    status?: string;
    availability?: string;
    otherAvailability?: string;
}

export default async function editAppointment(id: string, data: IEditAppointments) {
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