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


  toJsonLdShowedForAdress(): any {
    return {
      "@type": "sch:PostalAddress",
      "sch:addressCountry":  this.country,
      "sch:addressLocality": this.city,
      "sch:streetAddress": this.street,
      }
  }

}
