const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,

} = require('graphql');

const CustomerType  = new GraphQLObjectType({
	name:'Customer',
	fields:() => ({
		id: {type:GraphQLString},
		name: {type:GraphQLString},
		email: {type:GraphQLString},
		age: {type:GraphQLInt}
	})
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryTyepe',
	fields:{
		customer:{ 
			type:CustomerType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parentValue,args){
				return axios.get('http://localhost:3000/customerData/'+args.id)
				.then(res => res.data)
			}
		},
		customers:{
			type:GraphQLList(CustomerType),
			resolve(parentValue,args){
				return axios.get('http://localhost:3000/customerData')
				.then(res => res.data)
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name:'mutation',
	fields:{
		addcustomer:{
			type:CustomerType,
			args:{
				name:{type:new GraphQLNonNull(GraphQLString)},
				email:{type:new GraphQLNonNull(GraphQLString)},
				age:{type:new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parentValue,args){
				return axios.post('http://localhost:3000/customerData',{
					name:args.name,
					email:args.email,
					age:args.age
				})
				.then(res => res.data)
			}
		},
		deletecustomer:{
			type:CustomerType,
			args:{
				id:{type:new GraphQLNonNull(GraphQLString)}
			},
			resolve(parentValue,args){
				return axios.delete('http://localhost:3000/customerData/'+args.id)
				.then(res => res.data)
			}
		},
		editcustomer:{
			type:CustomerType,
			args:{
				id:{type:new GraphQLNonNull(GraphQLString)},
				name:{type:GraphQLString},
				email:{type:GraphQLString},
				age:{type:GraphQLInt}
			},
			resolve(parentValue,args){
				return axios.patch('http://localhost:3000/customerData/'+args.id,args)
				.then(res => res.data)
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query:RootQuery,
	mutation
});