# Page view triggers

Use Google Tag Manager's page view triggers to fire tags when pages are loaded in web browsers. There are five trigger types that are based on page load events, and each type has different criteria to determine when the trigger should fire. The order of precedence for page view triggers is as follows:

1. **Consent Initialization:** Designed to help ensure that consent settings are honored before any other triggers fire. The Consent Initialization trigger is used for tags that set or update the user consent state for your site, such as a Consent Management Platform tag or tags that set consent defaults. Each web container includes a **Consent Initialization - All Pages** trigger by default. The Consent Initialization trigger is not used for tags that should fire early on a site. For those cases, use an **Initialization** trigger. [Learn more about consent settings](https://support.google.com/tagmanager/answer/10718549).
2. **Initialization:** Designed to fire before all other triggers _except_ Consent Initialization triggers. Each web container includes an **Initialization - All Pages** trigger by default. Select this trigger to fire any tags that should fire before other triggers.
3. **Page View:** Fires immediately when the web browser begins to load a page. Use this option if you only need data generated from page impressions.
4. **DOM Ready:** Fires after the browser has finished constructing the full page in HTML and the [Document Object Model (DOM)](https://en.wikipedia.org/wiki/Document_Object_Model) is ready to be parsed. Pageview-based tags that interact with the DOM to populate variables should use this trigger type to ensure that the correct values are available to Tag Manager.
5. **Window Loaded:** Fires after the page has fully loaded, including any embedded resources such as images and scripts.

To create a new page view trigger:

1. Click **Triggers ![and then](//lh3.googleusercontent.com/QbWcYKta5vh_4-OgUeFmK-JOB0YgLLoGh69P478nE6mKdfpWQniiBabjF7FVoCVXI0g=h36) New**.
2. Click **Trigger Configuration** and choose a page view trigger type.
    
3. _Optional, but recommended to improve performance:_ Specify conditions (usually a URL pattern) for pages where you expect a click to occur:
    - Under the heading "**This trigger fires on**", select "**Some Events**".
    - Under "**Fire this trigger when an Event occurs and all of these conditions are true**", add a filter to enable this trigger only on pages that require it, e.g. **_Click URL contains /path/to/promo_**.
4. Save the trigger and publish.
