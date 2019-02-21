import React, { useEffect, useState } from 'react'
import Navbar from '../../../Navbar/Navbar'
import axios from 'axios'

const Receipt = props => {
	const [order, updateOrder] = useState('')
	const filterlocation = () => {
		return props.location.pathname.split('/')[2]
	}
	console.log(props.location.pathname)
	const getOrderById = async () => {
		//filter pathname to just orderID
		let orderId = filterlocation()
		console.log(orderId)
		// get Order by ID in url
		let result = await axios.get('/api/orders?orderId=' + orderId)
		// update order with response
		updateOrder(result.data)
		axios.post('/api/receipt', result.data)
	}
	useEffect(() => {
		getOrderById()
		//git nodemailer endpoint
	}, [])
	const receipt = order.cart && order.cart.map((item, i) => {
		return (<div key={i}><div><div> {item.name}</div><div> {item.customize || item.description}</div><div>{item.price}</div></div> <br /></div>)
	})
	console.log(order.cart)
	return (
		<>
			<Navbar />
			{/* display Order neatly */}
			{receipt}
			{/* "You're order has been sent, you should receive an email at ${order.user} */}
			Total Price : {order.cart && order.price}
		</>
	)
}

export default Receipt
