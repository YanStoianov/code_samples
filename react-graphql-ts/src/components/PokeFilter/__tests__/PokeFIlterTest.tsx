import React from 'react'
import {render} from '@testing-library/react';
import 'jest-styled-components'
import PokeFilter from "../PokeFilter";
import {MockedProvider} from "@apollo/client/testing";
import {initialAdditionalFilters} from "../../../pages/HomePage";

describe("PokeFilterTest", () => {
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
            <MockedProvider addTypename={false}>
                <PokeFilter
                    setNameSearch={() => null}
                    pokemonTypes={undefined}
                    setSelectedTypes={() => null}
                    additionalFilters={initialAdditionalFilters}
                    setAdditionalFilters={() => null}
                />
            </MockedProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    })
});