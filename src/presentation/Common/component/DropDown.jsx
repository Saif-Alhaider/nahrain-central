import React from "react";
import "output.css"
import 'index.css'
import {ReactComponent as IcArrowIcon} from 'presentation/Common/component/ic_arrow_down.svg';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";

export const DropDown = ({text, items,className}) => {
    const [newText, setNewText] = React.useState(text);
    const handleChange = (event: SelectChangeEvent) => {
        setNewText(event.target.value);
    };
    return (
        <FormControl className={className}>
            <Select
                IconComponent={() => (
                    <IcArrowIcon className={"text-onBackground pointer-events-none"}/>
                )}
                className="px-4 py-2  !text-onBackground border-strokeGray  focus:border-red-600"
                sx={{
                    '& .MuiSelect-select': {
                        paddingRight: 0,
                        paddingLeft: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'inherit',
                    },
                    color: 'inherit',
                    borderRadius: '8px'
                }}
                value={newText}
                onChange={handleChange}
                displayEmpty
                variant={'outlined'}>
                <MenuItem value={text}>
                    {text}
                </MenuItem>
                {items.map((item) => {
                    return (<MenuItem value={item}>{item}</MenuItem>)
                })}
            </Select>
        </FormControl>
    )
}