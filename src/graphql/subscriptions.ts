/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLottery = /* GraphQL */ `
  subscription OnCreateLottery {
    onCreateLottery {
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
export const onUpdateLottery = /* GraphQL */ `
  subscription OnUpdateLottery {
    onUpdateLottery {
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
export const onDeleteLottery = /* GraphQL */ `
  subscription OnDeleteLottery {
    onDeleteLottery {
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
export const onCreateParticipant = /* GraphQL */ `
  subscription OnCreateParticipant {
    onCreateParticipant {
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
export const onUpdateParticipant = /* GraphQL */ `
  subscription OnUpdateParticipant {
    onUpdateParticipant {
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
export const onDeleteParticipant = /* GraphQL */ `
  subscription OnDeleteParticipant {
    onDeleteParticipant {
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
