/**
 * GoodReserveWidget — Theme Overrides — demonstrates the widget's primitive
 * theming surface (`Card`/`Button` from `packages/ui`) as live color-picker
 * controls, following the StreamingWidget/StakingMigrationWidget Theme
 * overrides pattern for structure (CodeBlock + DocsCallout + live Canvas).
 *
 * This widget's own named sub-themes — `ReserveSwapShell`, `ReserveAmountCard`,
 * `ReserveSurface`, `ReserveSurfaceInner`, `ReserveDetailsTable`,
 * `ReserveTokenBadge`, `ReserveSwapDirectionButton`, `ReserveSettingsButton`,
 * `ReserveSuccessIcon`, `ReserveConfirmToBadge` (see
 * packages/goodreserve-widget/src/ReserveSwapView.tsx) — have no dedicated
 * `light_*`/`dark_*` presets in packages/ui/src/presets.ts. However,
 * `ReserveSwapShell` pins `backgroundColor: '$backgroundSurface'` and
 * `ReserveAmountCard` pins `backgroundColor: '$backgroundInput'` (with
 * `borderWidth: 0`), which outrank `dark_Card.background` /
 * `light_Card.background`. Accordingly, only `borderColor` is wired on
 * `dark_Card` / `light_Card` (matching StreamingWidget and
 * StakingMigrationWidget), which visibly themes the outer `ReserveSwapShell`
 * border alongside `dark_Button` / `light_Button` on the primary CTA.
 */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { GoodReserveWidget, type ReserveSwapWidgetProps } from '@goodwidget/goodreserve-widget'
import { createCustodialEip1193Provider } from '../../fixtures/custodialEip1193'
import { reserveWidgetMockStates } from '../../fixtures/goodReserveWidgetMock'
import { DocsCallout, DocsList } from '../docs/DocsLayout'

const provider = createCustodialEip1193Provider()

type ThemeOverrides = NonNullable<ReserveSwapWidgetProps['themeOverrides']>

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        background: '#0f172a',
        border: '1px solid rgba(59,130,246,0.28)',
        borderRadius: 12,
        color: '#e2e8f0',
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: 13,
        lineHeight: 1.6,
        margin: 0,
        overflowX: 'auto',
        padding: 18,
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  )
}

interface OverridesArgs {
  darkCardBorderColor: string
  lightCardBorderColor: string
  darkButtonBackground: string
  darkButtonBackgroundHover: string
  darkButtonColor: string
  lightButtonBackground: string
  lightButtonBackgroundHover: string
  lightButtonColor: string
}

function buildThemeOverrides(args: OverridesArgs): ThemeOverrides {
  return {
    themes: {
      dark_Card: {
        borderColor: args.darkCardBorderColor,
      },
      light_Card: {
        borderColor: args.lightCardBorderColor,
      },
      dark_Button: {
        background: args.darkButtonBackground,
        backgroundHover: args.darkButtonBackgroundHover,
        color: args.darkButtonColor,
      },
      light_Button: {
        background: args.lightButtonBackground,
        backgroundHover: args.lightButtonBackgroundHover,
        color: args.lightButtonColor,
      },
    },
  }
}

const meta: Meta<OverridesArgs> = {
  title: 'Widgets/GoodReserveWidget/Theme overrides',
  tags: ['integrator', 'showcase'],
  parameters: { layout: 'padded' },
  argTypes: {
    darkCardBorderColor: {
      control: 'color',
      description: 'themes.dark_Card.borderColor (reaches ReserveSwapShell outer border)',
    },
    lightCardBorderColor: {
      control: 'color',
      description: 'themes.light_Card.borderColor (reaches ReserveSwapShell outer border)',
    },
    darkButtonBackground: { control: 'color', description: 'themes.dark_Button.background' },
    darkButtonBackgroundHover: { control: 'color', description: 'themes.dark_Button.backgroundHover' },
    darkButtonColor: { control: 'color', description: 'themes.dark_Button.color' },
    lightButtonBackground: { control: 'color', description: 'themes.light_Button.background' },
    lightButtonBackgroundHover: { control: 'color', description: 'themes.light_Button.backgroundHover' },
    lightButtonColor: { control: 'color', description: 'themes.light_Button.color' },
  },
  args: {
    darkCardBorderColor: '#7C3AED',
    lightCardBorderColor: '#7C3AED',
    darkButtonBackground: '#7C3AED',
    darkButtonBackgroundHover: '#6D28D9',
    darkButtonColor: '#FFFFFF',
    lightButtonBackground: '#7C3AED',
    lightButtonBackgroundHover: '#6D28D9',
    lightButtonColor: '#FFFFFF',
  },
}
export default meta
type Story = StoryObj<OverridesArgs>

export const Playground: Story = {
  render: (args) => {
    const themeOverrides = buildThemeOverrides(args)
    return (
      <div style={{ display: 'grid', gap: 24, maxWidth: 960, margin: '0 auto' }}>
        <CodeBlock>
          {`<GoodReserveWidget\n  themeOverrides={${JSON.stringify(themeOverrides, null, 2)}}\n/>`}
        </CodeBlock>

        <DocsCallout title="All overridable paths on GoodReserveWidget" tone="info">
          <DocsList>
            <li>
              <strong>dark_Card / light_Card</strong>: borderColor wired to the controls above
              (demonstrated below on the outer `ReserveSwapShell` border). `ReserveSwapShell` and
              `ReserveAmountCard` pin `backgroundColor` to `$backgroundSurface` and
              `$backgroundInput` respectively in `ReserveSwapView.tsx:46-66` (and
              `ReserveAmountCard` sets `borderWidth: 0`), so `dark_Card.background` /
              `light_Card.background` is not exposed as a control here
            </li>
            <li>
              <strong>dark_Button / light_Button</strong>: background, backgroundHover,
              backgroundPress, backgroundFocus, color, borderColor, borderColorFocus, shadowColor —
              background, backgroundHover, and color wired to the controls above; demonstrated below
              on the primary CTA button
            </li>
            <li>
              <strong>
                dark_ReserveSwapShell / dark_ReserveAmountCard / dark_ReserveSurface / etc.
              </strong>
              : no dedicated preset exists for any named ReserveSwapView target (confirmed via
              packages/ui/src/presets.ts)
            </li>
          </DocsList>
        </DocsCallout>

        <DocsCallout title="Why two columns" tone="info">
          Each surface renders once in dark and once in light so every wired `light_*` control has a
          visibly-exercised counterpart, not just a paired value that happens to exist.
        </DocsCallout>

        <div>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>
            Idle-buy state — outer swap shell border and primary CTA button together
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <GoodReserveWidget
              provider={provider}
              mockState={reserveWidgetMockStates.idleBuy}
              defaultTheme="dark"
              themeOverrides={themeOverrides}
            />
            <GoodReserveWidget
              provider={provider}
              mockState={reserveWidgetMockStates.idleBuy}
              defaultTheme="light"
              themeOverrides={themeOverrides}
            />
          </div>
        </div>
      </div>
    )
  },
}
