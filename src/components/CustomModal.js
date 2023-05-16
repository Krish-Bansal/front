import React from "react";
import { Modal, Button } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, handleOptionSelect, title } = props;

  return (
    <Modal
      title="Shipping Cost"
      open={open}
      onCancel={hideModal}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <p>{title}</p>
      <Button type="primary" block onClick={() => handleOptionSelect("Inside Kathmandu Valley")} className="my-2 bg-black">
        Inside Kathmandu Valley(FREE)
      </Button>
      <Button type="primary" block onClick={() => handleOptionSelect("Outside Kathmandu Valley")} className="mb-2 bg-black">
        Outside Kathmandu Valley(Rs.100)
      </Button>
    </Modal>
  );
};

export default CustomModal;
