import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  DialogDemo,
  Sheet,
  useToastController,
  XStack,
  YStack,
  isWeb,
  Theme,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { InsertWithSelectForm } from './modals/InsertWithSelectForm'

const { useParam } = createParam<{
  showModal?: string
}>()

export function HomeScreen() {
  const [showModal] = useParam('showModal')
  const showExpoModal = showModal === 'true'
  const router = useRouter()

  return (
    <>
      {isWeb && (
        <DialogDemo
          isOpen={showExpoModal}
          onClose={() =>
            router.push(`/`, `/`, {
              shallow: true,
            })
          }
          dialogTitle="Modal Bug"
          description="Why is this sheet.frame taking full height on iOS? 🤔"
        >
          <InsertWithSelectForm />
        </DialogDemo>
      )}
      <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
        <YStack gap="$4" bc="$background">
          <H1 ta="center">Welcome to Tamagui.</H1>
          <Paragraph ta="center">
            Here's a basic starter to show navigating from one screen to another. This screen uses
            the same code on Next.js and React Native.
          </Paragraph>

          <Separator />
          <Paragraph ta="center">
            Made by
            <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman
            </Anchor>
            ,{' '}
            <Anchor
              color="$color12"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </Paragraph>
        </YStack>

        <XStack>
          <Theme inverse>
            <Button
              onPress={() => {
                router.push(`?showModal=true`, `/show-modal`, {
                  shallow: true,
                })
              }}
            >
              Show Modal
            </Button>
          </Theme>
        </XStack>

        <SheetDemo />
      </YStack>
    </>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
