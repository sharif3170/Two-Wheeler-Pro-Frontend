import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <div className="refund-header">
        <h1>Refund Policy</h1>
        <p>Last Updated: September 28, 2025</p>
      </div>
      
      <div className="refund-content">
        <section className="refund-section">
          <h2>1. Returns</h2>
          <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
          <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
          <p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
          <p>Additional non-returnable items:</p>
          <ul>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Some health and personal care items</li>
          </ul>
        </section>
        
        <section className="refund-section">
          <h2>2. Refunds</h2>
          <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
          <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
        </section>
        
        <section className="refund-section">
          <h2>3. Late or Missing Refunds</h2>
          <p>If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
          <p>Next contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund yet, please contact us at support@twowheelerpro.com.</p>
        </section>
        
        <section className="refund-section">
          <h2>4. Sale Items</h2>
          <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>
        </section>
        
        <section className="refund-section">
          <h2>5. Exchanges</h2>
          <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@twowheelerpro.com and send your item to: 123 Exchange Street, Chennai, India 600001.</p>
        </section>
        
        <section className="refund-section">
          <h2>6. Digital Products</h2>
          <p>Due to the nature of digital products, we cannot offer refunds for:</p>
          <ul>
            <li>Downloaded software</li>
            <li>Accessed online courses</li>
            <li>Consumed digital content</li>
            <li>Activated licenses</li>
          </ul>
          <p>Exceptions may be made for technical issues that prevent access to the product.</p>
        </section>
        
        <section className="refund-section">
          <h2>7. Vehicle Purchases</h2>
          <p>For vehicle purchases made through our platform:</p>
          <ul>
            <li>A non-refundable deposit of 10% is required to secure your purchase</li>
            <li>Full payment must be completed within 7 days of deposit</li>
            <li>Cancellations after deposit payment are subject to a 5% processing fee</li>
            <li>Refunds for vehicle purchases are processed within 14 business days</li>
            <li>Vehicle condition must be maintained as received for return eligibility</li>
          </ul>
        </section>
        
        <section className="refund-section">
          <h2>8. Service Bookings</h2>
          <p>For service bookings (test rides, maintenance, etc.):</p>
          <ul>
            <li>Cancellations must be made at least 24 hours in advance for full refund</li>
            <li>Same-day cancellations are subject to a 50% cancellation fee</li>
            <li>No-shows will be charged the full service fee</li>
            <li>Rescheduling is allowed with 24 hours notice</li>
          </ul>
        </section>
        
        <section className="refund-section">
          <h2>9. Contact Information</h2>
          <p>If you have any questions about our Refund Policy, please contact us:</p>
          <p>Email: refunds@twowheelerpro.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Refund Street, Chennai, India 600001</p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;