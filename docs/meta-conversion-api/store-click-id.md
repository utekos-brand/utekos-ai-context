## Store ClickID

**Note**: Before storing ClickID it is crucial to format it as described in the [“Format ClickID”](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc#2-format-clickid) section above - it will ensure a valid value sent to Meta via the Conversions API.

### Set formatted ClickID in the `_fbc` cookie in the HTTP response

It is highly recommended to set `_fbc` as:

-   [HTTP cookie⁠](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExU1JjY2RzaDFLT2J2MERENHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6tV2iDKzngppbDPYzaicVM97C4Mnx7coGj18DepH6HHmAkwwVY-ieSTdYbcg_aem_Frp1sNA0e7SSiQ2Uj15YzA) in the HTTP response headers-   with the 90 days expiration time

once retrieved from the `fbclid` URL query parameter or the `_fbc` browser cookie.

Note, only set the cookie if:

-   \_fbc cookie doesn’t exist and ClickID was retrieved from the `fbclid` URL query parameter-   `fbclid` in the URL query parameter isn’t equal to the corresponding value in the `_fbc` cookie value. In the cookie, `fbclid` corresponds to the string after the last “.” in cookie value.

Example:

```
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie:
_fbc=fb.1.1709136167115.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk; Expires=Thu, 21 Oct 2021 07:28:00 GMT;
```

### Store formatted ClickID on the server

As an alternative to the cookie option above, you can store and manage the value of the formatted ClickID in your backend storage. In this case, you will need to ensure you store and send the most recent value obtained from the URL query parameter, if present.