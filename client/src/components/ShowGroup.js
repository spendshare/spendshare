import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ShowGroup.module.scss'
import actions from '../store/actions'
import People from './People'
import Bills from './Bills'
import Spinner from './Spinner'

const mapStateToProps = ({ groups }) => ({ groups })

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestGroupMembers: () =>
    dispatch(actions.requestGroupMembers(ownProps.match.params.id)),
  requestGroupBills: () =>
    dispatch(actions.requestGroupBills(ownProps.match.params.id)),
  requestGroupDebts: () =>
    dispatch(actions.requestGroupDebts(ownProps.match.params.id)),
})

const ShowGroup = ({
  match,
  requestGroupMembers,
  requestGroupBills,
  requestGroupDebts,
  groups,
  debts,
}) => {
  useEffect(() => {
    requestGroupMembers()
    requestGroupBills()
    requestGroupDebts()
  }, [])

  const group = groups[match.params.id]

  if (!group) return <Spinner />
  if (group.error) return <div>error</div>

  return (
    <div className={styles.container}>
      <Bills groupId={match.params.id} />
      <div className={styles.right}>
        {group.fetching && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        <People groupId={match.params.id} faded={group.fetching} />
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGroup)
