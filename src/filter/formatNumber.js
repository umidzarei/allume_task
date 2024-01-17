
// export const formatNumber = (price, type) => {

//     if (type === "percentage") {
//         return price.toFixed(2);
//     }
//     if (price <= 999) {
//         return price.toFixed(3);
//     } else if (price < 1e3) {
//         return price.toFixed(2);
//         // return Math.sign(price) * ((Math.abs(price) / 1000).toFixed(2)) + " K"
//     } else if (price < 1e8) {
//         return Math.sign(price) * ((Math.abs(price) / 1e6).toFixed(2)) + " M";
//     }else if (price < 1e12) {
//         return Math.sign(price) * ((Math.abs(price) / 1e9).toFixed(2)) + " B";
//     } else {
//         return price.toFixed(3);
//     }

//     // if (price >= 1e9) {
//     //     return Math.sign(price) * ((Math.abs(price) / 1e9).toFixed(2)) + " B";
//     // } else if (price >= 1e7) {
//     //     return Math.sign(price) * ((Math.abs(price) / 1e7).toFixed(2)) + " M";
//     // } else if (price >= 1e3) {
//     //     return Math.sign(price) * ((Math.abs(price) / 1000).toFixed(2)) + " K"
//     // } else {
//     //     return price.toFixed(2);
//     // }
// }



export const formatNumber = (price, type) => {
    if (price === 0) {
        return "0";
    }
    if (price < 0.000009) {
        return (price * 1e6).toFixed(8) + "u"
    }

    if (price < 0.001) {
        return (price * 1e3).toFixed(5) + "m"
    }



    if (type === "percentage") {
        return price.toFixed(2);
    }
    if (price < 1) {
        return price.toFixed(4)
    }

    if (price <= 999) {
        return price;
    } else if (price < 1e6) {
        return (price / 1e3).toFixed(3) + "K";
        // return Math.sign(price) * ((Math.abs(price) / 1000).toFixed(2)) + " K" 
    } else if (price < 1e9) {
        return (price / 1e6).toFixed(3) + "M";

        // return Math.sign(price) * ((Math.abs(price) / 1e6).toFixed(2)) + " M"; 
    } else if (price < 1e12) {
        return Math.sign(price) * ((Math.abs(price) / 1e9).toFixed(2)) + " B";
    } else {
        return price.toFixed(2);
    }
}