import {MinMaxValueInterface} from "./inputInterfaces";

export interface IdNameInterface {
    name: string
    id: number
}

export interface PokemonSpecy {
    __typename: string,
    base_happiness: number,
    capture_rate: number,
    forms_switchable: boolean
    gender_rate: number
    has_gender_differences: boolean
    hatch_counter: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    pokemon_v2_generation?: IdNameInterface
    pokemon_v2_growthrate?: IdNameInterface,
    generation?: string,
    growthrate?: string,

}

export interface PokemonStat {
    base_stat: number
    id: number
    pokemon_v2_stat: {
        name: string,
        __typename: string
    }
}

export interface PokemonType {
    id: number
    name: string
    __typename: string
}

export interface PokemonTypes {
    pokemon_v2_type: PokemonType[]
}

export interface PokemonTypeGroup {
    pokemon_v2_type: PokemonType,
    __typename: string
}

export interface PokemonInterface {
    id: number,
    name: string,
    pokemon_v2_pokemonspecy: PokemonSpecy,
    pokemon_v2_pokemonstats: PokemonStat[],
    pokemon_v2_pokemontypes: PokemonTypeGroup[]
}

export interface AdditionalPokeFilters {
    base_happiness: MinMaxValueInterface,
    capture_rate: MinMaxValueInterface
    gender_rate: MinMaxValueInterface
    hatch_counter: MinMaxValueInterface
    has_gender_differences: boolean
    forms_switchable: boolean
    is_legendary: boolean
    is_mythical: boolean
    generation: string,
    growthrate: string,
    is_baby: boolean,
    useAdditionalFilters: boolean
}

export const minMaxPokeFilters = [
    "base_happiness",
    "capture_rate",
    "gender_rate",
    "hatch_counter"
]

export const boolPokeFilters = [
    "has_gender_differences",
    "forms_switchable",
    "is_legendary",
    "is_mythical",
]
