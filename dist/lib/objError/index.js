export default (msg, obj) => {
    let log = [];
    if (obj)
        log = Object.entries(obj).map(([key, val]) => `${key} = ${val}`);
    log.unshift(msg);
    throw new Error(log.join('\n'));
};
