import { UserType } from "../../api/social-networkAPI";
import searchReducer, { SearchPageDomainType, follow_unfollowUser, setUsers } from "../search_reducer";

let startState: SearchPageDomainType;
let items: UserType[];

beforeEach(() => {
    startState = {
        items: [],
        totalCount: 0,
        error: "",
        curPage: 1,
        itemsPerPage: 20,
        followingInProgress: [],
    };

    items = [
        {
            name: "Mike",
            id: 1,
            uniqueUrlName: "f8oqp",
            photos: { large: "", small: "" },
            followed: false,
        },
        {
            name: "Robert",
            id: 2,
            uniqueUrlName: "rra",
            photos: { large: "", small: "" },
            followed: true,
        },
    ];
});

describe("search reducer", () => {
    it("should set fetched items", () => {
        const action = setUsers(items);

        const endState = searchReducer(startState, action);

        expect(endState.items.length).toBe(2);
        expect(endState.items[0].name).toBe("Mike");
        expect(endState.items[1].name).toBe("Robert");
    });

    it("should follow Mike", () => {
        const action = follow_unfollowUser(1, true);

        const endState = searchReducer(searchReducer(startState, setUsers(items)), action);

        expect(endState.items[0].followed).not.toBe(false);
        expect(endState.items[0].id).toBe(1);
    });

    it("should unfollow Robert", () => {
        const action = follow_unfollowUser(2, false);

        const endState = searchReducer(searchReducer(startState, setUsers(items)), action);

        expect(endState.items[1].followed).not.toBe(true);
        expect(endState.items[1].id).toBe(2);
    });
});
