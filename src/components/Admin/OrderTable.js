import React, { useEffect, useState } from 'react'
import axios from 'axios'
const OrderTable = props => {
  const [orders, updateOrders] = useState([])

  const getOrders = async () => {
    const response = await axios.get('/api/admin/orders')
    //convert response to array of restaurant objects
    let ordersArray = []
    for (let i in response.data) {
      response.data[i].name = i
      ordersArray.push(response.data[i])
    }
    console.log(ordersArray)
    updateOrders(ordersArray)
  }
  useEffect(() => { getOrders() }, [])
  // useEffect(() => { console.log(orders) }, [orders])
  const map = orders.map((order,i) => { return <p key={i}>{order.name}</p> })
  return (
    <div>
      hello
      {map}
    </div>

  )
}
export default OrderTable
