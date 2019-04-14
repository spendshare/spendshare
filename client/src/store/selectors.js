export const getGroupUsers = (state, groupId) =>
  state.members
    .filter(member => member.groupId === groupId)
    .map(member => state.users.all[member.userId])
