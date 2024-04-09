import { LinearGradient } from '@tamagui/linear-gradient'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useFieldInfo, useTsController } from '@ts-react/form'
import { useId, useMemo } from 'react'
import {
  Adapt,
  Fieldset,
  Label,
  Select,
  SelectProps,
  Sheet,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui'
import { Platform } from 'react-native'
import { Shake } from '../Shake'
import { FullWindowOverlay } from 'react-native-screens'

type SelectItem = {
  value: string
  name: string
}

interface SelectFieldProps extends Pick<SelectProps, 'size' | 'native'> {
  options: SelectItem[]
  isExpoModalScreen?: boolean
}

export const SelectField = ({ options, isExpoModalScreen, ...props }: SelectFieldProps) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>()
  const { label, isOptional } = useFieldInfo()

  return (
    <SelectFieldView
      label={label}
      isOptional={isOptional}
      errorMessage={error?.errorMessage}
      isSubmitting={isSubmitting}
      value={field.value}
      onChange={field.onChange}
      options={options}
      isExpoModalScreen={isExpoModalScreen}
      {...props}
    />
  )
}

export const SelectFieldView = ({
  options,
  native = true,
  value,
  onChange,
  label,
  isOptional,
  errorMessage,
  isSubmitting = false,
  isExpoModalScreen = false,
  ...props
}: {
  options: SelectItem[]
  value?: string
  label?: string
  isOptional?: boolean
  errorMessage?: string
  onChange?: (value: string) => void
  isSubmitting: boolean
  isExpoModalScreen?: boolean
} & Pick<SelectProps, 'size' | 'native'>) => {
  const id = useId()
  const disabled = isSubmitting
  // const sheetProps = isExpoModalScreen
  //   ? {
  //       snapPoints: [100],
  //       snapPointsMode: 'percent' as SnapPointsMode,
  //     }
  //   : {}

  return (
    <Theme name={errorMessage ? 'red' : null} forceClassName>
      <Fieldset w="100%">
        {!!label && (
          <Label theme="alt1" size={props.size || '$3'} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={errorMessage}>
          <Select native={native} id={id} value={value} onValueChange={onChange} {...props}>
            <Select.Trigger w="100%" iconAfter={ChevronDown}>
              <Select.Value col="white" placeholder="Something" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              {isExpoModalScreen ? (
                <Sheet
                  containerComponent={useMemo(
                    () => (props: any) =>
                      Platform.OS === 'ios' ? (
                        <FullWindowOverlay>
                          <View f={1} pe="box-none">
                            {props.children}
                          </View>
                        </FullWindowOverlay>
                      ) : (
                        props.children
                      ),
                    []
                  )}
                  modal
                  dismissOnSnapToBottom
                >
                  <Sheet.Frame>
                    <Sheet.ScrollView>
                      <Sheet.Handle />
                      <Adapt.Contents />
                    </Sheet.ScrollView>
                  </Sheet.Frame>
                  <Sheet.Overlay />
                </Sheet>
              ) : (
                <Sheet modal dismissOnSnapToBottom>
                  <Sheet.Frame>
                    <Sheet.ScrollView>
                      <Sheet.Handle />
                      <Adapt.Contents />
                    </Sheet.ScrollView>
                  </Sheet.Frame>
                  <Sheet.Overlay />
                </Sheet>
              )}
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                <YStack zi={10}>
                  <ChevronUp size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={['$background', '$backgroundTransparent']}
                  br="$4"
                />
              </Select.ScrollUpButton>

              <Select.Viewport miw={200}>
                <XStack als="flex-start" w="100%">
                  <Select.Group disabled={disabled} space="$0">
                    {/* <Select.Label>{label}</Select.Label> */}
                    {options.map((item, i) => {
                      return (
                        <Select.Item
                          w="100%"
                          index={i}
                          key={item.name}
                          value={item.value}
                          active={item.value === value}
                        >
                          <Select.ItemText>{item.name}</Select.ItemText>

                          <Select.ItemIndicator marginLeft="auto">
                            <Check col="$green10Light" size={20} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    })}
                  </Select.Group>
                  {/* special icon treatment for native */}
                  {/* {native && isWeb && (
                    <YStack fullscreen ai="center" jc="center" w="$4" pe="none">
                      <ChevronDown size={getFontSize((props.size ?? '$true') as number)} />
                    </YStack>
                  )} */}
                </XStack>
              </Select.Viewport>

              <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
                <YStack zi={10}>
                  <ChevronDown size={20} />
                </YStack>
                <LinearGradient
                  start={[0, 0]}
                  end={[0, 1]}
                  fullscreen
                  colors={['$backgroundTransparent', '$background']}
                  br="$4"
                />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </Shake>
      </Fieldset>
    </Theme>
  )
}
