import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


const PostCardContent = ({ postData }) => {

    const regEx = /(#[^\s#]+)/g

    return (
        <div>
            {postData.split(regEx).map((v, i) => {
                if (v.match(regEx)) {
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a> {v} </a></Link>
                }
                return v;
            })}
        </div>
    )
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired
}

export default PostCardContent;