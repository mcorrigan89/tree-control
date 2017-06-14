import { appState$ } from './appState';
import { dispatch$ } from './dispatch';

export const SELECT_ITEM = 'SELECT_ITEM';

dispatch$.subscribe(action => {
    switch(action.type) {
        case SELECT_ITEM:
            appState$.next(Object.assign({}, appState$.value, {selected: action.payload}));
            break;
    }
});