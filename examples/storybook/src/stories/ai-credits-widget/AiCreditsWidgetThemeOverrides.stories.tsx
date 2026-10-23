/**
 * AiCreditsWidget — Theme Overrides — demonstrates the widget's primitive
 * theming surface (`Card`/`Button` from `packages/ui`) as live color-picker
 * controls, following the StreamingWidget/GoodReserveWidget Theme overrides
 * pattern for structure (CodeBlock + DocsCallout + live Canvas).
 *
 * This widget's own named sub-components — `AiCreditsStatusNotice`,
 * `BonusBadgeFrame` (see packages/ai-credits-widget/src/components/theme/cards.ts)
 * — have no dedicated `light_*`/`dark_*` presets in packages/ui/src/presets.ts
 * (confirmed via grep). Note, however, how the two cards in the quote-ready
 * view differ:
 *  - `AiCreditsHero` (packages/ai-credits-widget/src/components/buy/AiCreditsHero.tsx:52)
 *    explicitly passes `backgroundColor="$backgroundSurface"` on its `<Card>`,
 *    which outranks `dark_Card.background` / `light_Card.background`; it only
 *    picks up `dark_Card.borderColor` / `light_Card.borderColor`.
 *  - `AmountPicker` below it (packages/ai-credits-widget/src/components/buy/AmountPicker.tsx)
 *    renders a plain `<Card>` with no inline `backgroundColor` override, so both
 *    `dark_Card.background` / `light_Card.background` and `borderColor` reach it,
 *    alongside the plain primary `<Button>` inside `AmountPicker`.
 */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  AiCreditsWidget,
  type AiCreditsWidgetAdapterFactory,
  type AiCreditsWidgetAdapterState,
} from '@goodwidget/ai-credits-widget'
import { createCustodialEip1193Provider } from '../../fixtures/custodialEip1193'
import { DocsCallout, DocsList } from '../docs/DocsLayout'

const provider = createCustodialEip1193Provider()

// Mirrors the quote-ready fixture state used by AiCreditsWidgetQA.stories.tsx's
// QuoteReady story, so this Playground renders the same Hero-card + AmountPicker-card
// + Buy-button surface as that reference fixture.
function createQuoteReadyAdapterFactory(): AiCreditsWidgetAdapterFactory {
  return () => {
    const state: AiCreditsWidgetAdapterState = {
      status: 'quote_ready',
      address: '0x329377cbeeF39f01b0Ea04B80465c9eB47D3ED1',
      chainId: 42220,
      gBalance: '42.50',
      gdUsdPerToken: 0.0015,
      totalCreditUsd: null,
      totalBonusUsd: null,
      isGoodIdVerified: false,
      signerPubKey: '0xabcdef1234567890abcdef1234567890abcdef12',
      signerPrvKey: null,
      operatorSignature: null,
      operatorConsented: true,
      operatorConsentPending: false,
      operatorAddress: null,
      currentOperator: null,
      minDepositUsd: '1.00',
      minStreamUsd: '1.00',
      totalGdDepositedG: null,
      monthlyStreamG: null,
      withdrawableUsd: null,
      depositBonusPercent: 10,
      streamBonusPercent: 20,
      error: null,
      activeTab: 'buy',
      signers: [],
      derivedSignerAddress: null,
    }
    return {
      state,
      actions: {
        connect: async () => {},
        switchChain: async () => {},
        generateSignerKey: async () => {},
        selectSigner: async () => {},
        discoverSigners: () => {},
        importSignerFromPrivateKey: async () => state.signerPubKey,
        applyDeepLinkSigner: async () => {},
        signOperatorConsent: async () => {},
        revokeOperatorConsent: async () => {},
        syncOperatorConsentFromChain: async () => {},
        buildQuote: async (depositG, streamG) => ({
          depositAmountG: depositG,
          streamAmountG: streamG,
        }),
        pay: async () => {},
        refresh: async () => {},
        verifyGoodId: async () => false,
        startPurchase: () => {},
        setActiveTab: () => {},
        closeChannel: async () => {},
        withdrawCredits: async () => {},
        retry: async () => {},
      },
    }
  }
}

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
  darkCardBackground: string
  darkCardBorderColor: string
  lightCardBackground: string
  lightCardBorderColor: string
  darkButtonBackground: string
  darkButtonBackgroundHover: string
  darkButtonColor: string
  lightButtonBackground: string
  lightButtonBackgroundHover: string
  lightButtonColor: string
}

