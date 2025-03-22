import {AdminCard} from "./AdminCard";
import {ReactComponent as IcBook} from 'presentation/Common/resources/images/ic_book.svg'
import {ReactComponent as IcAddCircle} from 'presentation/Common/resources/images/ic_add_circle.svg'
import {useTranslation} from "react-i18next";

export const Curriculum = () => {
    const [t, i18] = useTranslation("global");

    return (
        <div className={`bg-background p-6 h-fit `}>
            <AdminCard TitleIcon={IcBook} title={t("curriculum")} buttonTitle={t("create_new_syllable")}
                       ButtonIcon={IcAddCircle} description={t("curriculum_description")}/>

        </div>
    )
}
