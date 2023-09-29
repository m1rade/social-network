import { UserPhotoType } from "../../api/social-networkAPI";
import profileReducer, {
    ProfileDomainType,
    addPostMessage,
    deletePostMessage,
    setProfilePhoto,
    setProfileStatus,
} from "../profile_reducer";

let startState: ProfileDomainType;

beforeEach(() => {
    startState = {
        userInfo: {
            aboutMe: "Cooool cat's description here",
            contacts: {
                facebook: "",
                website: "",
                vk: "",
                twitter: "",
                instagram: "",
                youtube: "",
                github: "",
                mainLink: "",
            },
            lookingForAJob: false,
            lookingForAJobDescription: "gfgf",
            fullName: "Cooool cat",
            userId: null,
            photos: {
                small: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
                large: "",
            },
        },
        status: "",
        posts: [
            { id: 1, message: "How are you today?" },
            { id: 2, message: "Hello world!" },
            { id: 3, message: "I ate" },
        ],
        update: {
            updateInProgress: "Idle",
            errors: null,
        },
    };
});

describe("profile reducer", () => {
    it("should add new post", () => {
        const action = addPostMessage("Hello there");

        const changedState = profileReducer(startState, action);

        expect(changedState.posts.length).toBe(4);
        expect(changedState.posts[0].message).toBe("Hello there");
        expect(changedState.posts[0].id).toBeDefined();
    });

    it("should delete post", () => {
        const action = deletePostMessage(3);

        const changedState = profileReducer(startState, action);

        expect(changedState.posts.length).toBe(2);
        expect(changedState.posts[2]).toBeUndefined();
    });

    it("shouldn't delete post if id would be incorrect", () => {
        const action = deletePostMessage(5);

        const changedState = profileReducer(startState, action);

        expect(changedState.posts.length).toBe(3);
    });

    it("should update profile photo", () => {
        const photos1: UserPhotoType = {
            small: "sm-img.jpg",
            large: "lg-img.jpeg",
        };

        const photos2: UserPhotoType = {
            small: "https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png",
            large: "large-img.jpg",
        };

        const changedState = profileReducer(startState, setProfilePhoto(photos1));

        expect(changedState.userInfo.photos).toBe(photos1);

        const changedState2 = profileReducer(startState, setProfilePhoto(photos2));

        expect(changedState2.userInfo.photos.small).toBe(startState.userInfo.photos.small);
        expect(changedState2.userInfo.photos.large).toBe(photos2.large);
    });

    it("should update profile status", () => {
        const newStatus = "New status";

        const changedState = profileReducer(startState, setProfileStatus(newStatus));

        expect(changedState.status).toBe(newStatus);
    });
});
