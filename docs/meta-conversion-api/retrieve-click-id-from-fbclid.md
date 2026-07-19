## Retrieve Meta ClickID

### Retrieve from `fbclid` URL query parameter

Whenever present in the URL query parameters, try to obtain the parameter server-side by reading it from the HTTP request URL’s query string.

Example:

```
GET /?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk
HTTP/2.0
Host: www.example.org
```

**Note**: ClickID value is case sensitive - do not apply any modifications before using, such as lower or upper case.

### Retrieve from `_fbc` cookie

ClickID value is available within `_fbc` cookie in 2 cases:

-   Meta Pixel is installed on the website. In this case, Meta Pixel automatically stores ClickID value in the `_fbc` browser cookie once available-   You already store it in the cookie from the server or in backend storage, following the best practices listed in the “Store ClickID” section

In both these cases formatted ClickID can be obtained from the `_fbc` cookie by reading the Cookie headers of the HTTP request. 