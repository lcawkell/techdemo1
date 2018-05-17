import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import TodoList from './TodoList';

import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()})

let control;
beforeEach(()=>{
    control = mount(<TodoList />);
});

describe('TodoList', ()=>{

    it("Renders a containing UL", ()=>{
        expect(control.find('ul').length).toBe(1);
    });

});