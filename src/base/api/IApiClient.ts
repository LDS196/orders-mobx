export default interface IApiClient {
  get: <T extends {}>(config: any) => any;
  post: <T extends {}>(config: any) => any;
  put: <T extends {}>(config: any) => any;
  delete: <T extends {}>(config: any) => any;
}
