import React, {useContext} from "react";
import "output.css"
import 'index.css'
import {ReactComponent as IcArrowIcon} from 'presentation/Common/component/ic_arrow_down.svg';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {supportedLanguages} from "../../../translation/supportedLanguages";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";

export const DropDown = ({currentValue: currentValue, items, onValueChange, className}) => {
    const [newText, setNewText] = React.useState(currentValue);
    const handleChange = (event: SelectChangeEvent) => {
        setNewText(event.target.value);
        onValueChange?.(event.target.value);
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
                {items}
            </Select>
        </FormControl>
    )
}