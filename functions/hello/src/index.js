import λ from 'apex.js';
import 'babel-polyfill';

import { getIdeas, createIdea } from './dynamo';

export default λ(event => {
    if (event.operation === 'read') {
        return getIdeas();
    }

    if (event.operation === 'create') {
        return createIdea(event.data);
    }

    return [];
});
