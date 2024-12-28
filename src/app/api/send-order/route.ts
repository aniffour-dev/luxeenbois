// app/api/send-order/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerInfo, orderItems } = body;

    // Create Gmail-specific transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Use 'gmail' service instead of manual host/port
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Format the email content
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

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Order Received',
        html: htmlContent,
      });

      console.log('Message sent: %s', info.messageId);
      return NextResponse.json({ 
        message: 'Order placed successfully',
        orderId: info.messageId 
      });
      
    } catch (emailError: any) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { message: `Email sending failed: ${emailError.message}` },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}