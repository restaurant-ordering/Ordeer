import React from 'react'
import Navbar from '../../../Navbar/Navbar'

const Receipt = props => {
	console.log(props.location.pathname)
	// const receiptID = props.location.pathname.split('/')[2]
	return (
		<>
		<Navbar/>
		</>
	)
}

export default Receipt