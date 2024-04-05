import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import MainLayout from "../MainLayout";

jest.mock('../../../../assets/pokedex-icon.jpg')

describe("MainLayoutTest", () => {
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
            <MainLayout>
                <div>test</div>
            </MainLayout>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});