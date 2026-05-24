# Mixpanel Debug Checklist

## Local Test

1. Add `.env.local`:

   ```bash
   NEXT_PUBLIC_MIXPANEL_TOKEN=your_project_token
   NEXT_PUBLIC_MIXPANEL_RESIDENCY=US
   ```

   If the Mixpanel project is EU, use:

   ```bash
   NEXT_PUBLIC_MIXPANEL_RESIDENCY=EU
   ```

   If the Mixpanel project is India, use:

   ```bash
   NEXT_PUBLIC_MIXPANEL_RESIDENCY=IN
   ```

2. Restart the dev server completely:

   ```bash
   Ctrl + C
   npm.cmd run dev
   ```

3. Open:

   ```text
   http://localhost:3000/debug/mixpanel
   ```

   Or if the site runs on 3001:

   ```text
   http://localhost:3001/debug/mixpanel
   ```

4. Confirm `Token present = true`.

5. Click `Send Mixpanel Test Event`.

6. Open DevTools -> Network.

7. Filter by:

   ```text
   mixpanel
   track
   api-js.mixpanel.com
   api-eu.mixpanel.com
   api-in.mixpanel.com
   ```

8. Confirm the request status is `200`.

9. Open Mixpanel -> Live View.

10. Confirm the event appears.

## HTTP Fallback Test

On `/debug/mixpanel`, click `Send HTTP Fallback Test Event`.

This sends a raw browser request to `${apiHost}/track` with event name `Mixpanel HTTP Fallback Test`.
If this succeeds but SDK events do not, the browser can reach Mixpanel and the issue is likely SDK initialization or browser blocking of SDK requests.

## If Token Present Is False

- `.env.local` is missing.
- The env variable name is wrong.
- The dev server was not restarted after editing `.env.local`.
- The code is not using `NEXT_PUBLIC_MIXPANEL_TOKEN` directly.

## If Request Status Is Blocked

- Disable ad blocker.
- Test in Chrome Incognito with extensions off.
- Test another browser.
- Check corporate or VPN firewall settings.

## If Request Is 200 But Event Does Not Show

- The Mixpanel project token is wrong.
- You are looking at the wrong Mixpanel project.
- The residency/API host is wrong.
- Live View has filters.
- There is an event ingestion delay.
- The project is not the one connected to the token.

## Vercel Setup

In Vercel:

```text
Project Settings -> Environment Variables
```

Add:

```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=actual Mixpanel project token
NEXT_PUBLIC_MIXPANEL_RESIDENCY=US
```

Use `EU` or `IN` instead of `US` when the Mixpanel project is in that residency.

Apply the variables to:

- Production
- Preview
- Development, if available

Then redeploy. Do not just refresh the current deployment. A redeploy is required for `NEXT_PUBLIC_*` variables to be baked into the browser bundle.
