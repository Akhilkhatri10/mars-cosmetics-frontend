import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyHeader from "@/components/StickyHeader";

const policyContent = {
    "privacy-policy": {
        title: "Privacy Policy",
        content: `Effective Date: December 29, 2022

1. Introduction: This Privacy Policy articulates the practices and principles MARS Cosmetics adheres to in safeguarding your privacy and managing the personal information we collect through our website. This policy is in strict compliance with the prevailing laws under the Information Technology Act, 2000, the Personal Data Protection Bill, and other relevant regulations within the jurisdiction of India.

2. Scope of the Policy: This Privacy Policy applies exclusively to information collected via the MARS Cosmetics website. It does not govern or apply to information collected or used by MARS Cosmetics through other means.

3. Collection and Use of Personal Information:

Personal Information: Includes, but is not limited to, name, contact details, and demographic information collected for the purposes of fulfilling service requests and enhancing user engagement.

Usage Information: Pertains to customer activities on our website, utilized to improve site functionality and service offerings.

4. Basis for Processing Personal Information: The processing of personal data is based on explicit consent from the user, compliance with our contractual obligations, legal requirements, or legitimate interests as detailed under applicable laws.

5. Confidentiality and Security: We are committed to protecting the security and confidentiality of your personal data. Adequate technological and administrative measures are implemented to prevent unauthorized access, disclosure, alteration, or destruction of information.

6. Disclosure of Personal Information: We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so. Aggregate or de-identified data may be shared with trusted partners to assist in business operations and improvements without revealing individual identities.

7. Legal Rights and Responsibilities

User Rights: Users have the right to access their data, request correction or deletion, and withdraw consent for data use.

Company Rights and Responsibilities: MARS Cosmetics retains the right to use data as necessary for business operations and legal compliance in ways that do not infringe on user privacy as per the stipulated terms.

8. Amendments to the Privacy Policy: This Privacy Policy may be updated or amended at MARS Cosmetics’ discretion, reflecting changes in legal standards or business practices. Any amendments will be effective immediately upon the posting of the revised policy on the website.

9. Governing Law: This Privacy Policy is governed by and construed in accordance with the laws of India, and any disputes relating to it are subject to the jurisdiction of the courts in India.

10. Contact Information: For any privacy-specific concerns or questions regarding this policy, please contact:

Email: abhishek@marscosmetics.in

Physical Address: 4th Floor, Unit No.: 401, Pitampura, D-Mall, Plot No. A-1, Netaji Subhash Place, New Delhi -110034

Last Updated on 14.07.2024 by MARS Cosmetics, India`,
    },

    "refund-policy": {
        title: "Refund Policy",
        content: `————
No Returns/Exchange Accepted Unless & Otherwise :
1. There's a manufacturing defect.
2.  Incorrect items are shipped.
3. Heavy damage in the transit of product.
4. For CoD orders, replacement is provided and refund is not issued. 
————

Before starting the complaint process please note the following points

Please note that we would require a proper unboxing video with clear focus on the unbroken seal with your complaint as a proof, also please inform us at Support@marscosmetics.in within 48 hours of delivery of the product. If the defect or damage or incorrect product received has not been communicated to us within 48 hours of receipt of the product(s), We shall not be held responsible for failure to provide a refund or replacement of the product.

For any other Return/Replacement related queries you can contact us at Support@marscosmetics.in

————

Refund and Cancellation for Service Provider Company due to service providers in nature “NO REFUND”,“NO CANCELLATION” will be entertained once the Payment has been made.

Cancellation Policy
We can process cancellation requests only before the order is prepared for shipping or dispatched. Once the order is ready to ship, cancellation is no longer possible.

Shipping & Delivery Policies -
MARS Cosmetics ships its products to almost all parts of India through it's verified vendor :-

MARS Cosmetics PVT LTD,

Address
Basement pkt-g, plot no. 198, sector 3, Bawana DSIDC, North Delhi, 110039

Orders placed will be shipped within 24-48 working hours. We ship on all days except Sunday and National Holidays.
For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days of shipping (business days exclude Sundays and other holidays). For other areas the products will be shipped which may take 1-2 weeks depending on location. At times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which MARS Cosmetics PVT LTD is not liable and would request its users to cooperate as MARS Cosmetics PVT LTD continuously tries to nought such instances. Also, MARS Cosmetics PVT LTD reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.

Contact Us:-
MARS Cosmetics (Legal Name - Rome India)

Name of the Grievance Officer  - Abhishek Sethia
Email of Grievance Officer - abhishek@marscosmetics.in`,
    },

    "shipping-policy": {
        title: "Shipping Policy",
        content: `Shipping Charges and Policy

At MARS Cosmetics, delivering goods securely and affordably is our priority. Our flat shipping charges policy ensures transparency with no hidden fees. Please note that we deliver only within India.

Prepaid Orders:

Orders below ₹500: Shipping Fee - ₹39
Orders ₹500 and above: Free Shipping

Cash on Delivery (CoD) Orders:

Orders below ₹500: Shipping Fee - ₹79
Orders ₹500 and above: ₹39

Terms and Conditions

Service Area: MARS Cosmetics ships products only within India. International shipping is not available.

Shipping Timeline: Orders are processed and dispatched within 24-48 hours of order placement, excluding Sundays and national holidays.
Delivery typically occurs within 3-4 business days for areas serviced by reputed couriers. For remote areas, delivery may take 1-2 weeks.

Shipping and Handling: All orders are carefully packed to ensure product integrity during transit.
Customers will receive a tracking number via email once the order is shipped.

Delays and Force Majeure: MARS Cosmetics is not liable for delays caused by unforeseen events beyond our control, such as natural disasters, strikes, or logistical challenges. We request customers to be patient during such times.

Cancellation by MARS Cosmetics: MARS Cosmetics reserves the right to cancel orders at its sole discretion, particularly in cases where delivery is excessively delayed or the shipment is untraceable. In such cases, the customer will be refunded the full amount paid.

Customer Responsibilities: Customers must provide accurate shipping information at the time of order placement. MARS Cosmetics is not responsible for delays or delivery failures due to incorrect information provided by customers.
Customers should ensure someone is available to receive the package at the provided address.

Receipt and Inspection: Upon receiving the order, customers should inspect the package for any damage.
In case of any damage or discrepancy, customers should report it to info@marscosmetics.in within 48 hours along with an unboxing video.

Legal Compliance: This policy is framed in accordance with the Indian Constitution and Corporate Law. MARS Cosmetics reserves the right to amend this policy to ensure compliance with legal and regulatory requirements.

Limitation of Liability: MARS Cosmetics and its shipping partners shall not be liable for any indirect, incidental, or consequential damages arising from the use of our shipping services.

Changes to Shipping Policy: MARS Cosmetics reserves the right to update or modify this policy at any time without prior notice. The updated policy will be effective as of the date of posting on our website.

Grievance Officer:

Name: Abhishek Sethia
Email: abhishek@marscosmetics.in

Customer Support:

Email: support@marscosmetics.in
By placing an order with MARS Cosmetics, customers agree to comply with this shipping policy`,
    },

    "terms-of-service": {
        title: "Terms of Service",
        content: `Introduction: By accessing marscosmetics.in, you agree to these Terms of Service. MARS Cosmetics, headquartered in New Delhi, reserves the right to refuse registration or service.

Eligibility: Services are for individuals who can form legally binding contracts under Indian law. Minors must use the site under parental supervision.

Account Registration:

Provide accurate information.
Maintain account confidentiality.
Report unauthorized use immediately.
You are responsible for all activities under your account.
Product Information and Pricing:

Errors may occur despite our efforts for accuracy.
Prices and availability can change without notice.
Discounts and offers are subject to terms and can be withdrawn without notice.
Orders and Payment:

Orders are subject to acceptance and availability.
We reserve the right to refuse or cancel orders.
Payments via specified methods are handled by authorized gateways.
Shipping and Delivery:

Refer to our Shipping Policy 
We are not liable for delays due to unforeseen circumstances.
Accurate shipping details are required.
Returns and Refunds:

Refer to our Refund Policy
Refunds are issued under specific conditions.
Inspect packages upon delivery and report issues immediately.
Intellectual Property:

Site content is protected by copyright and other laws.
Unauthorized use, reproduction, or distribution is prohibited.
User Conduct:

No unlawful activities.
Do not upload harmful or offensive content.
Limitation of Liability:

Not liable for indirect, incidental, or consequential damages.
Liability limited to the product's purchase amount.
Indemnification: Users indemnify MARS Cosmetics against claims or damages from site use or term violations.

Privacy Policy:

Refer to our Privacy Policy
Users consent to data collection and usage terms.
Changes to Terms of Service: Terms can be updated at any time. Changes are effective upon posting on our website.

Governing Law: Governed by Indian law. Disputes are under New Delhi jurisdiction.

Contact Information:

Grievance Officer: Abhishek Sethia (abhishek@marscosmetics.in)
Customer Support: support@marscosmetics.in

Additional Notes: Products are for personal/professional use only, not for resale.

Allergies: read ingredient statements before use.

Payments: via UPI, Credit/Debit Cards, Net Banking, Wallets, e-Gift cards, reward points, and select CoD.

Shipping: Orders shipped within 1-2 days; delivery in 2-5 days. Flat shipping charges apply within India.

Order Cancellations: Right to cancel orders due to errors, fraud, or technical issues. Refunds processed within 15 days.

Offers: Valid on select products, not combinable with other offers. Complimentary gifts not applicable.

By using our services, you agree to these terms. MARS Cosmetics may update these terms at any time without prior notice.`,
    },

    "subscription-policy": {
        title: "Cancellation Policy",
        content: `Return & Refund

No Returns/Exchange Accepted Unless & Otherwise :
1. There's a manufacturing defect.
2. Incorrect items are shipped.
3. Heavy damage in the transit of product.

Refund and Cancellation for Service Provider Company

Due to service providers in nature “NO REFUND”,“NO CANCELLATION” will be entertained once the Payment has been made.

Cancellation Policy:
Please note an order can only be canceled within 24 hours of placing the order. Once the order is processed after 24 hours, no cancellation request will be entertained. However return is possible for all orders/products.
OR
Customers can CANCEL order only before the Order has been shipped/Dispatched. After the Product/s have been shipped, The Customer CANNOT Cancel the Orders. However return is possible for all orders/products.

Shipping & Delivery Policies 
MARS Cosmetics ships its products to almost all parts of India through it's verified vendor :-

MARS Cosmetics PVT LTD,

Address
BASEMENT, 198, POCKET G, SECTOR-3, BAWANA
INDUSTRIAL AREA, North West Delhi, Delhi, 110039

Orders placed will be shipped within 24* hrs. We ship on all days except Sunday and National Holidays.
For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days of shipping (business days exclude Sundays and other holidays). For other areas the products will be shipped which may take 1-2 weeks depending on location.

At times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which MARS Cosmetics PVT LTD is not liable and would request its users to cooperate as MARS Cosmetics PVT LTD continuously tries to nought such instances. Also, MARS Cosmetics PVT LTD reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.

Contact Us:
MARS Cosmetics (Legal Name - Rome India)
801, D Mall, Netaji Subhash Place, Delhi - 34
abhishek@marscosmetics.in`,
    },
};

const PolicyPage = () => {
    const { policySlug } = useParams();

    const policy = policyContent[policySlug];

    if (!policy) {
        return (
            <>
                {/* <Navbar /> */}
                <StickyHeader />

                <div className="min-h-screen flex items-center justify-center text-gray-600">
                    Policy not found.
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div
                className="
    max-w-3xl 2xl:max-w-4xl
    mx-auto
    px-4 sm:px-6 md:px-8
    py-12 sm:py-16 lg:py-20
  "
            >
                <h1
                    className="
      text-center
      text-[#1c1b47]
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl
      font-bold
      mb-6
    "
                >
                    {policy.title}
                </h1>

                <p
                    className="
      whitespace-pre-line
      text-[#1c1b47]
      font-medium
      text-left sm:text-justify
      text-base sm:text-lg lg:text-xl
      leading-relaxed lg:leading-tight
    "
                >
                    {policy.content}
                </p>
            </div>


            <Footer />
        </>
    );
};

export default PolicyPage;
