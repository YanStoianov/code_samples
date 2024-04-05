import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import HomePage from "../HomePage";
import {MockedProvider} from "@apollo/client/testing";
import {GET_POKEMON_TYPES} from "../../../queries/pokQueries";


const mocks = [
    {
        request: {
            query: GET_POKEMON_TYPES,
        },
        result: {
            data: {
                dog: {id: "1", name: "Buck", breed: "bulldog"}
            }
        }
    }
];

jest.mock('../../../../assets/pokedex-icon.jpg')

describe("HomePageTest", () => {
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
            <MockedProvider mocks={mocks} addTypename={false}>
                <HomePage/>
            </MockedProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});