
function log(name, msg) {
    if (console.log
        && typeof name === 'string'
        && typeof msg === 'string') {
        console.log(
            'Class ' + name + ': ' + msg
            );
    }
}
