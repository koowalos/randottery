/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLottery = /* GraphQL */ `
  query GetLottery($id: ID!) {
    getLottery(id: $id) {
      id
      name
      maxParticipants
      endDate
      endWhenFull
      numberOfWinners
      prize
      status
      owner
      participants {
        items {
          id
          user
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLotterys = /* GraphQL */ `
  query ListLotterys(
    $filter: ModelLotteryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLotterys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        maxParticipants
        endDate
        endWhenFull
        numberOfWinners
        prize
        status
        owner
        participants {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParticipant = /* GraphQL */ `
  query GetParticipant($id: ID!) {
    getParticipant(id: $id) {
      id
      user
      lottery {
        id
        name
        maxParticipants
        endDate
        endWhenFull
        numberOfWinners
        prize
        status
        owner
        participants {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listParticipants = /* GraphQL */ `
  query ListParticipants(
    $filter: ModelParticipantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParticipants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        lottery {
          id
          name
          maxParticipants
          endDate
          endWhenFull
          numberOfWinners
          prize
          status
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
