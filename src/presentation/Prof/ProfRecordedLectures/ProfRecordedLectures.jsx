import 'output.css'
import 'index.css'
import LectureImage from "./resources/image 1.png"
import {ReactComponent as IcList} from "./resources/ic_list.svg"
import {DropDown} from "../../Common/component/DropDown";
import React, {useContext, useEffect, useState} from "react";
import {MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";
import {NahrainThemeContext} from "../../../context/NahrainThemeContext";
import {wait} from "@testing-library/user-event/dist/utils";
import {ContentBox} from "../../Common/component/MainScaffold";
import {ReactComponent as IcPlaylist} from 'presentation/Common/resources/images/ic_playlist.svg';
import {ReactComponent as IcPlay} from 'presentation/Common/resources/images/ic_play.svg';


export const ProfRecordedLectures = () => {
    const [t] = useTranslation("global");
    const {setDialogSidebar } = useContext(NahrainThemeContext);

    const [currentSidebarDialogScreen, setCurrentSidebarDialogScreen] = useState(0);

    const publishContentScreens = [
        <SelectContentType onClickContinue={() => setCurrentSidebarDialogScreen(currentSidebarDialogScreen + 1)} />,
        <PublishContent onPublish={() => setCurrentSidebarDialogScreen(currentSidebarDialogScreen + 1)} />,
        <SuccessPublish onClose={() => {
            setDialogSidebar(prev => ({ ...prev, isVisible: false }));
            wait(350).then(r => setCurrentSidebarDialogScreen(0));
        }} />
    ];

    useEffect(() => {
        setDialogSidebar(prev => ({
            ...prev,
            onDismiss: () => {
                setDialogSidebar(prev => ({ ...prev, isVisible: false }));
                wait(350).then(r => setCurrentSidebarDialogScreen(0));
            },
            child: publishContentScreens[currentSidebarDialogScreen],
            indicatorMaxScreens: publishContentScreens.length,
            indicatorCurrentScreen: currentSidebarDialogScreen
        }));
    }, [setDialogSidebar, currentSidebarDialogScreen]);

    return (
        <div className={"h-fit"}>
            <div className="flex flex-wrap gap-4 justify-between px-6 pt-6">
                <button
                    className="bg-primary text-onPrimary text-nowrap rounded-lg text-xl px-4 py-2"
                    onClick={() => {
                        setDialogSidebar(prev => ({
                            ...prev,
                            isVisible: !prev.isVisible,
                            child: publishContentScreens[currentSidebarDialogScreen],
                            indicatorMaxScreens: publishContentScreens.length,
                            indicatorCurrentScreen: currentSidebarDialogScreen
                        }));
                    }}
                >
                    {t('publish_a_lecture')}
                </button>
                <div className={"flex flex-wrap gap-2"}>
                    <DropDown
                        currentValue={t('first_and_second_course')}
                        items={[t('first_and_second_course'), t('first_course'), t('second_course')].map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    />
                    <DropDown
                        currentValue={t("theoretical_and_lab")}
                        items={[t("theoretical_and_lab"), t("theoretical"), t("lab")].map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    />
                </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-6 mt-6 pb-6 px-6 pt-6">
                <LecturesPlayListCard numberOfLectures={10} ProfName={"د. اسماء حميد"} SubjectName={"DSP course 1"} />
                <LecturesPlayListCard numberOfLectures={36} ProfName={"د. اسماء حميد"} SubjectName={"DSP course 2"} />
                <LecturesPlayListCard numberOfLectures={12} ProfName={"د. اسماء حميد"} SubjectName={"DSP Lab course 2"} />
            </div>
        </div>
    );
};

export const LecturesPlayListCard = ({ numberOfLectures, ProfName, SubjectName }) => {
    return (
        <div className="min-w-[268px] sm:w-full">
            <div className={"relative cursor-pointer"}>
                <img className="w-full object-cover rounded-lg" src={LectureImage} alt="lecture content" />
                <div className={"absolute bottom-2 start-2 bg-onBackgroundCaption light flex flex-row w-fit gap-2 px-1 rounded text-onPrimary"}>
                    <IcList />
                    <p>{numberOfLectures} Lectures</p>
                </div>
            </div>
            <h1 className="text-onBackground mt-4 text-[24px] font-medium line-clamp-1">{SubjectName}</h1>
            <p className="mt-2 text-onBackgroundCaption">{ProfName}</p>
        </div>
    );
};

const SelectContentType = ({ onClickContinue }) => {
    const [t] = useTranslation("global");

    const LectureTypes = Object.freeze({
        SINGLE_VIDEO: "SINGLE_VIDEO", PLAYLIST: "PLAYLIST",
    });

    const [selectedType, setSelectedType] = useState(null); //of type LectureTypes
    const maxWidth = "max-w-[700px]";
    return (
        <div className={`flex flex-col h-full justify-between`}>
            <div>
                <div className={`flex flex-col gap-4`}>
                    <ContentBox
                        className={`mx-auto ${maxWidth}`}
                        onClick={() => setSelectedType(LectureTypes.SINGLE_VIDEO)}
                        enabled={selectedType === LectureTypes.SINGLE_VIDEO}
                        icon={<IcPlay />}
                        title={t("single_video_title")}
                        description={t("single_video_description")}
                    />
                    <ContentBox
                        className={`mx-auto ${maxWidth}`}
                        onClick={() => setSelectedType(LectureTypes.PLAYLIST)}
                        enabled={selectedType === LectureTypes.PLAYLIST}
                        icon={<IcPlaylist />}
                        title={t("playlist_title")}
                        description={t("playlist_description")}
                    />
                </div>
                <p className={`text-onBackgroundCaption mt-4 ${maxWidth} mx-auto`}>{t("instructions")}</p>
            </div>

            <button
                onClick={() => selectedType !== null ? onClickContinue() : null}
                className={`${maxWidth} bg-primary w-full mx-auto text-white h-14 rounded-lg text-[24px] mb-6`}
            >
                {t("next_button")}
            </button>
        </div>
    );
};

const PublishContent = ({ onPublish }) => {
    const [t] = useTranslation("global");
    const maxWidth = "max-w-[700px]";

    return (
        <div className={`flex flex-col h-full justify-between ${maxWidth} mx-auto`}>
            <div>
                <div className={`flex flex-wrap gap-2`}>
                    <DropDown
                        currentValue={t("theoretical_and_lab")}
                        items={[t("theoretical_and_lab"), t("theoretical"), t("lab")].map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    />
                    <DropDown
                        currentValue={t('first_and_second_course')}
                        items={[t('first_and_second_course'), t('first_course'), t('second_course')].map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    />
                    <DropDown
                        currentValue={"Arabic"}
                        items={["Arabic", "Ethnics", "Democracy"].map((item) => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        ))}
                    />
                </div>
                <input
                    type="text"
                    placeholder="www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2 mt-4 rounded-lg bg-transparent text-white border border-softGray focus:outline-none focus:ring-2 focus:ring-primary focus:border-green-500"
                />
            </div>
            <button
                onClick={onPublish}
                className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mb-6"
            >
                Publish
            </button>
        </div>
    );
};

export const SuccessPublish = ({ onClose }) => {
    const [t] = useTranslation("global");

    return (
        <div className={`flex flex-col justify-between h-full`}>
            <div className={`flex flex-col gap-4`}>
                <h1 className={`font-semibold text-[24px] text-onBackground`}>{t("success_message")}</h1>
                <p className={`text-sm text-onBackgroundCaption`}>{t("success_description")}</p>
            </div>
            <button
                onClick={onClose}
                className="bg-primary w-full max-w-full text-white h-14 rounded-lg text-[24px] mb-6"
            >
                Close
            </button>
        </div>
    );
};