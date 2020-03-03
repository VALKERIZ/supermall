// 防抖函数
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay);
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