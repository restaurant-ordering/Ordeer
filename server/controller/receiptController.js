const nodemailer = require('nodemailer')
const { firebase } = require('../../src/firebase/firebase')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "ordeerapp@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD
  }
});

async function sendMail(req, res) {
  //get the restaurant email based on restaurant name in req.body
  const restaurantRef = await firebase.database().ref(`restaurants/${req.body.restaurant}`).child('email')
  const restaurantVal = await restaurantRef.once('value')
  const restaurantEmail = restaurantVal.val()
  const receipt = req.body.cart.map(item => {
    return (`<div><div> ${item.name}</div><div> ${item.customize || item.description}</div><div>${item.price}</div></div> <br />`)
  })
  const plainText = req.body.cart.map(item => {
    return (`${item.name} ${item.customize || item.description} ${item.price}`)
  })
  receipt.push(`<div>Total Price : ${req.body.price}</div>`)
  let customerMail = {
    from: `"Ordeer Admin" <"ordeerapp@gmail.com">`, // sender address
    to: `${req.body.user.email}`, // list of receivers
    subject: `Your order at ${req.body.restaurant} has been placed!`, // Subject line
    text: `${plainText.join('')}`, // display information from Receipt
    html: `${receipt.join('')}` // html body
  };
  let restaurantMail = {
    from: `"Ordeer Admin" <"ordeerapp@gmail.com">`, // sender address
    to: `${restaurantEmail}`, // list of receivers
    subject: `You have received an order from ${req.body.user.displayName}!`, // Subject line
    text: `${plainText.join('')}`, // display informatin from Receipt
    html: `${receipt.join('')}` // html body
  };
  // send mail with defined transport object
  await transporter.sendMail(customerMail)
  await transporter.sendMail(restaurantMail)

}


module.exports = {
  sendMail
}
