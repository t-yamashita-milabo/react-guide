import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import ClickableTable from "organizations/ClickableTable";
import { Item } from "models/item";
import { useState } from "react";

const items: Item[] = [
  {
    id: "item0",
    itemName: "アイテム0",
    price: 0,
  },
  {
    id: "item1",
    itemName: "アイテム1",
    price: 100,
  },
  {
    id: "item2",
    itemName: "アイテム2",
    price: 200,
  },
];

const ItemPage = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [clickedItem, setClickedItem] = useState<Item | undefined>();

  return (
    <Box>
      <Heading>アイテム</Heading>
      <ClickableTable<Item>
        header={["ID", "アイテム名", "価格"]}
        cols={["id", "itemName", "price"]}
        data={items.map((item) => ({
          ...item,
          onClick: () => {
            onModalOpen();
            setClickedItem(item);
          },
        }))}
      />
      {clickedItem && (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Box pt={4} pb={4}>{`${clickedItem.itemName} is licked`}</Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ItemPage;
