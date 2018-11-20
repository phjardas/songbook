import React, { useState } from 'react';

const Context = React.createContext();

export function NotificationsProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const addNotification = props => {
    const notification = {
      ...props,
      onClose: () => {
        props.onClose && props.onClose();
        setNotification(null);
      },
    };

    setNotification(notification);
  };

  const value = { notification: notification, addNotification };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const WithNotifications = Context.Consumer;

export function withNotifications() {
  return Component => props => <WithNotifications>{context => <Component {...props} {...context} />}</WithNotifications>;
}
