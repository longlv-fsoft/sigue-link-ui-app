import { Injectable } from '@angular/core';
import { SocketEventType } from '@longlv91/training-common/dist';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';
import { SocketIoMsgType } from '../constants/socket.constant';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private clientSocket: any;
  clientSconnected$ = new BehaviorSubject<boolean>(false);
  pingResetTimeout: any;

  constructor() {
  }

  createConnection() {
    this.clientSocket = io('/', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      path: '/socket.io',
      transports: ['websocket'],
      rejectUnauthorized: false,
      withCredentials: true,
      rememberUpgrade: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            'X-HTTP-METHOD': 'GET',
            'X-HTTP-Method-Override': 'GET',
            'X-METHOD-OVERRIDE': 'GET',
            'authorization': 'Bearer '
          }
        }
      }
    });

    this.clientSocket.on(SocketIoMsgType.CONNECT, () => {
      this.clientSconnected$.next(true);
    });

    // catch exception event
    this.clientSocket.on(SocketIoMsgType.EXCEPTION, (data: any) => {
      console.log('exception', data);
    });
    // Catch disconnect event
    this.clientSocket.on(SocketIoMsgType.DISCONNECT, () => {
      console.log('Disconnected');
      clearInterval(this.pingResetTimeout);
    });
    return this.clientSocket;
  }

  joinRoom(room?: string) {
    this.clientSconnected$.subscribe(connected => {
      if (connected) {
        this.clientSocket.emit(SocketEventType.JOIN_ROOM, {room})
        // this.pingResetTimeout = setInterval(() => {
        //   this.clientSocket.emit(SocketEventType.PINGPONG, 'ping');
        // }, 10000);
      }
    })
  }

  leaveRoom(room?: string, user?: string) {
    this.clientSconnected$.subscribe(connected => {
      if (connected) {
        this.clientSocket.emit(SocketEventType.LEAVE_ROOM, {room, user})
      }
    })
  }

  sendMessage(room?: string, message?: string, owner?: string) {
    this.clientSocket.emit(SocketEventType.MESSAGE, {
      message: message,
      room: room,
      owner: owner
    })
  }

  disconnect() {
    if (this.clientSocket) {
      this.clientSocket.disconnect('io client disconnect');
      this.clientSconnected$.next(false);
    }
  }
}
