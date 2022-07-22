import { useState } from "react";
import { Item } from "models/item";
import useSWR from "swr";
import Presentation from "./Presentation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

const fetchItems = async (): Promise<Item[]> => [
  {
    id: 1,
    itemName: "アイテム1",
    price: 100,
  },
  {
    id: 2,
    itemName: "アイテム2",
    price: 200,
  },
  {
    id: 3,
    itemName: "アイテム3",
    price: 300,
  },
];

const useItems = () => {
  const { data, error } = useSWR("/items", fetchItems);

  return {
    data,
    error,
    loading: !data && !error,
  };
};

const Container = () => {
  const { data } = useItems();
  const [clickedItem, setClickedItem] = useState<Item | undefined>();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      <Presentation
        data={
          data
            ? data.map((item) => ({
                ...item,
                onClick: () => {
                  setClickedItem(item);
                  onModalOpen();
                },
              }))
            : []
        }
      />
      {clickedItem && (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Box pt={4} pb={4}>
                {`${clickedItem.itemName} is clicked!`}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Container;
