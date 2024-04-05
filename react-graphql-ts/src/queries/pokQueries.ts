import {gql} from "@apollo/client";

export const GET_POKEMONS = gql`
    query GetPokemons($nameSearch: String!) {
        pokemon_v2_pokemon(where: {name: {_ilike: $nameSearch}}) {
            id, name,
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    id,
                    name
                }
            },
            pokemon_v2_pokemonstats {
                id
                pokemon_v2_stat {
                    name
                }
                base_stat
            },
            pokemon_v2_pokemonspecy {
                base_happiness
                capture_rate
                forms_switchable
                gender_rate
                has_gender_differences
                hatch_counter
                is_baby
                is_legendary
                is_mythical
                pokemon_v2_generation {
                    name
                    id
                }
                pokemon_v2_growthrate {
                    name
                    id
                }
            }
        }
    }
`;

export const GET_POKEMONS_COUNT = gql`
    query GetPokemonsCount($default: Boolean!) {
        pokemon_v2_pokemon_aggregate(where: {is_default: {_eq: $default}}) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_POKEMON_TYPES = gql`
    query GetPokemonTypes {
        pokemon_v2_type {
            id, name
        }
    }
`;
