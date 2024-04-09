import { X } from '@tamagui/lucide-icons'

import { Adapt, Button, ButtonProps, Dialog, Sheet, Theme, Unspaced, XStack } from 'tamagui'

export const DialogDemo = ({
  isOpen,
  onClose,
  dialogTitle,
  description,
  children,
  buttonProps,
  fullscreen,
}: {
  isOpen: boolean
  onClose: () => void
  dialogTitle: string
  description?: string
  children?: React.ReactNode
  buttonProps?: ButtonProps
  fullscreen?: boolean
}) => {
  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame p="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" o={0.5} enterStyle={{ o: 0 }} exitStyle={{ o: 0 }} />
        <Dialog.Content bordered elevate key="content" gap="$4" fullscreen={fullscreen}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>

          {children}
          <XStack als="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              {buttonProps && (
                <Theme inverse>
                  <Button aria-label="Close" {...buttonProps}>
                    Submit
                  </Button>
                </Theme>
              )}
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button pos="absolute" t="$3" r="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
