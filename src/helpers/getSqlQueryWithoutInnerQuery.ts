export function getSqlQueryWithoutInnerQuery(str: string) {
    const currstr = str.split('');
    const result: string[] = [];
    let appendArr = true;
    for (let index = 0; index < currstr.length; index++) {
        const element = currstr[index];
        if(element === '(') {
            appendArr = false;
        } else 
        if(element === ')') {
            appendArr = true;
        } else
        if(appendArr) {
            result.push(element);
        }
    }


    return result.join('');
}