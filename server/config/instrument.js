// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://c93ccb84c55e1ae6e6a98328e0edde0e@o4509546042556416.ingest.us.sentry.io/4509546046423040",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});