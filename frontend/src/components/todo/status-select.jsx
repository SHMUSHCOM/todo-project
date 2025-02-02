import React from 'react';
import Select from 'react-select'
import StatusItem from './status-item'


export const OPTIONS = [
    {value: 'NOTSTARTED', label:<StatusItem status='NOTSTARTED'/> },
    {value: 'INPROGRESS', label:<StatusItem status='INPROGRESS'/> },
    {value: 'DONE', label:<StatusItem status='DONE'/> },
]

const StatusSelect = ({field}) => {

    const customTheme = (theme) => ({
        ...theme,
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
            
            placeholder={'Select status'}
            noOptionsMessage={() =>  'No results'}
        
            isClearable
            isSearchable
        ></Select> 
    );
}

export default StatusSelect;
