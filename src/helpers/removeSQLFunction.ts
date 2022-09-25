export function removeSQLFunction(str: string, sqlFunction: string[] = ['distinct', 'group_concat']) {
    const regex = new RegExp(`\\b(${sqlFunction.join('|')})\\s*[(]\\s*[)]\\B`, 'igm');
    return str.replace(regex, m => m.split('').map(e => e !== '\n'? ' ': '\n' ).join(''));
}