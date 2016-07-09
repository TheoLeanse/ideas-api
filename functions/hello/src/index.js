import λ from 'apex.js';
import 'babel-polyfill';

import { readAll, create } from './dynamo';

export default λ(event => {
    if (event.operation === 'read') {
        return readAll();
    }

    if (event.operation === 'create') {
        return create(event.data);
    }

    return [];
});
