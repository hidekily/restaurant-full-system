export function dataFormater(data: string){
    return new Date(data).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit"
    })
}