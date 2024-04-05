import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import LoaderWrapper from "../LoaderWrapper";


describe("LoaderWrapperTest", () => {
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
            <LoaderWrapper loading={true}>
                <div>test</div>
            </LoaderWrapper>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});