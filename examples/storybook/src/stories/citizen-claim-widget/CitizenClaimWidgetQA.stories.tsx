import type { Meta, StoryObj } from '@storybook/react'
import { CitizenClaimWidget, type CitizenClaimWidgetEnvironment } from '@goodwidget/citizen-claim-widget'
import {
  CustodialClaimExecutionClaimAllStory,
  CustodialLocalFixtureStory,
} from '../helpers/citizenClaimWidgetStories'
import { ENVIRONMENT_OPTIONS } from '../helpers/environmentOptions'
import { BRAND_PRESET_OPTIONS, brandPresetOverrides, type BrandPreset } from '../helpers/themeOverridePresets'

interface CitizenClaimWidgetQAArgs {
  defaultTheme: 'light' | 'dark'
  brandPreset: BrandPreset
  environment: CitizenClaimWidgetEnvironment
}

const meta: Meta<CitizenClaimWidgetQAArgs> = {
  title: 'QA/CitizenClaimWidget/Runtime Fixtures',
  component: CitizenClaimWidget,
  tags: ['autodocs', 'qa'],
  parameters: { layout: 'padded' },
  argTypes: {
    defaultTheme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Base theme applied via the widget’s own defaultTheme prop.',
    },
    brandPreset: {
      control: 'select',
      options: BRAND_PRESET_OPTIONS,
      description: 'Sample host-branding themeOverrides preset.',
    },
    environment: {
      control: 'radio',
      options: ENVIRONMENT_OPTIONS,
      description: 'Deployed GoodProtocol environment passed to the widget’s environment prop.',
    },
  },
  args: {
    defaultTheme: 'dark',
    brandPreset: 'None',
    environment: 'development',
  },
}

export default meta
type Story = StoryObj<CitizenClaimWidgetQAArgs>

export const CustodialLocalFixture: Story = {
  render: ({ defaultTheme, brandPreset, environment }) => (
    <CustodialLocalFixtureStory
      defaultTheme={defaultTheme}
      themeOverrides={brandPresetOverrides(brandPreset)}
      environment={environment}
    />
  ),
}

export const CustodialExecutionClaimAllContract: Story = {
  render: () => <CustodialClaimExecutionClaimAllStory />,
}
