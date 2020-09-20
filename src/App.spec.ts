import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import App from './App.svelte';

describe('App', () => {
    test('has header', () => {
        const name = 'Svelte Portfolio Map';
        const { getByText } = render(App, {name});
        
        expect(getByText(name)).toBeInTheDocument();
    })
});
