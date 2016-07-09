import λ from 'apex';
import 'babel-polyfill';

import { readAll, create } from './dynamo';

export default (event, context, callback) => {
    if (event.operation === 'read') {
        callback(null, readAll());
    }

    if (event.operation === 'create') {
        callback(null, create(event.data));
    }

    return [];
};
