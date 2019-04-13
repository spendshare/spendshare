import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ShowGroup.module.scss'
import actions from '../store/actions'

const mapStateToProps = ({ groups }) => ({ groups })

const mapDispatchToProps = dispatch => ({
  requestGroupMembers: id => dispatch(actions.requestGroupMembers(id)),
})

const ShowGroup = ({ match, requestGroupMembers, groups }) => {
  useEffect(() => {
    requestGroupMembers(match.params.id)
  }, [])

  const group = groups[match.params.id]

  if (!group || group.loading) return <div>loading...</div>
  if (group.error) return <div>error</div>

  return <div>oto grupka o id: {JSON.stringify(group, null, 2)}</div>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGroup)
