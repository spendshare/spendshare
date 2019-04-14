import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ShowGroup.module.scss'
import actions from '../store/actions'
import People from './People'
import Bills from './Bills'
import Spinner from './Spinner'

const mapStateToProps = ({ groups }) => ({ groups })

const mapDispatchToProps = dispatch => ({
  requestGroupMembers: id => dispatch(actions.requestGroupMembers(id)),
  requestGroupBills: id => dispatch(actions.requestGroupBills(id)),
})

const ShowGroup = ({ match, requestGroupMembers, groups }) => {
  useEffect(() => {
    requestGroupMembers(match.params.id)
  }, [])

  const group = groups[match.params.id]

  if (!group || group.loading) return <Spinner />
  if (group.error) return <div>error</div>

  return (
    <div className={styles.container}>
      <Bills groupId={match.params.id} />
      <People groupId={match.params.id} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGroup)
