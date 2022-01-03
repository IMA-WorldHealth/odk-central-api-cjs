ODK Central API
------

This repository contains a NodeJS wrapper for the [ODK Central API](https://odkcentral.docs.apiary.io/).  It is an
[ECMAScript module](https://nodejs.org/api/esm.html) and requires a NodeJS version that supports ESM.

#### Download
```
yarn add @ima-worldhealth/odk-central-api
```


#### Usage
By default, the module uses three environmental variables defined in the `.env.sample` file.  When using this module,
ensure those environmental variables are set using something like [`dotenv`](https://www.npmjs.com/package/dotenv).

```js
import { api, auth } from '@ima-worldhealth/odk-central-api';

(async () => {
  const projects = await api.getProjects();
	console.log(projects);  // => [{ /* projects.. */ }]
});
```

This library is MIT licensed.  It is used for IMA World Health's internal projects.  Feel free to fork, copy, and adapt
as needed.  Issues and Pull Requests are welcome!
