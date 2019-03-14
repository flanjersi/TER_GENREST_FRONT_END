export  class  Address {

  public  street: string;
  public city: string;
  public country: string;

  constructor(data?: any){

    if (data) {
      this.street = data.street;
      this.city = data.city;
      this.country = data.country;

    }
  }

}
