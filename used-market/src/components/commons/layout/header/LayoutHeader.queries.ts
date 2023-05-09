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