export function removeSQLFunction(str: string, sqlFuncrion: string = 'distinct') {
    const regex = new RegExp(`^${sqlFuncrion}[\n ]*[(][\n ]*[)][\n ]+|[\s]+distinct[\n ]*[(][\n ]*[)][\n ]+`, 'igm');
    return str.replace(regex, m => m.split('').map(e => e !== '\n'? ' ': '\n' ).join(''));
}