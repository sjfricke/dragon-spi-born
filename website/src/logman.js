var myconsole = {
    log: console.log,
    warn: console.warn,
    error: console.error
}
console.log = function () { };
console.warn = function () { };
console.error = function () { };

function log(name, msg) {
    logType('log', name, msg);
}

function warn(name, msg) {
    logType('warn', name, msg);
}

function err(name, msg) {
    logType('error', name, msg);
}

function logType(type, name, msg) {
    if (type !== 'log'
        && type !== 'warn'
        && type !== 'error') return;
    if (myconsole[type]
        && typeof name === 'string'
        && typeof msg === 'string') {
        (myconsole[type])(
            ('%cClass ' + name + ':%c ' + msg), 'color: #a6cd94', 'color: grey'
            );
    }
}
