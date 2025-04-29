const nodemailer = require('nodemailer');

exports.completeOrder = async (req, res) => {
  const { cartItems, customerDetails, totalAmount } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAILPASS, 
      },
    });

    const itemsHtml = cartItems.map(item =>
      `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.ORDER_RECEIVER_EMAIL,
      subject: 'New Order Received!',
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${customerDetails.name}</p>
        <p><strong>Email:</strong> ${customerDetails.email}</p>
        <p><strong>Address:</strong> ${customerDetails.address}</p>
        <h3>Items Ordered:</h3>
        <ul>${itemsHtml}</ul>
        <h3>Total: $${totalAmount.toFixed(2)}</h3>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order email sent successfully.' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ error: 'Failed to send order email.' });
  }
};
