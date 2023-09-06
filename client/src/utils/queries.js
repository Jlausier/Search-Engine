import { gql } from '@apollo/client';

export const GET_PROFILES = gql`
  query getProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const GET_SINGLE_PROFILE = gql`
  query getSingleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;