function buildThemeOverrides(args: OverridesArgs) {
  return {
    themes: {
      dark_Card: {
        background: args.darkCardBackground,
        borderColor: args.darkCardBorderColor,
      },
      light_Card: {
        background: args.lightCardBackground,
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
  title: 'Widgets/AiCreditsWidget/Theme overrides',
  tags: ['integrator', 'showcase'],
  parameters: { layout: 'padded' },
  argTypes: {
    darkCardBackground: {
      control: 'color',
      description: 'themes.dark_Card.background (reaches AmountPicker card; AiCreditsHero pins $backgroundSurface)',
    },
    darkCardBorderColor: {
      control: 'color',
      description: 'themes.dark_Card.borderColor (reaches both AiCreditsHero and AmountPicker cards)',
    },
    lightCardBackground: {
      control: 'color',
      description: 'themes.light_Card.background (reaches AmountPicker card; AiCreditsHero pins $backgroundSurface)',
    },
    lightCardBorderColor: {
      control: 'color',
      description: 'themes.light_Card.borderColor (reaches both AiCreditsHero and AmountPicker cards)',
    },
    darkButtonBackground: { control: 'color', description: 'themes.dark_Button.background' },
    darkButtonBackgroundHover: { control: 'color', description: 'themes.dark_Button.backgroundHover' },
    darkButtonColor: { control: 'color', description: 'themes.dark_Button.color' },
    lightButtonBackground: { control: 'color', description: 'themes.light_Button.background' },
    lightButtonBackgroundHover: { control: 'color', description: 'themes.light_Button.backgroundHover' },
    lightButtonColor: { control: 'color', description: 'themes.light_Button.color' },
  },
  args: {
    darkCardBackground: '#1e1b4b',
    darkCardBorderColor: '#7C3AED',
    lightCardBackground: '#f5f3ff',
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
    const adapterFactory = createQuoteReadyAdapterFactory()
    return (
      <div style={{ display: 'grid', gap: 24, maxWidth: 960, margin: '0 auto' }}>
        <CodeBlock>
          {`<AiCreditsWidget\n  themeOverrides={${JSON.stringify(themeOverrides, null, 2)}}\n/>`}
        </CodeBlock>

        <DocsCallout title="All overridable paths on AiCreditsWidget" tone="info">
          <DocsList>
            <li>
              <strong>dark_Card / light_Card</strong>: background, color, borderColor, shadowColor —
              background and borderColor wired to the controls above. In the quote-ready view below,
              `borderColor` reaches both `AiCreditsHero` and `AmountPicker`, while `background`
              reaches the `AmountPicker` card (`AiCreditsHero` pins `backgroundColor="$backgroundSurface"`
              in `AiCreditsHero.tsx:52`, which outranks `dark_Card.background` / `light_Card.background`)
            </li>
            <li>
              <strong>dark_Button / light_Button</strong>: background, backgroundHover,
              backgroundPress, backgroundFocus, color, borderColor, borderColorFocus, shadowColor —
              background, backgroundHover, and color wired to the controls above; demonstrated below
              on the Buy tab&apos;s primary CTA button inside `AmountPicker`
            </li>
            <li>
              <strong>dark_AiCreditsStatusNotice / dark_BonusBadgeFrame</strong>: no dedicated preset
              exists for either named target (confirmed via packages/ui/src/presets.ts), so they
              already cascade from Card/Button above — no separate named-target controls are needed
              to reach them
            </li>
          </DocsList>
        </DocsCallout>

        <DocsCallout title="Why two columns" tone="info">
          Each surface renders once in dark and once in light so every wired `light_*` control has a
          visibly-exercised counterpart, not just a paired value that happens to exist.
        </DocsCallout>

        <div>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>
            Quote-ready state — hero card border, AmountPicker card (background + border), and primary CTA button
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div data-testid="AiCreditsWidget-theme-overrides-dark" style={{ width: 380 }}>
              <AiCreditsWidget
                provider={provider}
                adapterFactory={adapterFactory}
                defaultTheme="dark"
                themeOverrides={themeOverrides}
              />
            </div>
            <div data-testid="AiCreditsWidget-theme-overrides-light" style={{ width: 380 }}>
              <AiCreditsWidget
                provider={provider}
                adapterFactory={adapterFactory}
                defaultTheme="light"
                themeOverrides={themeOverrides}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}
