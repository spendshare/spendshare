export const getGroupUsers = (state, groupId) =>
  state.members
    .filter(member => member.groupId === groupId)
    .map(member => state.users.all[member.userId])

export const getGroupBills = (state, groupId) =>
  Object.values(state.bills).filter(bill => bill.groupId === groupId)

export const selectSession = state => state.session

export const selectGroups = state => Object.values(state.groups)
