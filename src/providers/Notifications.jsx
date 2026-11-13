import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function NotificationsProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const addNotification = props =>
    setNotification({
      id: Date.now(),
      ...props,
      onClose: () => {
        props.onClose?.();
        setNotification(null);
      },
    });

  return <Context value={{ notification, addNotification }}>{children}</Context>;
}

export const useNotifications = () => useContext(Context);
