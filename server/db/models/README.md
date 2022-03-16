# DB Models Import Note

When importing models into other parts of the application, use the following import line(s)

```js
const db = require('../relative/path/to/db/models/folder');

db.Role; // Access Role model
db.UserAccount; // Access UserAccount model
```

Often, you will want to assign aliases for easier access:

```js
const Role = db.Role;
const UserAccount = db.UserAccount;
```
