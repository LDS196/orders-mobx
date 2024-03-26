export interface IBaseStore {
  init?: () => void; // called at app start
  reset: () => void; // called at logout
}
