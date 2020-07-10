# Randottery

### [Figma project](https://www.figma.com/file/1Cg8FJEryoa1pjwjJjbXax/Randottery?node-id=0%3A1)

## Tech stack:

- Firebase
- React + TS
- Styled Components
- Node.js
- Ant Design for quick prototyping

## Project functionality:

- Create a Lottery
- Set up end time
- Set up max participants
- Set up prize description
- Set up the number of winners
- Set up an additional required field (any form of user-unique identification)
- Instantly run lottery when max participants reached (optional)
- View your current / ended lotteries (joined/created)
- Quick lottery ID share

### Basic lottery creator scenario

As a lottery creator, you have to log in then you can add your own lottery. To do that you should fill `name`, `date/time`, `max participants` , `number of winners`, and an additional field for extra security - for example, you can ask about in-game character name or unique username belonging to the player. This feature might be helpful to protect against users who are trying to create multiple entries. We might implement a filter which will force this field to be unique with an optional checkbox.

### Basic lottery joining scenario

As a lottery participant, you will have to log in and then you will be able to join a lottery using either `ID` or `direct link`. To use lottery `ID` you will have to type it/ paste it into the input field and find the lottery first to make sure you are joining the right one. Then you will see lottery info, the current number of participants and prize if stated by the creator. Then you will have to enter your name you want to use to the draw and if required you will also have to provide a unique form of identification set by the creator.

### Backend Logic

```javascript
enum LotteryStatus {
  active
  ended
  canceled
}

type Lottery @model @auth(rules: [{ allow: owner, ownerField: "owner", queries: null }]) {
  id: ID!
  name: String!
  maxParticipants: Int
  endDate: Int!
  endWhenFull: Boolean
  numberOfWinners: Int
  prize: String
  status: LotteryStatus!
  owner: String
  participants: [Participant] @connection(name: "LotteryParticipants")
}

type Participant
  @model
  @auth(rules: [{ allow: owner, ownerField: "user", queries: null }]) {
  id: ID!
  user: String
  lottery: Lottery @connection(name: "LotteryParticipants")
}
```

#### Lottery

- Any authenticated user can create lottery.
- Initial field values which can not be submited by creator:
  - `status: active`
  - `id: autoAssigned`
  - `owner: autoAssigned` (same as creator)
  - `participants: []`
- Creator can not update already created lottery values:
- Lottery can be deleted by owner only of there are no participants.
  - if there are than can be closed by `close` endpoint together with cleanup timeout responsible for ending it.
- Only Node.js backend can change status to `status: ended` when endDate is older than Now.
- Owner can see who joined lottery (username + DisplayName) all emails are hidden except winner one after lottery end.

#### Joining to Lottery (Participants table)

- Owner can not join own lottery
- User can join same lottery only once
- User can leave lottery only when its still active
- User can not see who joined lottery only number of participants is shown
- User can see ended lotteries and (username + DisplayName) of winner(s)

### Project purpose

- Learn React, Node.js and Firebase services.
- Solve potential problems and edge cases.
- Build the project from the planning stage to release and making it live.
