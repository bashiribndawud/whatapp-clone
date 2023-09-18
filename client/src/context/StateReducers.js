import { reducerCases } from "./constants"

export const initialState = {
  userInfo: null,
  newUser: false,
  contactsPage: false,
  currentChatUser: null,
  messages: [],
  socket: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_USER_INFO: {
            return {
              ...state,
              userInfo: action.userInfo,
            };
        }   
        case reducerCases.SET_NEW_USER: {
          return {
            ...state,
            newUser: action.newUser,
          };
        } 
        case reducerCases.SET_ALL_CONTACT_PAGE: {
          return {
            ...state,
            contactsPage: !state.contactsPage
          }
        }
        case reducerCases.CHANGE_CURRENT_CHAT_USER: {
          return {
            ...state,
            currentChatUser: action.user
          }
        }
        case reducerCases.SET_MESSAGES : {
          return {
            ...state,
            messages: action.messages
          }
        }
        case reducerCases.SET_SOCKET: {
          return {
            ...state,
            socket: action.socket
          }
        }
        case reducerCases.ADD_MESSAGE: {
          return {
            ...state,
            messages: [...state.messages, action.message]
          }
        }
        default:
          return state
    }
}

export default reducer