/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLottery = /* GraphQL */ `
  mutation CreateLottery(
    $input: CreateLotteryInput!
    $condition: ModelLotteryConditionInput
  ) {
    createLottery(input: $input, condition: $condition) {
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
export const updateLottery = /* GraphQL */ `
  mutation UpdateLottery(
    $input: UpdateLotteryInput!
    $condition: ModelLotteryConditionInput
  ) {
    updateLottery(input: $input, condition: $condition) {
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
export const deleteLottery = /* GraphQL */ `
  mutation DeleteLottery(
    $input: DeleteLotteryInput!
    $condition: ModelLotteryConditionInput
  ) {
    deleteLottery(input: $input, condition: $condition) {
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
export const createParticipant = /* GraphQL */ `
  mutation CreateParticipant(
    $input: CreateParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    createParticipant(input: $input, condition: $condition) {
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
export const updateParticipant = /* GraphQL */ `
  mutation UpdateParticipant(
    $input: UpdateParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    updateParticipant(input: $input, condition: $condition) {
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
export const deleteParticipant = /* GraphQL */ `
  mutation DeleteParticipant(
    $input: DeleteParticipantInput!
    $condition: ModelParticipantConditionInput
  ) {
    deleteParticipant(input: $input, condition: $condition) {
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
