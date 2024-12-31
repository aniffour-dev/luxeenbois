import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// Google Sheets configuration (replace with your actual values)
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

interface OrderItem {
  productName: string;
  color: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Function to format date as DD/MM/YYYY
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to append data to Google Sheets
async function appendToGoogleSheet(orderData: any) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Fix newlines in private key
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = GOOGLE_SHEET_ID;
  const sheetName = "COD LUXE EN BOIS";
  const range = `${sheetName}!A2`; // Start appending from the second row

  const request = {
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    resource: {
      values: [
        [
          formatDate(new Date()), // Formatted Timestamp
          orderData.name,
          orderData.email,
          orderData.phone,
          orderData.address,
          orderData.orderItems.map((item: any) => `${item.productName} (x${item.quantity})`).join(", "),
          orderData.orderItems.map((item: any) => item.color).join(", "),
          orderData.orderItems.map((item: any) => item.quantity).join(", "),
          orderData.orderItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0), // Total Price
          "Pending", // Order Status - Ensure this matches one of the dropdown options
        ],
      ],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    throw new Error("Failed to add data to Google Sheets");
  }
}

export async function POST(request: Request) {
  try {
    const { customerInfo, orderItems }: { customerInfo: CustomerInfo; orderItems: OrderItem[] } = await request.json();

    // Send email to the admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string, 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: {
        name: "Your Store Name",
        address: process.env.SMTP_USER as string,
      },
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      html: `
        <h2>New Order Details</h2>
        <h3>Customer Information:</h3>
        <p>
          Name: ${customerInfo.name}<br>
          Email: ${customerInfo.email}<br>
          Phone: ${customerInfo.phone}<br>
          Address: ${customerInfo.address}
        </p>
        <h3>Order Items:</h3>
        ${orderItems
          .map(
            (item) => `
            <div style="margin-bottom: 10px;">
              <p>
                Product: ${item.productName}<br>
                Color: ${item.color}<br>
                Quantity: ${item.quantity}<br>
                Price: ${item.price} MAD
              </p>
            </div>
          `
          )
          .join("")}
        <h3>Total Amount: ${orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} MAD</h3>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Append to Google Sheets
    await appendToGoogleSheet({ ...customerInfo, orderItems });

    return NextResponse.json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ message: "Failed to process the order." }, { status: 500 });
  }
}
