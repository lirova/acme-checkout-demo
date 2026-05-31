# acme-checkout

Cart pricing utilities for the Acme storefront — subtotal, discounts, tax, and full checkout totals.

```ts
import { checkoutTotal } from "./src/cart.js";
checkoutTotal(items, 20, 0.08); // subtotal, 20% off, +8% tax
```

Run the tests:

```sh
npm install
npm test
```
