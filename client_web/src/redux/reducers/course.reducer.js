import { courseConstants } from "../constants/course.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
    item: null,
    loadingSingle: false,
};

export function courses(state = initialState, action) {
    switch (action.type) {
        //
        // GET ALL
        //
        case courseConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case courseConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.data,
            };
        case courseConstants.GETALL_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                loadingSingle: false,
            };
        // //
        // // GET SINGLE
        // //
        case courseConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                item: null,
                loadingSingle: true,
            };
        case courseConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loadingSingle: false,
                item: action.data,
            };
        case courseConstants.GETSINGLE_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                loadingSingle: false,
            };
        // //
        // // TAKE LEAD
        // //
        // case courseConstants.TAKELEAD_REQUEST:
        //   return {
        //     ...state,
        //     loadingTakeLead: true,
        //   };
        // case courseConstants.TAKELEAD_SUCCESS:
        //   return {
        //     ...state,
        //     loadingTakeLead: false,
        //   };
        // case courseConstants.TAKELEAD_FAILURE:
        //   return {
        //     error: action.error,
        //   };
        // //
        // // DELETE
        // //
        // case courseConstants.DELETE_REQUEST:
        //   // add 'deleting:true' property to user being deleted
        //   return {
        //     ...state,
        //     items: state.items.map(user =>
        //       user.id === action.id ? {...user, deleting: true} : user,
        //     ),
        //   };
        // case courseConstants.DELETE_SUCCESS:
        //   // remove deleted user from state
        //   return {
        //     items: state.items.filter(user => user.id !== action.id),
        //   };
        // case courseConstants.DELETE_FAILURE:
        //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        //   return {
        //     ...state,
        //     items: state.items.map(user => {
        //       if (user.id === action.id) {
        //         // make copy of user without 'deleting:true' property
        //         const {deleting, ...userCopy} = user;
        //         // return copy of user with 'deleteError:[error]' property
        //         return {...userCopy, deleteError: action.error};
        //       }

        //       return user;
        //     }),
        //   };
        default:
            return state;
    }
}
