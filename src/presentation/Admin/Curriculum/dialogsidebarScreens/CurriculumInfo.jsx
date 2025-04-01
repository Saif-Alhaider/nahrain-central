import {NahrainInput} from "../../../Common/component/NahrainInput";
import {CircularProgress} from "@mui/material";
import {NahrainButton} from "../../../Common/component/NahrainButton";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {ReactComponent as IcTextSquare} from "presentation/Common/resources/images/ic_text_square.svg";
import {ReactComponent as IcAdd} from "presentation/Common/resources/images/ic_add_circle.svg";
import {ReactComponent as IcBook} from "presentation/Common/resources/images/ic_book.svg";
import {AnimatePresence, motion} from "framer-motion";
import {ContentBox} from "../../../Common/component/MainScaffold";


export const CurriculumInfo = ({onClickNext}) => {

    const [t] = useTranslation("global");
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        material_name: "",
        sources: [],
        course: null,
        stage: null
    });

    const CourseNumber = Object.freeze({
        FIRST: "FIRST", SECOND: "SECOND"
    });

    const Stage = Object.freeze({
        FRESHMAN: "FRESHMAN", SOPHOMORE: "SOPHOMORE", JUNIOR: "JUNIOR", SENIOR: "SENIOR"
    });

    const handleChange = (field, value) => {
        setUserData((prev) => ({...prev, [field]: value}));
    };

    const addSource = () => {
        setUserData((prev) => ({
            ...prev,
            sources: [...prev.sources, ""], // Append empty source
        }));
    };

    const removeSource = (index) => {
        setUserData((prev) => ({
            ...prev,
            sources: prev.sources.filter((_, i) => i !== index), // Remove by index
        }));
    };

    const handleSourceChange = (index, value) => {
        setUserData((prev) => {
            const updatedSources = [...prev.sources];
            updatedSources[index] = value;
            return {...prev, sources: updatedSources};
        });
    };

    const itemVariants = {
        hidden: {opacity: 0, y: -10},
        visible: {opacity: 1, y: 0, transition: {duration: 0.2}},
        exit: {opacity: 0, y: -10, transition: {duration: 0.2}},
    };

    return (
        <div className={`max-w-[700px] h-full mx-auto relative`}>
            <h1 className={`text-xl text-onBackground font-semibold`}>
                {t("general_material_info")} <span className={`text-error`}>*</span>
            </h1>
            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>{t("material_name")}</h1>
                <NahrainInput
                    type={`text`}
                    className={`mt-2`}
                    placeholder={"الكترون 2"}
                    icon={<IcTextSquare/>}
                    onChange={(e) => handleChange("material_name", e.target.value)}
                />
            </div>

            <div className={`mt-6`}>
                <h1 className={`font-medium text-onBackground text-[16px]`}>المصادر</h1>
                <AnimatePresence>
                    {userData.sources.map((source, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`flex flex-row items-center gap-2 mt-2`}
                        >
                            <NahrainInput
                                type={`text`}
                                className={`flex-1`}
                                placeholder={"مصدر"}
                                icon={<IcBook/>}
                                value={source}
                                onChange={(e) => handleSourceChange(index, e.target.value)}
                            />
                            <button
                                className={`size-9 text-xl font-semibold bg-error text-onPrimary rounded-lg`}
                                onClick={() => removeSource(index)}
                            >
                                -
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button
                    className={`mt-2 bg-background text-onBackground p-2 rounded flex flex-row gap-2 font-semibold`}
                    onClick={addSource}
                >
                    <span>اضافة مصدر</span>
                    <IcAdd/>
                </button>
            </div>

            <h1 className={`text-xl mt-6 text-onBackground font-semibold`}>
                معلومات اكاديمية <span className={`text-error`}>*</span>
            </h1>

            <h1 className={`font-medium text-onBackground text-[16px] mt-6 mb-2`}>اختيار الكورس</h1>

            <div className={`flex  gap-4 `}>
                <ContentBox
                    onClick={() => handleChange("course", CourseNumber.FIRST)}
                    enabled={userData.course === CourseNumber.FIRST}
                    title={'الكورس الاول'}
                />

                <ContentBox
                    onClick={() => handleChange("course", CourseNumber.SECOND)}
                    enabled={userData.course === CourseNumber.SECOND}
                    title={"الكورس الثاني"}
                />
            </div>

            <h1 className={`font-medium text-onBackground text-[16px] mt-6 mb-2`}>المرحلة الدراسية</h1>
            <div className={`flex flex-col  gap-4 `}>
                <ContentBox
                    onClick={() => handleChange("stage", Stage.FRESHMAN)}
                    enabled={userData.stage === Stage.FRESHMAN}
                    title={t('freshman')}
                />

                <ContentBox
                    onClick={() => handleChange("stage", Stage.SOPHOMORE)}
                    enabled={userData.stage === Stage.SOPHOMORE}
                    title={t('sophomore')}
                />

                <ContentBox
                    onClick={() => handleChange("stage", Stage.JUNIOR)}
                    enabled={userData.stage === Stage.JUNIOR}
                    title={t('junior')}
                />

                <ContentBox
                    onClick={() => handleChange("stage", Stage.SENIOR)}
                    enabled={userData.stage === Stage.SENIOR}
                    title={t('senior')}
                />

            </div>

            <div className={`sticky bg-card w-full bottom-0 py-4 mt-2`}>
                <NahrainButton onClick={() => {
                    onClickNext()
                }} className={`w-full`}>
                    {isLoading ? (
                        <CircularProgress sx={{color: "rgba(var(--on-primary))"}}/>
                    ) : (
                        <p className="text-2xl font-semibold">{t("continue")}</p>
                    )}
                </NahrainButton>
            </div>
        </div>
    );
}
