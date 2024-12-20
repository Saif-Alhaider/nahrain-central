import {AppBar, Button, Slide, Toolbar, useScrollTrigger} from "@mui/material";
import 'output.css'
import 'index.css'
import {ReactComponent as IcHamburgerMenu} from "./ic_hamburger_menu.svg";

export const Appbar = ({title, onClick, className}) => {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}
               className={`${className} !bg-background !text-onBackground !transition !duration-200 !ease-linear`}>
            <AppBar elevation={0}>
                <Toolbar variant='dense' disableGutters className="h-14 px-4">
                    <Button onClick={onClick} className="p-0 inline-flex items-center justify-center">
                        <IcHamburgerMenu className="text-onBackground p-2 bg-card box-content rounded-lg transition duration-200 ease-linear"/>
                    </Button>
                    <p className="text-2xl ms-1">{title}</p>
                </Toolbar>
            </AppBar>
        </Slide>
    )
}
