import { Store, iNotification } from 'react-notifications-component';

interface INotificationProps extends Omit<iNotification, 'container'> {}

export default class Notification {
  static addNotification = (options: INotificationProps) => {
    const { dismiss, slidingExit, ...rest } = options;

    Store.addNotification({
      container: 'top-right',
      dismiss: {
        duration: 3000,
        showIcon: true,
        pauseOnHover: true,
        ...dismiss,
      },
      slidingExit: {
        duration: 100,
        timingFunction: 'ease-out',
        delay: 0,
        ...slidingExit,
      },
      ...rest,
    });
  };

  static showError = (message: string) => {
    this.addNotification({ type: 'danger', message });
  };

  static showSomethingWrongError = () => {
    this.addNotification({ type: 'danger', message: 'something wrong' });
  };

  static showSuccess = (message: string) => {
    this.addNotification({ type: 'success', message });
  };
}
