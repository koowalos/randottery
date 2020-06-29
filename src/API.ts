/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLotteryInput = {
  id?: string | null,
  name: string,
  maxParticipants?: number | null,
  endDate: number,
  endWhenFull?: boolean | null,
  numberOfWinners?: number | null,
  prize?: string | null,
  status: LotteryStatus,
  owner?: string | null,
};

export enum LotteryStatus {
  active = "active",
  ended = "ended",
  canceled = "canceled",
}


export type ModelLotteryConditionInput = {
  name?: ModelStringInput | null,
  maxParticipants?: ModelIntInput | null,
  endDate?: ModelIntInput | null,
  endWhenFull?: ModelBooleanInput | null,
  numberOfWinners?: ModelIntInput | null,
  prize?: ModelStringInput | null,
  status?: ModelLotteryStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelLotteryConditionInput | null > | null,
  or?: Array< ModelLotteryConditionInput | null > | null,
  not?: ModelLotteryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelLotteryStatusInput = {
  eq?: LotteryStatus | null,
  ne?: LotteryStatus | null,
};

export type UpdateLotteryInput = {
  id: string,
  name?: string | null,
  maxParticipants?: number | null,
  endDate?: number | null,
  endWhenFull?: boolean | null,
  numberOfWinners?: number | null,
  prize?: string | null,
  status?: LotteryStatus | null,
  owner?: string | null,
};

export type DeleteLotteryInput = {
  id?: string | null,
};

export type CreateParticipantInput = {
  id?: string | null,
  user?: string | null,
  participantLotteryId?: string | null,
};

export type ModelParticipantConditionInput = {
  user?: ModelStringInput | null,
  and?: Array< ModelParticipantConditionInput | null > | null,
  or?: Array< ModelParticipantConditionInput | null > | null,
  not?: ModelParticipantConditionInput | null,
};

export type UpdateParticipantInput = {
  id: string,
  user?: string | null,
  participantLotteryId?: string | null,
};

export type DeleteParticipantInput = {
  id?: string | null,
};

export type ModelLotteryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  maxParticipants?: ModelIntInput | null,
  endDate?: ModelIntInput | null,
  endWhenFull?: ModelBooleanInput | null,
  numberOfWinners?: ModelIntInput | null,
  prize?: ModelStringInput | null,
  status?: ModelLotteryStatusInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelLotteryFilterInput | null > | null,
  or?: Array< ModelLotteryFilterInput | null > | null,
  not?: ModelLotteryFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelParticipantFilterInput = {
  id?: ModelIDInput | null,
  user?: ModelStringInput | null,
  and?: Array< ModelParticipantFilterInput | null > | null,
  or?: Array< ModelParticipantFilterInput | null > | null,
  not?: ModelParticipantFilterInput | null,
};

export type CreateLotteryMutationVariables = {
  input: CreateLotteryInput,
  condition?: ModelLotteryConditionInput | null,
};

export type CreateLotteryMutation = {
  createLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLotteryMutationVariables = {
  input: UpdateLotteryInput,
  condition?: ModelLotteryConditionInput | null,
};

export type UpdateLotteryMutation = {
  updateLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLotteryMutationVariables = {
  input: DeleteLotteryInput,
  condition?: ModelLotteryConditionInput | null,
};

export type DeleteLotteryMutation = {
  deleteLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateParticipantMutationVariables = {
  input: CreateParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type CreateParticipantMutation = {
  createParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateParticipantMutationVariables = {
  input: UpdateParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type UpdateParticipantMutation = {
  updateParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteParticipantMutationVariables = {
  input: DeleteParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type DeleteParticipantMutation = {
  deleteParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLotteryQueryVariables = {
  id: string,
};

export type GetLotteryQuery = {
  getLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLotterysQueryVariables = {
  filter?: ModelLotteryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLotterysQuery = {
  listLotterys:  {
    __typename: "ModelLotteryConnection",
    items:  Array< {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetParticipantQueryVariables = {
  id: string,
};

export type GetParticipantQuery = {
  getParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListParticipantsQueryVariables = {
  filter?: ModelParticipantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParticipantsQuery = {
  listParticipants:  {
    __typename: "ModelParticipantConnection",
    items:  Array< {
      __typename: "Participant",
      id: string,
      user: string | null,
      lottery:  {
        __typename: "Lottery",
        id: string,
        name: string,
        maxParticipants: number | null,
        endDate: number,
        endWhenFull: boolean | null,
        numberOfWinners: number | null,
        prize: string | null,
        status: LotteryStatus,
        owner: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateLotterySubscription = {
  onCreateLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLotterySubscription = {
  onUpdateLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLotterySubscription = {
  onDeleteLottery:  {
    __typename: "Lottery",
    id: string,
    name: string,
    maxParticipants: number | null,
    endDate: number,
    endWhenFull: boolean | null,
    numberOfWinners: number | null,
    prize: string | null,
    status: LotteryStatus,
    owner: string | null,
    participants:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        user: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParticipantSubscription = {
  onCreateParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateParticipantSubscription = {
  onUpdateParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteParticipantSubscription = {
  onDeleteParticipant:  {
    __typename: "Participant",
    id: string,
    user: string | null,
    lottery:  {
      __typename: "Lottery",
      id: string,
      name: string,
      maxParticipants: number | null,
      endDate: number,
      endWhenFull: boolean | null,
      numberOfWinners: number | null,
      prize: string | null,
      status: LotteryStatus,
      owner: string | null,
      participants:  {
        __typename: "ModelParticipantConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
