import React, { useState } from 'react';
import slick from 'react-slick';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const Header = styled.header`
    header: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;

    & h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }

    & button {
        position: absolute;
        right: 0;
        top: 0;
        padding: 15px;
        line-height: 14px;
        cursor: pointer;
    }
`

const SlickWrapper = styled.div`
    height: calc(100%-44px);
    background: #090909;
`

const ImgWrapper = styled.div`
    padding: 32px;
    text-align: center;

    & img {
        margin: 0 auto;
        max-height: 750px;
    }
`

const ImagesZoom = ({ images, onClose }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    return(
        <Overlay>
            <Header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}>X</button>
            </Header>
            <div>
                <SlickWrapper>
                    <slick
                        intialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => 
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        )}
                    </slick>
                </SlickWrapper>
            </div>
        </Overlay>

    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequires,

}

export default ImagesZoom;