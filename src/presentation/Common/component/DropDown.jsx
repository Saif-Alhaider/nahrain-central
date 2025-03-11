import React from "react";
import "output.css"
import 'index.css'
import {ReactComponent as IcArrowIcon} from 'presentation/Common/resources/images/ic_arrow_down.svg';
import {FormControl, Select, SelectChangeEvent} from "@mui/material";

export const DropDown = ({
                             currentValue,
                             items,
                             onValueChange,
                             placeholder,
                             className,
                             icon
                         }) => {
    const [newText, setNewText] = React.useState(currentValue);

    const handleChange = (event: SelectChangeEvent) => {
        setNewText(event.target.value);
        onValueChange?.(event.target.value);
    };

    return (
        <FormControl className={className}>
            <Select
                IconComponent={() => (
                    <IcArrowIcon className={"text-onBackground pointer-events-none"} />
                )}
                className="px-4 py-2 !text-onBackground border-strokeGray focus:border-red-600"
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
                displayEmpty
                renderValue={(value: unknown) => {
                    return (
                        <div className="flex items-center">
                            {icon && <span className="mr-2">{icon}</span>} {/* Render the icon if provided */}
                            {!value ? (
                                <p className={`text-onBackgroundCaption text-[16px]`}>{placeholder}</p>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    );
                }}
                value={newText}
                onChange={handleChange}
                variant={'outlined'}
            >
                {items}
            </Select>
        </FormControl>
    );
};