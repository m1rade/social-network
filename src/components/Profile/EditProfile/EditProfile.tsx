import React, { useEffect } from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { ProfileData } from "../../../api/social-networkAPI";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchProfile, updateProfileData } from "../../../redux/profile_reducer";
import { selectIsFetching, selectUserInfo } from "../../../redux/selectors/selectors";
import YellowButton from "../../common/Buttons/YellowButton";
import Preloader from "../../common/Preloader";
import s from "./EditProfile.module.css";

export const EditProfile: React.FC = () => {
    const userInfo = useAppSelector(selectUserInfo);
    const updateInProgress = useAppSelector(state => state.profile.updateInProgress);
    const userID = useAppSelector(state => state.auth.data.id);
    const isFetching = useAppSelector(selectIsFetching);
    const serverErrors = useAppSelector(state => state.profile.errorsOnUpdate);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ProfileData>({ values: userInfo });

    useEffect(() => {
        if (!userInfo.userId) {
            if (userID) {
                dispatch(fetchProfile(userID));
            }
        }
    }, []);

    useEffect(() => {
        //regex
        const matchFieldName = /\((\w+)/g;
        const cutErrorMessage = /\s\((\w+)\)/;
        if (serverErrors) {
            serverErrors.forEach(e => {
                const match = e.match(matchFieldName);
                if (match) {
                    const field = match[0].slice(1);
                    const fieldName = field.charAt(0).toLowerCase() + field.slice(1);

                    //@ts-ignore
                    setError(fieldName, { type: "manual", message: e.replace(cutErrorMessage, "") });
                }
            });
        }
    }, [serverErrors, setError]);

    const onSubmit: SubmitHandler<ProfileData> = formData => {
        dispatch(updateProfileData(formData));
    };

    if (isFetching || updateInProgress) return <Preloader />;

    return (
        <div className={s.container}>
            <h1 className={s.header}>Редактирование профиля</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Личная информация</h2>
                <div>
                    <label>Ваше имя</label>
                    <input {...register("fullName")} type="text" />
                    {errors.fullName && <span className={s.fieldHasError}>{errors.fullName.message}</span>}
                </div>
                <div>
                    <div>
                        <label>Краткая информация</label>
                        <textarea {...register("aboutMe")} placeholder="Расскажите о себе" />
                        {errors.aboutMe && <span className={s.fieldHasError}>{errors.aboutMe.message}</span>}
                    </div>
                </div>
                <div>
                    <label>В поиске работы</label>
                    <input {...register("lookingForAJob")} type="checkbox" />
                </div>
                <div>
                    <label>Описание</label>
                    <textarea {...register("lookingForAJobDescription")} />
                    {errors.lookingForAJobDescription && (
                        <span className={s.fieldHasError}>{errors.lookingForAJobDescription.message}</span>
                    )}
                </div>
                <hr />
                <h2>Контакты</h2>
                {createContactFields(userInfo.contacts, "input", register).map(c => c)}
                <div>
                    <YellowButton type="submit">Сохранить</YellowButton>
                </div>
            </form>
        </div>
    );
};

const createContactFields = (
    contacts: Object,
    Component: React.ComponentType | "input" | "select" | "textarea",
    register: UseFormRegister<ProfileData>
): JSX.Element[] => {
    const contactsJSX: JSX.Element[] = [];

    for (const [key, value] of Object.entries(contacts)) {
        contactsJSX.push(
            <div key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <Component {...register(`contacts.${key}`)} type="text" placeholder={value} />
            </div>
        );
    }
    return contactsJSX;
};
