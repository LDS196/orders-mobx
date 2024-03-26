import React from 'react';

import { OrderStore } from '~modules/order/OrderStore';

class RootStore {
  orderStore: OrderStore;

  constructor() {
    this.orderStore = new OrderStore();
  }

  init = async () => {
    await Promise.all(
      Object.values(this).map((store) => {
        return store?.init ? store?.init() : Promise.resolve();
      }),
    );
  };

  reset = async () => {
    await Promise.all(
      Object.values(this).map((store) => {
        return store.reset ? store.reset() : Promise.resolve();
      }),
    );
  };
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);