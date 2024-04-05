import React, {useMemo} from "react";
import PokeStatsStyles from "./PokeStatsStyles";
import {useQuery} from "@apollo/client";
import {GET_POKEMONS_COUNT} from "../../queries/pokQueries";
import {PokemonTypes} from "../../interfaces/pokeInterfaces";

interface PokeStatsProps {
    pokemonTypes: PokemonTypes | undefined
}

const PokeStats = (props: PokeStatsProps) => {
    const {pokemonTypes} = props;
    const {data: uniquePokemonsData} = useQuery(GET_POKEMONS_COUNT, {
        variables: {
            default: true
        }
    });
    const {data: variationsPokemonData} = useQuery(GET_POKEMONS_COUNT, {
        variables: {
            default: false
        }
    });

    const stats = useMemo(() => {
        const uniquePokemonCount = uniquePokemonsData?.pokemon_v2_pokemon_aggregate?.aggregate?.count || 0;
        const duplicationPokemonCount = variationsPokemonData?.pokemon_v2_pokemon_aggregate?.aggregate?.count || 0;
        const typesCount = pokemonTypes?.pokemon_v2_type?.length || 0;

        return {
            uniquePokemonCount,
            duplicationPokemonCount,
            typesCount
        }
    }, [uniquePokemonsData, pokemonTypes, variationsPokemonData])


    return (
        <PokeStatsStyles>
            <div className={'stats-block'}>
                <div>Unique pokemons count: {stats.uniquePokemonCount}</div>
                <div>Pokemon duplications/variations count: {stats.duplicationPokemonCount}</div>
                <div>Total pokemons count: {stats.uniquePokemonCount + stats.duplicationPokemonCount}</div>
                <div>Types count: {stats.typesCount}</div>
            </div>
        </PokeStatsStyles>
    );
};

export default PokeStats;