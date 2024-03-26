import { Button, Modal } from '@gravity-ui/uikit';
import { ModalProps } from '@gravity-ui/uikit/build/esm/components/Modal/Modal';
import React, { useEffect, useState } from 'react';

interface IConfirmModalProps extends ModalProps {
  onDisagree: () => void;
  onAgree: () => void;
  loading?: boolean;
  desc?: string;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = (props) => {
  const { open, desc, loading, onDisagree, onAgree, children, ...rest } = props;

  const [localMessage, setLocalMessage] = useState<string>('');

  // Effects

  useEffect(() => {
    if (open && desc) {
      setLocalMessage(desc);
      return;
    }

    setTimeout(() => {
      setLocalMessage('');
    }, 225); // дожидаемся закрытия модалки
  }, [open, desc]);

  // Renders

  return (
    <Modal open={open} {...rest} onClose={onDisagree}>
      <div style={{ padding: '20px', minWidth: '200px' }}>
        {!!localMessage && <div>{localMessage}</div>}

        {children}
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '20px' }}>
          <Button disabled={loading} onClick={onDisagree}>
            cancel
          </Button>

          <Button view={'action'} loading={loading} onClick={onAgree}>
            yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
