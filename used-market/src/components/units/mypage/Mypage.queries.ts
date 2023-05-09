import { gql } from "@apollo/client";

export const LOGOUT_USER = gql`
  mutation {
    logoutUser
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput){
      _id
      email
      name
      picture
      createdAt
    }
  }
`;

export const UPLOAD_FILE = gql`
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    _id
    url
  }
}
`;

export const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;