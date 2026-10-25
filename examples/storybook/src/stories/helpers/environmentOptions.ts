import type { CitizenClaimWidgetEnvironment } from '@goodwidget/citizen-claim-widget'

/**
 * Shared Storybook environment options for widget Showcase controls.
 *
 * Identity and UBIScheme are deployed on development-celo and production-celo
 * per GoodProtocol's `releases/deployment.json` — `staging` is intentionally
 * never offered as a selectable option here.
 */
export const ENVIRONMENT_OPTIONS: CitizenClaimWidgetEnvironment[] = ['development', 'production']
