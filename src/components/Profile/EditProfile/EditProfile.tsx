import React, { useEffect } from "react";
import withAuthRedirect from "../../../HOC/withAuthRedirect";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchProfile } from "../../../redux/profile_reducer";
import { selectIsFetching, selectUserInfo } from "../../../redux/selectors/selectors";
import { EditProfileForm } from "./EditProfileForm/EditProfileForm";

const EditProfile: React.FC = () => {
    const userInfo = useAppSelector(selectUserInfo);
    const userID = useAppSelector(state => state.auth.data.id);
    const isFetching = useAppSelector(selectIsFetching);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userInfo.userId) {
            if (userID) {
                dispatch(fetchProfile(userID));
            }
        }
    }, []);

    return <EditProfileForm userInfo={userInfo} />;
};

export default withAuthRedirect(EditProfile);
