export default async function getAppointments() {
    try{
        const response = await fetch(`${ process.env.NEXT_PUBLIC_API_HOST }v1/appointments`, {
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