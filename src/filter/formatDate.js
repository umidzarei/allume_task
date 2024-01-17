
export const formatDate = (DateTime, type = "datetime") => {

    let date = new Date(DateTime);
    if (type === 'datetime') {
        let amPm = date.getHours() >= 12 ? " PM" : " AM";
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes() + amPm;
    } else if(type === 'date') {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

}