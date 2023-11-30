import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const GallerySlider = ({ isOpen, onClose, data, ind }) => {
  const [slider, setSlider] = useState();

  useEffect(() => {
    if (slider) {
      slider.slickGoTo(ind);
    }
  }, [ind, slider]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody m="0" p="0" maxH={"60vh"}>
          <Box position={"relative"} width={"full"} overflow={"hidden"}>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <IconButton
              aria-label="left-arrow"
              position="absolute"
              borderRadius="50%"
              left="0px"
              top="50%"
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              aria-label="right-arrow"
              position="absolute"
              borderRadius="50%"
              right="0px"
              top="50%"
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <ChevronRightIcon />
            </IconButton>
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {data?.map((image, index) => {
                return (
                  <Box key={index}>
                    <Image
                      src={image}
                      alt="Image"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GallerySlider;
