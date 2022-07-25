import {
  Button,
  useDisclosure,
  Box,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>OOOOOOOOOOOOOOOOOOOOOOOO</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box>XXXXXXXXXXXXXXXXXXXXXXXX</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
