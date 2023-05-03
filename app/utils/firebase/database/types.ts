export interface IDataBase {
  create(data: any): Promise<any>
  read(data: any): Promise<any>
  update(data: any): Promise<any>
  delete(data: any): Promise<any>
}
