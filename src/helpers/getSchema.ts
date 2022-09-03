import * as MYSQL from 'mysql2/promise';

export async function getSchema(params: {
    host: string,
	user: string,
	database: string,
	password: string
}) {
    const connection = await MYSQL.createConnection(params);
      const data: MYSQL.RowDataPacket[][] = await connection.query(`select table_name, group_concat(column_name) as column_name from information_schema.columns
      where table_schema = ${connection.escape(params.database)}
      group by table_name
      order by table_name`) as MYSQL.RowDataPacket[][];
      connection.destroy();
     return data[0].map(e => {
        return {
            tableName: e.TABLE_NAME,
            columnName: e.column_name.split(',')
        };
     });
}