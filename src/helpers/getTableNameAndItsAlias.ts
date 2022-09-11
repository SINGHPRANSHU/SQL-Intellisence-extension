export function getTableNameAndItsAlias(str: string) {
    const matchStr = str.match(/\bfrom(\s)+(\w)*(\s)+as(\s)+(\w)*\b|\bjoin(\s)+(\w)*(\s)+as(\s)+(\w)*\b/igm);
    return matchStr?.map(e => {
       const tableName =  e.match(/(?<=from|join)\s+(\w+)/igm)?.[0].trim();
       const alias =  e.match(/(?<=as)\s+(\w+)/igm)?.[0].trim();
       return {tableName, alias};
    });
}