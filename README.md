# Mailchimp Marketing + Wholesale Website Simulation
[Developer Manual](#my-custom-anchor-point)
### Description of Project

This project combines a marketing email campaign flyer with an application meant to emulate the website meant for customers to complete purchases and orders. The site is built using HTML, CSS, JavaScript, and integrates with Supabase for data storage and Vercel for deployment. There is also an information page created to inform the user on the functionality and the information collected through the MailChimp Campaign. Both the information page and the web page are accessible through the email that will be sent out.

### Description of Target Browsers

Because the project involves email marketing, the target browsers would be current versions of Chrome, Firefox, and Safari. Whether it be through desktop or mobile, the app should be accessible and functional at all times.


---
<a name="my-custom-anchor-point"></a>
## Developer Manual

### Applications and Dependencies

The project utilizes a web application deployed on Vercel that will be linked within a MailChimp marketing campaign.
In order to make changes to the project, the prequisites necessary are:
- Node.js: https://nodejs.org/en
- Vercel
- Cloned GitHub Repo:
  ```
  git clone https://github.com/jasonjsha/mailchimp-marketing-project.git
  cd mailchimp-marketing-project
  ```
- Supabase
- MailChimp Account

### How to Run or Make Changes
1. Create MailChimp Campaign and format flyer as desired.
2. In order to change Webpage or Information page, clone repository and push changes as needed.
3. Once code within GitHub is finalized, link repository to Vercel project and deploy with necessary settings.
4. Set up the Supabase tables using the SQL script:
```
DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  case_price NUMERIC(10,2) NOT NULL,
  units_per_case INTEGER NOT NULL,
  image TEXT
);

CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  cart_contents JSONB
);

INSERT INTO products (name, case_price, units_per_case, image) VALUES
('NESCAFE COFFEE TRADITIONAL', 25.50, 12, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210504-120635-NESCAFE_COFFEE_TRADITIONAL_STRONG_230G.png'),
('PALMOLIVE DISH 5L', 22.00, 4, 'https://app.verybestusa.com/media/_images/large/DSH-244.jpg'),
('GRAND POTATO CHIPS 3.17OZ (SOUR CREAM & ONION)', 13.50, 16, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-115043-GRAND%20POTATO%20CHIPS%20SOUR%20CREAM%20ONION.jpg'),
('GRAND POTATO CHIPS 3.17OZ (WASABI)', 13.50, 16, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210909-113205-GRAND%20POTATO%20CHIPS%20WASABI.jpg'),
('GRAND POTATO CHIPS 3.17OZ (SEA SALT)', 13.50, 16, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-114749-GRAND%20POTATO%20CHIPS%20SEA%20SALT.jpg'),
('GRAND POTATO CHIPS 3.17OZ (CHEESE & ONION)', 13.50, 16, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-115034-GRAND%20POTATO%20CHEESE%20ONION.jpg'),
('GRAND POTATO CHIPS 3.17OZ (BBQ)', 13.50, 16, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210909-113156-GRAND%20POTATO%20CHIPS%20BBQ.jpg'),
('NESTLE MILO POWDER 1.5KG', 36.00, 6, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210406-111900-GRO-617.jpg'),
('COSBY NATURAL DRAJELI MIX TOY W/STAND', 240.80, 140, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210503-123634-COSBY%20MIX%20TOY%20STAND%20DISPLAY.jpg'),
('COSBY BLOCK RENKLI KRISTAL EGG W/STAND', 136.80, 144, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20220203-155707-COSBY%20KRISTAL%20EGG%20DISPLAY.jpg'),
('COSBY EGG FUN BLOCK STAND', 240.80, 128, 'https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20220203-155513-COSBY%20FUN%20BLOCK%20EGG%20DISPLAY.jpg');
```
5. Get API Key and Supabase URL and integrate into Vercel.
6. Send out MailChimp Campaign
7. Utilize Analytics

## Testing
The project does not include any automated testing. To test that the project is functioning as intended:
1. Visit deployed webpage through Vercel to ensure that product grid loads as intended.
2. Add items to cart (item should be added in cart at bottom, and notifications should appear)
3. Click "Place Order" button and ensure that Supabase correctly records data in visits table.
4. Check MailChimp Campaign to ensure that it correctly leads to webpage.

### API for Server Application

#### /api/products
- **Method**: `GET`
- **Returns**: Array of product data from Supabase `products` table

#### /api/trackVisit
- **Method**: `POST`
- **Purpose**: Logs page views in `visits` table

#### `/api/logCart`
- **Method**: `POST`
- **Purpose**: Records a cart submission into the `visits` table

### Known Bugs and Future Developments

  A known flaw that is present within the project is the graph within the information page. Because then nature of the project and the fact that real data has not yet been collected, it is currently populated with placeholder data that is in no way accurate. This data is expected to be replaced with live information that is collected through customer analytics.
  A future development that could be integrated into the project is to better suit the marketing campaign to mobile devices. The flyer and webpage are currently optimized for desktop devices but not for its smaller counterpart.

### Necessary Attachments
[Link to Email](https://mailchi.mp/bd649b16dfe3/new-products-10335206)
