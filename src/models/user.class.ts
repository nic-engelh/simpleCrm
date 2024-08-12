export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  street2: string;
  zipCode: number;
  city: string;
  email: string;
  company: string;
  id: string;



  constructor(obj?:any) {
    this.firstName = obj ? obj.firstName : "";
    this.lastName = obj ? obj.lastName : "";
    this.birthDate = obj ? obj.birthDate: "";
    this.street = obj ? obj.street: "";
    this.street2 = obj ? obj.street: "";
    this.zipCode = obj ? obj.zipCode: "";
    this.city = obj ? obj.city: "";
    this.email = obj ? obj.email: "";
    this.company = obj ? obj.company: "";
    this.id = obj ? obj.id: "";
  }
}
