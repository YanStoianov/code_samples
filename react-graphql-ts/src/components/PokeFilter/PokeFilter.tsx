import {Input, Select} from "antd";
import React, {useMemo} from "react";
import PokeFilterStyles from "./PokeFilterStyles";
import {AdditionalPokeFilters, boolPokeFilters, minMaxPokeFilters, PokemonTypes} from "../../interfaces/pokeInterfaces";
import {DownSquareOutlined, UpSquareOutlined} from "@ant-design/icons";
import MinMaxInput from "../customInputs/MinMaxInput/MinMaxInput";
import {titleCase} from "../../utils/stringUtils";
import {initialAdditionalFilters} from "../../pages/HomePage";
import SwitchInput from "../customInputs/SwitchInput/SwitchInput";

const {Option} = Select;

interface PokeFilterProps {
    setNameSearch: (e: any) => void
    pokemonTypes: PokemonTypes | undefined
    setSelectedTypes: (value: number[]) => void
    setAdditionalFilters: (filters: AdditionalPokeFilters) => void
    additionalFilters: AdditionalPokeFilters
}

const PokeFilter = (props: PokeFilterProps) => {
    const {setNameSearch, pokemonTypes, setSelectedTypes, setAdditionalFilters, additionalFilters} = props;

    const typesSelect = useMemo(() => {
        return (
            <Select placeholder={'Types'} mode="multiple"
                    className={'types-select'} onChange={setSelectedTypes}>
                {
                    pokemonTypes?.pokemon_v2_type?.map(({id, name}) => <Option value={id} key={id}>{name}</Option>)
                }
            </Select>
        )
    }, [pokemonTypes, setSelectedTypes])

    const clearAdditionalFilters = () => {
        setAdditionalFilters({
            ...initialAdditionalFilters,
            useAdditionalFilters: false
        })
    }

    const setFilters = ({value, name}: any) => {
        setAdditionalFilters({
            ...additionalFilters,
            [name]: value
        })
    }

    const generateMinMaxFilters = (filterKeys: string[]) => {
        return filterKeys.map((key) => (
            <MinMaxInput
                key={key}
                title={titleCase(key)}
                setValue={(value) => setFilters({value, name: key})}
                // @ts-ignore
                value={additionalFilters[key]}
            />
        ))
    }

    const generateBoolFilters = (filterKeys: string[]) => {
        return filterKeys.map((key) => (
            <SwitchInput
                key={key}
                title={titleCase(key)}
                setValue={(value) => setFilters({value, name: key})}
                // @ts-ignore
                value={additionalFilters[key]}
            />
        ))
    }

    const {useAdditionalFilters} = additionalFilters;
    return (
        <PokeFilterStyles>
            <div className={'filters-block'}>
                <Input
                    placeholder="Search"
                    className={'search'}
                    onChange={e => setNameSearch(e.target.value)}
                />
                {typesSelect}
            </div>
            <div className={'additional-cursor'}>
                <div className={'cursor-title'}>Additional Filters</div>
                {
                    useAdditionalFilters ?
                        <UpSquareOutlined onClick={clearAdditionalFilters}/> :
                        <DownSquareOutlined onClick={() => setAdditionalFilters({
                            ...additionalFilters,
                            useAdditionalFilters: true
                        })}/>
                }
            </div>
            {useAdditionalFilters &&
                <div className={'additional-filters-block flex-row'}>
                    {generateMinMaxFilters(minMaxPokeFilters)}
                    <div className={'newRow flex-row'}>
                        {generateBoolFilters(boolPokeFilters)}
                    </div>
                </div>
            }
        </PokeFilterStyles>
    )
}

export default PokeFilter