import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ListItem from './ListItem';

import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()})

let control:ShallowWrapper<undefined, undefined>;
beforeEach(()=>{
    control = shallow(<ListItem />);
});

describe('ListItem', ()=>{

    it("Renders a li", ()=>{
        expect(control.find('li').length).toBe(1);
    });

});