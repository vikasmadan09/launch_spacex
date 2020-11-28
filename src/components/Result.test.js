import React from 'react';

import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { unmountComponentAtNode } from 'react-dom';

import {  BrowserRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Result from './Result';

const mockdispatch = jest.fn();
jest.mock('react-redux',()=> ({
	useDispatch: ()=> mockdispatch(),
	useSelector : jest.fn(),
}))


describe('Result section',()=>{
    let container = null
    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container)
    })
    afterEach(()=>{
        unmountComponentAtNode(container)
        container.remove()
        container=null
    })

    test('Test result page is rendered with required text',async ()=>{

        useSelector.mockImplementation(selector=>selector({
            data:{
                filterData:[{
                    mission_name: 'Falcon', 
                    flight_number:'12', 
                    launch_year:'2012',
                    links:{},
                    mission_id:[]
                }],
                loading:false,
            }
        }))

       const { findByText } = render(
            <BrowserRouter >
                    <Result /> 
                </BrowserRouter>,
            container
        )

        expect(await findByText('Falcon #12'));
    })
})
