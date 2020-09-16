import React, { useCallback, useState } from 'react';
import {Button, Card, Popover} from 'antd';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

import { PlusOutlined } from '@ant-design/icons';

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    console.log(`images.length === ${images.length}`)
    
    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, [])

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, [])

    
    if (images.length === 1) {
        console.log(`images.length 첫번째 if문`)
        return(
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        );
    }
    if (images.length === 2) {
        console.log(`images.length 두번째 if문`)
        return (
            <>
                <img role="presentation" style={{ width:'50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <img role="presentation" style={{ width:'50%', display: 'inline-block' }} src={images[1].src} alt={images[1].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        );
    }
    return(
        <>
            {console.log("return 됨")}
            <div>
                <img role="presentation" width="50%" src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle'}}
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length-1} 개의 사진 더 보기
                </div>
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
        </>
    )
}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
      })).isRequired,
}

export default PostImages;