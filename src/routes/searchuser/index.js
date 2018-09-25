import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Checkbox, Toast, SearchBar } from 'components';
import Nav from 'components/nav';


const CheckboxItem = Checkbox.CheckboxItem;

function SearchUser ({ location, dispatch, searchuser }) {
  const { name = '搜索用户' } = location.query, { lists = [] } = searchuser;
  const handleSearchClick = (val) => {
    dispatch({
      type: 'searchuser/queryUsers',
      payload: {
        searchText: val
      }
    });
  };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar placeholder="搜索" maxLength={8} onSubmit={handleSearchClick} />
      <div>
      
      </div>
    </div>
  );
}

export default connect(({ loading, searchuser }) => ({
  loading,
  searchuser,
}))(SearchUser);
