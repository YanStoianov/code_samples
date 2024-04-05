import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import PokeStats from "../PokeStats";
import {MockedProvider} from "@apollo/client/testing";


describe("PokeStatsTest", () => {
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
            <MockedProvider mocks={[]} addTypename={false}>
                <PokeStats pokemonTypes={undefined}/>
            </MockedProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});