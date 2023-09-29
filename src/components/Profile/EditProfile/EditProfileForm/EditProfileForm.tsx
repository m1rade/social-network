import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { ProfileData, ProfileResponseType } from "../../../../api/social-networkAPI";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { setErrorsOnFailedUpdate, toggleUpdateInProgress, updateProfileData } from "../../../../redux/profile_reducer";
import YellowButton from "../../../common/Buttons/YellowButton";
import { Form } from "../../../common/Forms/Form";
import { Input } from "../../../common/Forms/Input";
import { Textarea } from "../../../common/Forms/Textarea";
import s from "./EditProfileForm.module.css";

const PROFILE_FIELDS = [
    {
        name: "fullName" as const,
        type: "text",
        label: "Ваше имя",
        htmlTag: Input,
    },
    {
        name: "aboutMe" as const,
        label: "Краткая информация",
        placeholder: "Расскажите о себе",
        htmlTag: Textarea,
    },
    {
        name: "lookingForAJob" as const,
        type: "checkbox",
        label: "В поиске работы",
        htmlTag: Input,
    },
    {
        name: "lookingForAJobDescription" as const,
        label: "Ваш стек",
        placeholder: "Какими навыками вы обладаете",
        htmlTag: Textarea,
    },
];

type Props = {
    userInfo: ProfileResponseType;
};

export const EditProfileForm: React.FC<Props> = ({ userInfo }) => {
    const serverErrors = useAppSelector(state => state.profile.update.errors);
    const updateInProgress = useAppSelector(state => state.profile.update.updateInProgress);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updateInProgress === "Successful") {
            window.scrollTo(0, 0);
        }

        return () => {
            if (updateInProgress === "Failed" || updateInProgress === "Successful") {
                dispatch(toggleUpdateInProgress("Idle"));
            }
        };
    }, [updateInProgress]);

    useEffect(() => {
        return () => {
            dispatch(setErrorsOnFailedUpdate(null));
        };
    }, []);

    const onSubmit: SubmitHandler<ProfileData> = formData => {
        dispatch(updateProfileData(formData));
    };

    return (
        <div className={s.container}>
            <h1 className={s.header}>Редактирование профиля</h1>

            <Form<ProfileData>
                onSubmit={onSubmit}
                options={{ defaultValues: userInfo, values: userInfo }}
                serverErrors={serverErrors}>
                {({ register, formState }) => (
                    <>
                        <div className={s.blockContainer}>
                            {updateInProgress === "Successful" && <UpdateResultMessage message="Изменения сохранены" />}
                            <h2 className={s.blockHeader}>Личная информация</h2>
                            {PROFILE_FIELDS.map(field => {
                                return (
                                    <field.htmlTag
                                        key={field.name}
                                        registration={register(field.name)}
                                        type={field.type}
                                        label={field.label}
                                        placeholder={
                                            field.name === "fullName" ? userInfo[field.name] : field.placeholder
                                        }
                                        error={formState.errors[field.name]}
                                    />
                                );
                            })}
                        </div>

                        <hr />
                        <div className={s.blockContainer}>
                            <h2 className={s.blockHeader}>Контакты</h2>
                            {Object.entries(userInfo.contacts).map(([key, value]) => {
                                return (
                                    <Input
                                        key={key}
                                        registration={register(`contacts.${key}`)}
                                        type="text"
                                        placeholder={value}
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    />
                                );
                            })}
                        </div>
                        <div className={s.editButton}>
                            <YellowButton type="submit">Сохранить</YellowButton>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
};

const UpdateResultMessage: React.FC<{ message: string }> = ({ message }) => {
    return <div className={s.updateResultMessage}>{message}</div>;
};
