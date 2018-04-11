Node With GraphQL

## Usage
Get All Customer Data.

{
  customers {
    name,
    email,
    age
  }
}
Get Singel Customer Data.

{
  customer(id:"1") {
    name
  }
}

Update Customer Data.

mutation{
  editcustomer(id:"gorbaOA",name:"Manzur",email:"asds@gmail.com",age:22){
    name,email,age
  }
}

Delete Customer Data.
{
mutation{
  deletecustomer(id:"1"){
    id
  }
}

Add Customer Data.
{
mutation{
  addcustomer(name:"Manzur",email:"asds@gmail.com",age:12){
    name,email,age
  }
}



## Installation

    npm install
    npm run runserver //For Run http Server
    npm run json:server //For run json server

## License

MIT.

