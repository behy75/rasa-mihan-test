export class WebSocketService {
  private socket?: WebSocket;
  private isConnected: boolean = false;
  private reconnectInterval: number = 5000; // 5 seconds
  private maxRetries: number = 5;
  private retryCount: number = 0;
  private onOpenCallbacks: (() => void)[] = [];
  private onMessageCallback?: (event: MessageEvent) => void;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    // Check if the socket is already connected or connecting
    if (this.socket && this.isConnected) {
      console.log('Socket is already connected.');
      return;
    }

    if (this.socket && !this.isConnected) {
      console.log('Socket is reconnecting.');
      return;
    }

    // Create a new WebSocket connection
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.retryCount = 0;
      this.onOpenCallbacks.forEach(callback => callback());
      this.onOpenCallbacks = []; // Clear callbacks after successful connection
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event);
      }
    };

    this.socket.onclose = (event) => {
      this.isConnected = false;
      console.warn('WebSocket closed:', event.code, event.reason);

      // Only attempt to reconnect if we haven't reached the max retries
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.connect(), this.reconnectInterval);
      } else {
        console.error('Max retries reached. Could not reconnect to WebSocket.');
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.closeConnection(); // Close the socket to trigger the onclose handler
    };
  }

  subscribeToStream(streams: string[]) {
    const message = JSON.stringify({
      method: "SUBSCRIBE",
      params: streams,
      id: 1,
    });

    if (this.isConnected && this.socket) {
      this.socket.send(message);
    } else {
      this.onOpenCallbacks.push(() => {
        if (this.socket) {
          this.socket.send(message);
        }
      });
    }
  }

  unsubscribeFromStream(streams: string[]) {
    const message = JSON.stringify({
      method: "UNSUBSCRIBE",
      params: streams,
      id: 1,
    });

    if (this.isConnected && this.socket) {
      this.socket.send(message);
    } else {
      this.onOpenCallbacks.push(() => {
        if (this.socket) {
          this.socket.send(message);
        }
      });
    }
  }

  onMessage(callback: (event: MessageEvent) => void) {
    this.onMessageCallback = callback;
  }

  closeConnection() {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined; // Clear the reference to the socket
      this.isConnected = false;
    }
  }
}
