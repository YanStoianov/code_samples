import {ColumnsType} from "antd/es/table";
import React from "react";
import {PokemonSpecy, PokemonStat, PokemonTypeGroup} from "../../interfaces/pokeInterfaces";
import {titleCase} from "../../utils/stringUtils";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

export const generateStatColumns = (stats: string[]) => {
    return stats.map(stat => (
        {
            title: stat,
            dataIndex: 'pokemon_v2_pokemonstats',
            key: `pokemon_v2_pokemontypes${stat}`,
            width: '120px',
            sorter: (a: any, b: any) => {
                const statA = a.pokemon_v2_pokemonstats
                    .find((statItem: PokemonStat) => statItem.pokemon_v2_stat.name === stat)?.base_stat || 0
                const statB = b.pokemon_v2_pokemonstats
                    .find((statItem: PokemonStat) => statItem.pokemon_v2_stat.name === stat)?.base_stat || 0

                return statA - statB;
            },
            render: (statList: PokemonStat[]) => {
                const resultStat = statList.find((statItem) => statItem.pokemon_v2_stat.name === stat)
                return resultStat?.base_stat
            }
        }
    ))
}

interface DataType {
    key: React.Key;
    name: string;
    id: number;
    pokemon_v2_pokemontypes: [];
}


export const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        width: '200px',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name, {id}) => {
            return (
                <div className={'name-block'}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={name}
                    />
                    <div>{name}</div>
                </div>
            );
        }
    },
    {
        title: 'Types',
        dataIndex: 'pokemon_v2_pokemontypes',
        width: '100px',
        render: (typeList) => {
            const types = typeList.map((item: PokemonTypeGroup) => {
                return item['pokemon_v2_type']['name'];
            }).join(',');
            return <div>{types}</div>;
        }
    },
    ...generateStatColumns(['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']),
    {
        title: 'Species',
        dataIndex: 'pokemon_v2_pokemonspecy',
        width: '450px',
        render: (species: PokemonSpecy) => {
            const speciesList: PokemonSpecy = {
                ...species,
                generation: species.pokemon_v2_generation?.name,
                growthrate: species.pokemon_v2_growthrate?.name
            };
            delete speciesList.pokemon_v2_growthrate;
            delete speciesList.pokemon_v2_generation;

            return <table className={'species-table'}>
                <tbody>
                {
                    Object.keys(speciesList).filter(key => key !== '__typename').map((key) => {
                        const value = (speciesList as any)[key];
                        let specyValue: JSX.Element = <>{JSON.stringify(value)}</>

                        if (value === true) {
                            specyValue = <CheckCircleOutlined className={'approved'}/>
                        }
                        if (value === false) {
                            specyValue = <CloseCircleOutlined className={'disapproved'}/>
                        }


                        return (
                            <tr key={key}>
                                <td className={'specy-name'}><b>{titleCase(key)}</b></td>
                                <td className={'specy-value'}>{specyValue}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        }
    }
];