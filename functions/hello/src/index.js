import λ from 'apex';
import 'babel-polyfill';

console.log('start');
export default λ(event => {
    console.log('event');
    return {
        success: 'yes!'
    };
});
