import { SendMailClient } from "zeptomail"
import dotenv from "dotenv"

dotenv.config('./.env')

const client = new SendMailClient({
  url: process.env.ZEPTO_URL, 
  token: process.env.ZEPTO_API_TOKEN
});

export const sendEmail = async ({ 
  to, 
  subject, 
  html, 
  templateAlias, 
  mergeInfo = {}, 
  name = "User", 
  fromName = "Floriva" 
}) => {
  try {

    const isTemplateEmail = !!templateAlias;
    const isManualEmail = !!html;

    if (!isTemplateEmail && !isManualEmail) {
      throw new Error("Either templateAlias or html content must be provided");
    }
    if (isTemplateEmail && isManualEmail) {
      throw new Error("Cannot use both templateAlias and html content. Choose one method.");
    }
    if (isManualEmail && !subject) {
      throw new Error("Subject is required for manual HTML emails");
    }

    const emailPayload = {
      from: {
        address: process.env.ZEPTO_FROM_EMAIL,
        name: fromName,
      },
      to: [
        {
          email_address: {
            address: to,
            name: name,
          },
        },
      ],
    };

    if (isTemplateEmail) {
      emailPayload.template_alias = templateAlias;
      emailPayload.merge_info = mergeInfo;
      
      if (subject) {
        emailPayload.subject = subject;
      }
      
      console.log("📧 Sending template email:", { to, templateAlias });
    } else {
      emailPayload.subject = subject;
      emailPayload.htmlbody = html;
      emailPayload.textbody = html
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log("📧 Sending manual HTML email:", { to, subject });
    }

    const response = await client.sendMail(emailPayload);
    
    console.log("📨 Email sent successfully:", {
      to,
      type: isTemplateEmail ? 'template' : 'manual',
      templateAlias: templateAlias || 'N/A',
      subject: subject || 'From Template',
      messageId: response?.data?.message_id || 'N/A',
      fullResponse: response
    });
    
    return response;
  } catch (err) {
    console.error("❌ Failed to send email - Full Error Details:", {
      to,
      type: templateAlias ? 'template' : 'manual',
      templateAlias: templateAlias || 'N/A',
      subject: subject,
      name: name,
      errorMessage: err?.message || 'No error message',
      errorName: err?.name || 'Unknown error',
      errorCode: err?.code || 'No error code',
      errorStack: err?.stack || 'No stack trace',
      fullError: err,
      response: err?.response?.data || 'No response data',
      status: err?.response?.status || 'No status',
      statusText: err?.response?.statusText || 'No status text',
      headers: err?.response?.headers || 'No headers'
    });
    
    let errorMessage = 'Unknown email sending error';
    
    if (err?.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err?.response?.data?.error) {
      errorMessage = err.response.data.error;
    } else if (err?.message) {
      errorMessage = err.message;
    } else if (err?.response?.statusText) {
      errorMessage = `HTTP ${err.response.status}: ${err.response.statusText}`;
    }
    
    throw new Error(`Email sending failed: ${errorMessage}`);
  }
};