import { videoConstants } from "../constants/video.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
    item: null,
    loadingSingle: false,
};

export function videos(state = initialState, action) {
    switch (action.type) {
        //
        // GET ALL
        //
        case videoConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case videoConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.data,
            };
        case videoConstants.GETALL_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                loadingSingle: false,
            };
        //
        // GET SINGLE
        //
        case videoConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                item: null,
                loadingSingle: true,
            };
        case videoConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loadingSingle: false,
                item: action.data,
            };
        case videoConstants.GETSINGLE_FAILURE:
            return {
                ...state,
                error: action.error,
                item: null,
                loadingSingle: false,
            };
        //
        // VIEW VIDEO
        //
        case videoConstants.VIEWVIDEO_REQUEST:
            return {
                ...state,
            };
        case videoConstants.VIEWVIDEO_SUCCESS:
            return {
                ...state,
            };
        case videoConstants.VIEWVIDEO_FAILURE:
            return {
                ...state,
            };
        //
        // COMPLETE
        //
        case videoConstants.COMPLETEVIDEO_REQUEST:
            return {
                ...state,
            };
        case videoConstants.COMPLETEVIDEO_SUCCESS:
            return {
                ...state,
            };
        case videoConstants.COMPLETEVIDEO_FAILURE:
            return {
                ...state,
            };
        //
        // TIME LENGTH
        //
        case videoConstants.SETVIDEOLENGTH_REQUEST:
            return {
                ...state,
            };
        case videoConstants.SETVIDEOLENGTH_SUCCESS:
            return {
                ...state,
            };
        case videoConstants.SETVIDEOLENGTH_FAILURE:
            return {
                ...state,
            };
        // //
        // // TAKE LEAD
        // //
        // case videoConstants.TAKELEAD_REQUEST:
        //   return {
        //     ...state,
        //     loadingTakeLead: true,
        //   };
        // case videoConstants.TAKELEAD_SUCCESS:
        //   return {
        //     ...state,
        //     loadingTakeLead: false,
        //   };
        // case videoConstants.TAKELEAD_FAILURE:
        //   return {
        //     error: action.error,
        //   };
        // //
        // // DELETE
        // //
        // case videoConstants.DELETE_REQUEST:
        //   // add 'deleting:true' property to user being deleted
        //   return {
        //     ...state,
        //     items: state.items.map(user =>
        //       user.id === action.id ? {...user, deleting: true} : user,
        //     ),
        //   };
        // case videoConstants.DELETE_SUCCESS:
        //   // remove deleted user from state
        //   return {
        //     items: state.items.filter(user => user.id !== action.id),
        //   };
        // case videoConstants.DELETE_FAILURE:
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
