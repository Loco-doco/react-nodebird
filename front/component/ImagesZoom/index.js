import React, { useCallback, useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import { CloseBtn, Global, Header, ImgWrapper, Indicator, Overlay, SlickWrapper } from './styles';


const ImagesZoom = ({ images, onClose }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    console.log("ImagesZoom 화면입니다")

    return(
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <div>
                <SlickWrapper>
                    <Slick
                        intialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                            <div>
                                {currentSlide + 1}
                                /
                                {images.length}
                            </div>
                    </Indicator>
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