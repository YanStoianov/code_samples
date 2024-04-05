import React, {useMemo, useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import {useQuery} from "@apollo/client";
import {GET_POKEMON_TYPES, GET_POKEMONS} from "../../queries/pokQueries";
import {Table} from 'antd';
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import HomePageStyles from "./HomePageStyles";
import {columns} from "./pikaTableProps";
import {
    AdditionalPokeFilters, boolPokeFilters,
    minMaxPokeFilters,
    PokemonInterface,
    PokemonTypes
} from "../../interfaces/pokeInterfaces";
import PokeStats from "../../components/PokeStats/PokeStats";
import PokeFilter from "../../components/PokeFilter/PokeFilter";
import inRange from "lodash/inRange";

const minMax = {
    min: 0,
    max: 0
}
export const initialAdditionalFilters: AdditionalPokeFilters = {
    base_happiness: {...minMax},
    capture_rate: {...minMax},
    gender_rate: {...minMax},
    hatch_counter: {...minMax},
    has_gender_differences: false,
    forms_switchable: false,
    is_legendary: false,
    is_mythical: false,
    generation: '',
    growthrate: '',
    is_baby: false,
    useAdditionalFilters: false
}

const HomePage: React.FC = () => {
    const [nameSearch, setNameSearch] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [additionalFilters, setAdditionalFilters] = useState<AdditionalPokeFilters>(initialAdditionalFilters);

    const {loading, data: pokemonData} = useQuery(GET_POKEMONS, {
        variables: {
            nameSearch: `%${nameSearch}%`
        }
    });
    const {data: pokemonTypes} = useQuery<PokemonTypes>(GET_POKEMON_TYPES);

    const tableData = useMemo(() => {
        const data = pokemonData?.pokemon_v2_pokemon || [];
        let result = data

        if (selectedTypes.length) {
            result = data.filter((pokemon: PokemonInterface) => {
                const pokemonTypes = pokemon.pokemon_v2_pokemontypes.map(({pokemon_v2_type}) => pokemon_v2_type.id);
                return pokemonTypes.some((typeId) => selectedTypes.includes(typeId))
            })
        }

        if (additionalFilters.useAdditionalFilters) {
            minMaxPokeFilters.forEach(filterName => {
                // @ts-ignore
                const filterValue = additionalFilters[filterName];

                if (filterValue.max <= 0) {
                    return null;
                }

                result = result.filter((pokemon: PokemonInterface) => {
                    // @ts-ignore
                    const pokemonValue = pokemon.pokemon_v2_pokemonspecy[filterName];
                    return inRange(pokemonValue, filterValue.min, filterValue.max + 1);
                })
            })
            boolPokeFilters.forEach(filterName => {
                // @ts-ignore
                const filterValue = additionalFilters[filterName];
                result = result.filter((pokemon: PokemonInterface) => {
                    // @ts-ignore
                    const pokemonValue = pokemon.pokemon_v2_pokemonspecy[filterName];
                    return pokemonValue === filterValue;
                })
            })
        }
        return result
    }, [pokemonData?.pokemon_v2_pokemon, selectedTypes, additionalFilters])

    return (
        <MainLayout>
            <HomePageStyles>
                <PokeStats pokemonTypes={pokemonTypes}/>
                <PokeFilter
                    setNameSearch={setNameSearch}
                    pokemonTypes={pokemonTypes}
                    setSelectedTypes={setSelectedTypes}
                    additionalFilters={additionalFilters}
                    setAdditionalFilters={setAdditionalFilters}
                />
                <LoaderWrapper loading={loading}>
                    <Table
                        className={'pika-table'}
                        columns={columns}
                        dataSource={tableData}
                        rowKey="name"
                    />
                </LoaderWrapper>
            </HomePageStyles>
        </MainLayout>
    )
};

export default HomePage;