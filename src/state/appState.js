import { BehaviorSubject} from 'rxjs';
let data = require('../data.json');

let appState = {
    data: data,
    selected: null
}

export const appState$ = new BehaviorSubject(appState);