import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import MinMaxInput from "../MinMaxInput";


describe("MinMaxInputTest", () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            }))
        });
    });

    test('snapshot', () => {
        const {asFragment} = render(
            <MinMaxInput setValue={() => {
            }} title={'test'} value={{min: 0, max: 0}}/>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});