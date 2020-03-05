// 防抖函数 非立即执行
export function debounce(func, delay) {
    let timer = null
    return function() {
        let context = this
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(context, args)
        }, delay);
    }
}

//节流函数 时间段内结束时触发
// export function throttle(func, delay) {
//     let timer = null
//     return function() {
//         let context = this
//         let args = arguments
//         if (!timer) {
//             timer = setTimeout(() => {
//                 timer = null
//                 func.apply(context, args)
//             }, delay);
//         }
//     }
// }

//节流函数 时间段内开始时触发
export function throttle(func, delay) {
    let previous = 0
    return function() {
        let context = this
        let args = arguments
        let now = Date().now
        if (now - previous >= delay) {
            func.apply(context, args)
            previous = now
        }
    }
}

// 格式化Date对象
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        // 截取并替换， RegExp为匹配出的结果（全局对象）
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            //  RegExp.$1 = 'MM' 之类
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

// 一位数补0 
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};