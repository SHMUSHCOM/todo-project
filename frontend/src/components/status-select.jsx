import React from 'react';
import styled from 'styled-components'
import Select from 'react-select'
import StatusItem from './status-item'


export const OPTIONS = [
    {value: 'NOTSTARTED', label:<StatusItem status='NOTSTARTED'/> },
    {value: 'INPROGRESS', label:<StatusItem status='INPROGRESS'/> },
    {value: 'DONE', label:<StatusItem status='DONE'/> },
]

const StatusSelect = ({value, setValue}) => {
    
    // const defaultValue = selectedStatus ?? {value: 'NOTSTARTED', label:<StatusItem status='NOTSTARTED'/> };

    const customStyles = {
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          backgroundColor: state.isSelected ? "var(--purple)" : "white",
          "&:hover": {
            backgroundColor: "var(--light-purple)",
          }
        }),
        control: (defaultStyles, state) => ({
            ...defaultStyles,
            border: state.isFocused ? "1px solid var(--purple)" : "1px solid var(--very-light-grey)",
            outline: state.isFocused ? "1px solid var(--purple)" : "1px solid var(--very-light-grey)",

            "&:hover": {
                border: "1px solid var(--purple)",
            }
        })
      };

    return (
        <Styles>
            
                <Select         
                    // defaultValue={defaultValue}
                    onChange={(event)=>{setValue(event)}}
                    value={value}
                    options={OPTIONS}
                    styles={customStyles}
                ></Select>
            
        </Styles>
    );
}

const Styles = styled.div`
    
`
export default StatusSelect;