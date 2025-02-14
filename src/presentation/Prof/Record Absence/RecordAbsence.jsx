import React, {Fragment, useContext, useState} from "react";
import {ReactComponent as IcCheckMark} from "./resources/Check Circle.svg";
import {ReactComponent as IcAssign} from "./resources/Add Circle.svg";
import {ReactComponent as IcClose} from "./resources/Close Circle.svg";
import ProfileImage from "presentation/Common/resources/images/profile_picture.webp"
import {Button, Drawer, IconButton, MenuItem, Paper, Popover, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/RemoveOutlined";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {useTranslation} from "react-i18next";
import {supportedLanguages} from "../../../translation/supportedLanguages";

export const RecordAbsence = () => {
    const [t] = useTranslation("global");
    let students = [
        {
            "name": "أحمد حسن علي",
            "profile_picture": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            "name": "زينب قاسم محمد",
            "profile_picture": "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            "name": "علي كاظم جواد",
            "profile_picture": "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            "name": "فاطمة عبد الحسين",
            "profile_picture": "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            "name": "حيدر سعد مهدي",
            "profile_picture": "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            "name": "سارة حسين عبد",
            "profile_picture": "https://randomuser.me/api/portraits/women/3.jpg"
        },
        {
            "name": "مصطفى جاسم كمال",
            "profile_picture": "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            "name": "مريم كمال إبراهيم",
            "profile_picture": "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
            "name": "ياسر عبد الستار",
            "profile_picture": "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            "name": "نور الهدى كريم",
            "profile_picture": "https://randomuser.me/api/portraits/women/5.jpg"
        }
    ]
    const [filteredStudents, setFilteredStudents] = useState(students);


    return (
        <div className={`size-full bg-background p-6`}>
            <SearchBar placeholder={t("search")+"..."} onSearch={searchQuery => {
                setFilteredStudents(
                    students.filter(value =>
                        normalizeArabicText(value.name).includes(normalizeArabicText(searchQuery))
                    )
                );
            }}/>
            <div>
                {filteredStudents.map((student, index) => (
                    <Fragment key={student.name}>
                        <AssignCard
                            className={`my-2`}
                            name={student.name}
                            imageUrl={student.profile_picture}
                        />
                    </Fragment>
                ))}
            </div>


        </div>
    )
}


const SearchBar = ({className, placeholder, onSearch}) => {
    return (
        <div className={`${className} flex  items-center bg-transparent rounded-lg p-2 border border-softGray w-full`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-transparent text-onBackgroundCaption placeholder-onBackgroundCaption px-3 py-1 focus:outline-none"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export const AssignCard = ({className, name, imageUrl}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState("none");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (newStatus) => {
        setStatus(newStatus);
        handleClose();
    };
    const [t] = useTranslation("global");


    return (
        <div
            className={`${className} flex flex-row gap-2 items-center justify-between bg-card p-3 rounded-xl shadow-sm w-full`}>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                    {!imageLoaded &&
                        <img src={ProfileImage} alt="template Profile" className="w-full h-full object-cover"/>}
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className={`w-full h-full object-cover ${imageLoaded ? "block" : "hidden"}`}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <Typography variant="h6" className="font-bold text-onBackground rtl:text-right">
                    {name}
                </Typography>
            </div>

            <button
                className={`flex flex-row items-center justify-center min-w-[150px] text-xl gap-2 px-4 py-2 rounded-lg  font-medium transition ${
                    status === "none" ? "bg-black text-white" :
                        status === "attended" ? "bg-primary text-white" : "bg-error text-white"
                }`}
                onClick={handleClick}
            >
                <>{
                    status === "none" ? <AttendanceButtonContent title={t("assign")} icon={<IcAssign/>}/>
                        : status === "attended" ? <AttendanceButtonContent title={t("attend")} icon={<IcCheckMark/>}/>
                            : <AttendanceButtonContent title={t("absence")} icon={<IcClose/>}/>}
                </>
            </button>

            {/* MUI Popover Dropdown */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Paper sx={{width: "200px"}}>
                    <MenuItem onClick={() => handleSelect("attended")}>{t("attend")}</MenuItem>
                    <MenuItem onClick={() => {
                        setDrawerOpen(true)
                        handleClose()
                    }}>{t("absence")}</MenuItem>
                </Paper>
            </Popover>

            {/* Absence Drawer (Opens when Absence is Selected) */}
            <AbsenceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onConfirm={(hours) => {
                console.log(`Absence recorded for ${hours} hours`);
                setStatus("Absence")
                setDrawerOpen(false);
            }}/>
        </div>
    );
};

export const AbsenceDrawer = ({open, onClose, onConfirm}) => {
    const [hours, setHours] = useState(.5);


    const incrementHours = () => setHours((prev) => Math.max(prev + .5))
    const decrementHours = () => setHours((prev) => Math.abs(prev - .5))
    const {
        currentTheme,
        currentLanguage,
        currentFont
    } = useContext(NahrainThemeContext)
    const [t, i18] = useTranslation("global");
    const direction = supportedLanguages[currentLanguage].direction

    return (

        <Drawer
            anchor="bottom"
            open={open}
            onClose={() => {
                onClose()
                setHours(.5)
            }}
            className={`${currentTheme} ${currentFont}`}
            dir={direction}
        >
            <IcClose className="!text-onBackground absolute right-4 top-4 cursor-pointer" onClick={onClose}/>

            <div className="p-6 flex flex-col items-center gap-4 !bg-background">
                <Typography variant="h6" className="text-onBackground font-bold">
                    {t("input_absence_hours")}
                </Typography>

                <div className="flex items-center justify-center gap-4 ">
                    <IconButton onClick={decrementHours} disabled={hours <= 0.5}>
                        <CloseIcon className={`text-onBackground`}/>
                    </IconButton>

                    <div
                        className={`w-20 flex flex-row justify-between gap-2 text-center text-onBackground`}>
                        <Typography className="" variant="h5">{hours}</Typography>
                        <Typography className="" variant="h5">{t("hour_abbreviation")}</Typography>
                    </div>

                    <IconButton onClick={incrementHours} disabled={hours >= 12}>
                        <AddIcon className={`text-onBackground`}/>
                    </IconButton>
                </div>

                <Button sx={{
                    backgroundColor: "rgba(var(--primary))",
                    color: "rgba(var(--on-primary))",
                    "&:hover": {
                        filter: "brightness(0.9)",
                    },
                    padding: "10px 16px",
                    borderRadius: "8px",
                    minWidth: "150px",
                    fontSize: "1.25rem",
                    fontWeight:"bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                }} fullWidth onClick={() => onConfirm(hours)}>
                    {t("confirm")}
                </Button>
            </div>
        </Drawer>

    );
};

const AttendanceButtonContent = ({title, icon}) => {
    return (
        <>
            <p>{title}</p>
            {icon}
        </>
    )
}


const normalizeArabicText = (text) => {
    return text
        .replace(/آ|أ|إ/g, "ا") // Normalize all forms of "A" to "ا"
        .replace(/ة/g, "ه")      // Normalize "ة" to "ه" (optional)
        .replace(/ي/g, "ى");     // Normalize "ي" to "ى" (optional)
};
