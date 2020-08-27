import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
    return(
        <div>
            <div> 공통메뉴 </div>
            <div> 홀리 쉣 왓더 뿩</div>
            {children}
        </div>
    )
}

// AppLayout.propTypes = {
//     children: PropTypes.node.isRequired
// }

export default AppLayout