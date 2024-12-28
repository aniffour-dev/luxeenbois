// app/api/send-order/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerInfo, orderItems } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Format order details for email
    const orderDetails = orderItems.map((item: any) => `
      Product: ${item.productName}
      Color: ${item.color}
      Quantity: ${item.quantity}
      Price: ${item.price} MAD
    `).join('\n');

    // Calculate total
    const totalAmount = orderItems.reduce((acc: number, item: any) => 
      acc + (item.price * item.quantity), 0);

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order Received',
      text: `
        New order received:

        Customer Information:
        Name: ${customerInfo.name}
        Email: ${customerInfo.email}
        Phone: ${customerInfo.phone}
        Address: ${customerInfo.address}

        Order Details:
        ${orderDetails}

        Total Amount: ${totalAmount} MAD
      `,
    });

    return NextResponse.json(
      { message: 'Order placed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { message: 'Failed to place order' },
      { status: 500 }
    );
  }
}