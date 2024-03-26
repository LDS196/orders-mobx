import PaginationModel from '../models/PaginationModel';

export interface IPaginationList<T, P = PaginationModel> {
  items: T[];
  pagination: P;
}
