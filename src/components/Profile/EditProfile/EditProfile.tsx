import React from "react";
import { connect } from "react-redux";
import s from "./EditProfile.module.css";
import { ProfileData, ProfileResponseType } from "../../../api/social-networkAPI";
import { AppStateType } from "../../../redux/store";
import { selectIsFetching, selectUserInfo } from "../../../redux/selectors/selectors";
import { fetchProfile, updateProfileData } from "../../../redux/profile_reducer";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import { compose } from "redux";
import { Form, Field } from "react-final-form";
import YellowButton from "../../common/Buttons/YellowButton";
import Preloader from "../../common/Preloader";

type Props = MapStateType & MapDispatchType;

type State = {
    isSuccessful: boolean;
};

class EditProfile extends React.Component<Props, State> {
    state = {
        isSuccessful: false,
    };

    componentDidMount() {
        
        const {fetchProfile, userID, userInfo} = this.props;

        if (!userInfo.userId) {
            if (userID) {
                fetchProfile(userID);
            }
        }
    }

    handleSubmit(formData: ProfileData) {
        this.props.updateProfileData(formData);
    }

    render() {
        const {isFetching, updateInProgress, userInfo} = this.props;

        if (isFetching || updateInProgress) return <Preloader />

        return (
            <div className={s.container}>
                <h1 className={s.header}>Редактирование профиля</h1>
                <Form
                    onSubmit={this.handleSubmit.bind(this)}
                    initialValues={userInfo}
                    render={({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <h2>Личная информация</h2>
                                <div>
                                    <label>Ваше имя</label>
                                    <Field name="fullName" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Краткая информация</label>
                                    <Field name="aboutMe" component="textarea" placeholder="Расскажите о себе" />
                                </div>
                                <div>
                                    <label>В поиске работы</label>
                                    <Field name="lookingForAJob" component="input" type="checkbox" />
                                </div>
                                <div>
                                    <label>Описание</label>
                                    <Field name="lookingForAJobDescription" component="textarea" />
                                </div>
                                <hr />
                                <h2>Контакты</h2>
                                <div>
                                    <label>Facebook</label>
                                    <Field name="facebook" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Website</label>
                                    <Field name="website" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Vk</label>
                                    <Field name="vk" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Twitter</label>
                                    <Field name="twitter" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Instagram</label>
                                    <Field name="instagram" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Youtube</label>
                                    <Field name="youtube" component="input" type="text" />
                                </div>
                                <div>
                                    <label>Github</label>
                                    <Field name="github" component="input" type="text" />
                                </div>
                                <div>
                                    <label>MainLink</label>
                                    <Field name="mainLink" component="input" type="text" />
                                </div>
                                <div>
                                    <YellowButton type="submit">Сохранить</YellowButton>
                                </div>
                            </form>
                        );
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    userInfo: selectUserInfo(state),
    updateInProgress: state.profile.updateInProgress,
    userID: state.auth.data.id,
    isFetching: selectIsFetching(state)
});

export default compose<React.ComponentType>(
    connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps, { updateProfileData, fetchProfile }),
    withAuthRedirect
)(EditProfile);

//types
type MapStateType = {
    userInfo: ProfileResponseType;
    updateInProgress: boolean;
    userID: number | null;
    isFetching: boolean;
};

type MapDispatchType = {
    updateProfileData: (formData: ProfileData) => void;
    fetchProfile: (id: number | string) => void;
};
