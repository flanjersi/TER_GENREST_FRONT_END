
export class OperatingSystem {
  public id: number;

  public name: string;

  public nameFolder: string;

  constructor(data?: any){
    if(data){
      this.id             = data.id;
      this.name           = data.name;
      this.nameFolder     = data.nameFolder;
    }
  }
}
