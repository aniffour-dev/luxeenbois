// app/api/send-order/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerInfo, orderItems } = body;

    // Create transporter with Gmail-specific settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certs
      }
    });

    // Verify connection configuration
    await transporter.verify();

    const htmlContent = `
      <h2>New Order Details</h2>
      <h3>Customer Information:</h3>
      <p>
        Name: ${customerInfo.name}<br>
        Email: ${customerInfo.email}<br>
        Phone: ${customerInfo.phone}<br>
        Address: ${customerInfo.address}
      </p>
      
      <h3>Order Items:</h3>
      ${orderItems.map((item: any) => `
        <div style="margin-bottom: 10px;">
          <p>
            Product: ${item.productName}<br>
            Color: ${item.color}<br>
            Quantity: ${item.quantity}<br>
            Price: ${item.price} MAD
          </p>
        </div>
      `).join('')}
      
      <h3>Total Amount: ${orderItems.reduce((acc: number, item: any) => 
        acc + (item.price * item.quantity), 0)} MAD</h3>
    `;

    const mailOptions = {
      from: {
        name: 'Your Store Name',
        address: process.env.SMTP_USER as string
      },
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order Received',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    return NextResponse.json({ 
      message: 'Order placed successfully',
      orderId: info.messageId 
    });

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}