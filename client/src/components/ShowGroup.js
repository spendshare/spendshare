import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ShowGroup.module.scss'
import actions from '../store/actions'

const mapStateToProps = ({ groups }) => ({ groups })

const mapDispatchToProps = dispatch => ({
  requestGroupMembers: name => dispatch(actions.requestGroupMembers(name)),
})

const ShowGroup = ({ match, requestGroupMembers, groups }) => {
  useEffect(() => {
    requestGroupMembers(match.params.name)
  }, [])

  const group = groups[match.params.name]

  if (!group || group.loading) return <div>loading...</div>
  if (group.error) return <div>error</div>

  return <div>oto grupka zwana: {match.params.name}</div>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGroup)
