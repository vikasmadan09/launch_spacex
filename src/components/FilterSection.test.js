import React from 'react';

import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { unmountComponentAtNode } from 'react-dom';

import {  BrowserRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import FilterSection from './FilterSection';


jest.mock('react-redux',()=> ({
	useDispatch: jest.fn(() => {}),
	useSelector : jest.fn(),
}))


describe('Filter section',()=>{
    let container = null
    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container)
    })
    afterEach(()=>{
        unmountComponentAtNode(container)
        container.remove()
        container=null
    });


    test('onClick on Filter button',async ()=>{
        const mockedDispatch = jest.fn();
        useDispatch.mockReturnValue(mockedDispatch);
        useSelector.mockImplementation(selector=> selector({
            data:{
                key:1
            }
        })
       );

       const { findByText } = render(
            <BrowserRouter >
                    <FilterSection /> 
                </BrowserRouter>,
            container
        )

        const node = await findByText('2006');
        fireEvent.click(node);
        expect(mockedDispatch).toHaveBeenCalledWith({"payload": 2, "type": "SET_KEY"});
    })
})
