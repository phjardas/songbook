import { createContext, type ReactNode, useContext, useState } from 'react';

export interface NotificationProps {
  message: string;
  autoHideDuration?: number;
  onClose?: () => void;
}

interface Notification extends NotificationProps {
  id: number;
  onClose: () => void;
}

interface NotificationsContext {
  notification: Notification | null;
  addNotification: (props: NotificationProps) => void;
}

const Context = createContext<NotificationsContext | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const addNotification = (props: NotificationProps) =>
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

export function useNotifications() {
  const context = useContext(Context);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
}
