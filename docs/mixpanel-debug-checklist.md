# Mixpanel Debug Checklist

1. Open the website locally or on the deployed site.
2. Open the browser DevTools console.
3. Confirm there are no Mixpanel runtime errors.
4. Confirm the development console reports that the analytics provider mounted.
5. Run:

   ```js
   window.upthrustTrackTestEvent()
   ```

6. Open the Network tab.
7. Filter requests by `mixpanel`, `/track`, or `api-js.mixpanel.com`.
8. Confirm a tracking request is sent.
9. Open Mixpanel Live View in the target Mixpanel project.
10. Confirm `Mixpanel Debug Test Event`, `Page Viewed`, and CTA events appear.

## Common Reasons Events Do Not Show

- The Mixpanel project token is wrong.
- `NEXT_PUBLIC_MIXPANEL_TOKEN` is missing in Vercel.
- The site was not redeployed after adding the Vercel environment variable.
- An ad blocker blocks Mixpanel requests.
- Browser privacy settings or Do Not Track settings block tracking.
- Events are filtered out in the Mixpanel UI.
- Live View is open on the wrong Mixpanel project.
- The Mixpanel project endpoint region does not match the SDK endpoint, such as EU vs US setup differences.
