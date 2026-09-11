// StatCard.tsx
import { IconArrowDownRight, IconArrowUpRight, IconHelpCircle } from '@tabler/icons-react'
import clsx from 'clsx'

import { Card, CardProps, Group, Stack, Tooltip, Typography, TypographyProps } from '../../primitive/index.js'

import classes from './index.module.css'

type IconTone = 'brand' | 'neutral' | 'warning' | 'success' | 'danger'

const iconToneClass: Record<IconTone, string | undefined> = {
  brand: undefined,
  neutral: classes.iconNeutral,
  warning: classes.iconWarning,
  success: classes.iconSuccess,
  danger: classes.iconDanger
}

export interface StatCardProps extends CardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  iconTone?: IconTone
  titleProps?: TypographyProps
  valueProps?: TypographyProps
  /** Optional help text shown via a small "?" icon next to the title, EduVault-style. */
  titleTooltip?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const StatCard = ({
  title,
  value,
  icon,
  iconTone = 'brand',
  titleProps,
  valueProps,
  titleTooltip,
  children,
  className,
  onClick,
  ...rest
}: StatCardProps) => {
  return (
    <Card
      {...rest}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={clsx(classes.card, onClick && classes.interactive, className)}
    >
      <Group justify="flex-start" align="center" gap={8} wrap="nowrap" className={classes.header}>
        <Group gap={4} align="center" wrap="nowrap">
          <Typography variant="label-lg" className={classes.title} {...titleProps}>
            {title}
          </Typography>
          {titleTooltip && (
            <Tooltip label={titleTooltip}>
              <span className={classes.helpIcon} aria-hidden="true">
                <IconHelpCircle size={14} />
              </span>
            </Tooltip>
          )}
        </Group>
        {icon && (
          <span className={clsx(classes.icon, iconToneClass[iconTone])} aria-hidden="true">
            {icon}
          </span>
        )}
      </Group>

      <Stack gap={2} className={classes.body}>
        <Group gap={6} align="baseline" wrap="nowrap" className={classes.valueRow}>
          <Typography variant="headline-lg" className={classes.value} {...valueProps}>
            {value}
          </Typography>
          {children}
        </Group>
      </Stack>
    </Card>
  )
}

export interface StatCardTrendProps {
  value: number
  direction: 'up' | 'down'
  description?: string
  invertColor?: boolean
}

const Trend = ({ value, direction, description, invertColor }: StatCardTrendProps) => {
  const isPositive = invertColor ? direction === 'down' : direction === 'up'
  const Icon = direction === 'up' ? IconArrowUpRight : IconArrowDownRight

  return (
    <Group gap={6} wrap="nowrap" align="center">
      <span className={clsx(classes.trendPill, isPositive ? classes.trendPillPositive : classes.trendPillNegative)}>
        <Icon size={12} className={classes.trendIcon} />
        {value}%
      </span>
      {description && (
        <Typography variant="label-md" c="dimmed" className={classes.trendDescription}>
          {description}
        </Typography>
      )}
    </Group>
  )
}

StatCard.Trend = Trend
