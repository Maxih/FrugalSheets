import { connect } from 'react-redux';
import { fetchGroups, selectGroup } from '../../actions/group_actions';
import Group from './group';

const mapStateToProps = (state) => {
  return {
    list: state.groups.list,
    active: state.groups.active
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  selectGroup: (id) => dispatch(selectGroup(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
