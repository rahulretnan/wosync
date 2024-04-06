import { EventOperation } from '../hasura/event-operation';

export enum StoreEvent {
  CreateStore = 'CREATE_STORE',
  UpdateStore = 'UPDATE_STORE',
  DeleteStore = 'DELETE_STORE',
}

export const StoreEventType: Record<EventOperation, StoreEvent> = {
  [EventOperation.INSERT]: StoreEvent.CreateStore,
  [EventOperation.UPDATE]: StoreEvent.UpdateStore,
  [EventOperation.DELETE]: StoreEvent.DeleteStore,
  [EventOperation.MANUAL]: StoreEvent.DeleteStore,
};
