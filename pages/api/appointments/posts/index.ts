
interface IPostAppointments {
    weekOfYear: string;
    year: string;
    user: IPostAppointments;
    project: IPostAppointments;
    status: string;
    availability: string;
    otherAvailability?: string;
}

export default async function postAppointments(data: IPostAppointments) {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/appointments`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    }catch(e){
        return {message: "Not possible to create Appointment"}
    }
}