import React from 'react';
import Select from 'react-select'
import { useSelector } from 'react-redux';
import {useEffect} from 'react'


// export const OPTIONS = [
//     {value: '63f762b30f6f3235dbdeca1e', label: "Adam Walker" },
//     {value: '63f762b30f6f3235dbdeca1f', label:"John Black" },
//     {value: '63f762b30f6f3235dbdeca20', label:"Max Blue" },
// ]

const UserSelect = ({field}) => {


    const OPTIONS = useSelector(state => state.users)?.map( user => ({label: `${user.firstName} ${user.lastName}`, value: user._id}))

    const customTheme = (theme) => ({
        ...theme,
        fontWeight: 100,
        colors: {
            ...theme.colors,
            primary25: 'var(--light-purple)',
            primary: 'var(--purple)'
        }
    })

    const customStyles = {
        container: (defaultStyles) => ({
            ...defaultStyles,
            fontWeight: 300,
        })
    }


    return (
        <Select         
            {...field}
            options={OPTIONS}
            theme={customTheme}
            styles={customStyles}
            
            placeholder={'Select user'}
            noOptionsMessage={() =>  'No results'}
        
            isClearable
            isSearchable
        ></Select> 
    );
}

export default UserSelect;
