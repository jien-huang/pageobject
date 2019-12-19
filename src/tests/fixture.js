import {page, setData} from './page-model.js';
import {Selector, t} from 'testcafe';

fixture `My fixture`
    .page `https://devexpress.github.io/testcafe/example/`;

test('Text typing basics', async t => {
    setData([
        { 'tried-test-cafe': 'on' },
        { 'background-parallel-testing': 'on' },
        { 'continuous-integration-embedding': 'on' },
        { 'remote-testing': 'on' }
    ]);
});

test('Click check boxes and then verify their state', async t => {
    await t
        .click('input[id=remote-testing]')
        .expect(Selector('input[id=remote-testing]').checked).ok()
        .click('input[id=reusing-js-code]')
        .expect(Selector('input[id=reusing-js-code]').checked).ok()
        .click('input[id=continuous-integration-embedding]')
        .expect(Selector('input[id=continuous-integration-embedding]').checked).ok();
});