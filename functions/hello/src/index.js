import λ from 'apex';
import 'babel-polyfill';

import { readAll, create } from './dynamo';

export default event => {
    if (event.operation === 'read') {
        console.log(readAll());
        return readAll();
    }

    if (event.operation === 'create') {
        const created = create(event.data);
        console.log(created);
        return created;
    }

    return [];
};
