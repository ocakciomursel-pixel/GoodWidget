import type { CitizenClaimWidgetEnvironment } from '@goodwidget/citizen-claim-widget'

// Identity/UBIScheme are deployed on development-celo and production-celo per
// GoodProtocol's releases/deployment.json — staging is intentionally never
// offered as a selectable option here, matching every other widget's control.
export const ENVIRONMENT_OPTIONS: CitizenClaimWidgetEnvironment[] = ['development', 'production']
