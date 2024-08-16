import { useState, useEffect, useRef, useCallback } from 'react';
import { WebSocketService } from '../services/WebSocketService';
import { TickerData } from '../interfaces/RealTimeDataInterfaces';

const useWebSocketData = (url: string, stream: string[]) => {
  const [data, setData] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);
  const socketServiceRef = useRef<WebSocketService | null>(null);

  // Memorize the handleMessage to avoid unnecessary re-renders
  const handleMessage = useCallback((event: MessageEvent) => {
    let parsedData: TickerData[] = [];
    try {
      const receivedData = JSON.parse(event.data);
      if (Array.isArray(receivedData)) {
        parsedData = receivedData as TickerData[];
      } else {
        console.error('Received data is not an array:', receivedData);
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }

    if (parsedData.length > 0) {
      setData((prevData) => {
        const newDataMap = new Map(parsedData.map((item) => [item.s, item]));

        const updatedData = prevData.map((item) =>
          newDataMap.has(item.s) ? newDataMap.get(item.s)! : item
        );

        const newItems = Array.from(newDataMap.values()).filter(
          (item) => !prevData.some((prevItem) => prevItem.s === item.s)
        );

        return [...updatedData, ...newItems];
      });
    }
    setLoading(false);
  }, []);

  // Initialize WebSocketService and handle connection
  useEffect(() => {
    if (!socketServiceRef.current) {
      socketServiceRef.current = new WebSocketService(url);
    }

    const socketService = socketServiceRef.current;

    if (socketService) {
      socketService.onMessage(handleMessage);
      socketService.subscribeToStream(stream);
    }

    return () => {
      if (socketService) {
        socketService.unsubscribeFromStream(stream);
        socketService.closeConnection();
        socketServiceRef.current = null;
      }
    };
  }, [handleMessage]);

  return { data, loading };
};

export default useWebSocketData;
