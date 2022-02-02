export function hello(code: string) {
    var res = "nothing";
    (() => {
        let res = 100;
        let f = Function("console.log(res)");
        f();
    })();
    return res;
}