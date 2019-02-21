import React, { useEffect, useState } from 'react'
import Navbar from '../../../Navbar/Navbar'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import "./Receipt.css"

const Receipt = props => {
	const [order, updateOrder] = useState('')
	const [redirect, activateRedirect] = useState(false)
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
		return (<Card className="receipt_card" key={i} > <div><Typography> {item.name}</Typography><Typography> {item.customize || item.description}</Typography><Typography>{item.price}</Typography></div> <br /></Card >)
	})

	console.log(order.cart)
	return (
		<>
			<Navbar />
			{/* display Order neatly */}
			<Card className="receipt_message"><Typography>You're order has been sent, you should receive an email shortly!</Typography></Card>
			{receipt}
			<Card className="receipt_total">Total Price : {order.cart && order.price}	<Button variant="text" color="secondary" className=" receipt_button" onClick={activateRedirect}>Place another order?</Button></Card>
			{redirect && <Redirect to="/home" />}
		</>
	)
}

export default Receipt
