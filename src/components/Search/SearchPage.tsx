import React from 'react'
import withAuthRedirect from '../../HOC/withAuthRedirect';
import UsersContainer from './Users/UsersContainer';


const SearchPage: React.FC<any> = (props) => {
    return (
        <div>
            <UsersContainer />
        </div>
    );
};

export default withAuthRedirect(SearchPage);