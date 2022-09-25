# sql-intellisense README

This extension will help in giving intellisense for tablename and columname for mysql.
This project is in initial phase and will have lots of bugs.

## Requirements

Currently this will only work for JS ans TS projects.

works only with ES6 Template Strings:

```javascript
const query = `
    select * from tables;
`;
``` 

## Extension Settings

This extension contributes the following settings:

* `sql-intellisense.start-sql-extension`: Enable this extension.
* reloading vscode window will disable the extension.

### 0.0.5

Support For Distinct Keyword
Table alias support

---

## Integration with database

Integration with real database through VSCode options or simply Enter credentaials when running sql-intellisense.start-sql-extension in command palette:

```json
{
    "sql-intellisense.dbHost": "localhost",
    "sql-intellisense.dbPort": "3306",
    "sql-intellisense.dbUser": "root",
    "sql-intellisense.dbPassword": "sql",
    "sql-intellisense.dbName": "sql"
}
```

**Enjoy!**
