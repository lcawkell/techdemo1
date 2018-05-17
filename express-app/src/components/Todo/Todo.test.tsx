import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import Todo from './Todo';

import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()})

let control;

let todo = {
    id: 1,
    title: 'Test Todo',
    created_by: '1',
    created_at: 'Jan 25',
    updated_at: 'Jan 28'
}

beforeEach(()=>{
    control = mount(<Todo {...todo} onDelete={()=>{}} />);
});

describe('Todo', ()=>{

    it("Renders an li with the content 'id - title'",()=>{
        expect(control.find('li').length).toBe(1);
        expect(control.find('li').find('.text-block').text()).toBe(`${todo.title}`);
    });

});