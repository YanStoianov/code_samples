import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import SwitchInput from "../SwitchInput";


describe("SwitchInputTest", () => {
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
            <SwitchInput title={'test'} value={true} setValue={() => {
            }}/>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});