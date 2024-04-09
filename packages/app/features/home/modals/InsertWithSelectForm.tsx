import { isWeb, Theme, SubmitButton, SchemaForm, formFields } from '@my/ui'
import { useRouter } from 'solito/router'
import { PortalProvider } from 'tamagui'
import { z } from 'zod'

const Currencies = {
  USD: 'United States Dollar',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  GBP: 'British Pound',
  AUD: 'Australian Dollar',
}

const ChangeCurrencySchema = z.object({
  currency: formFields.select.describe('Currency'),
})

export const InsertWithSelectForm = () => {
  const router = useRouter()
  const handleSubmit = () => {
    alert(isWeb ? `Works fine on Web! ✅` : `You saw a full height Sheet on mobile 🤓`)
    router.push(`/`)
  }

  return (
    <PortalProvider>
      <SchemaForm
        onSubmit={async (fields) => {
          await handleSubmit()
        }}
        props={{
          currency: {
            isExpoModalScreen: true,
            options: Object.entries(Currencies).map(([key, value]) => ({
              name: value,
              value: key,
            })),
          },
        }}
        schema={ChangeCurrencySchema}
        defaultValues={{
          currency: 'USD',
        }}
        renderAfter={({ submit }) => (
          <Theme inverse>
            <SubmitButton onPress={() => submit()}>Update</SubmitButton>
          </Theme>
        )}
      >
        {(fields) => <>{Object.values(fields)}</>}
      </SchemaForm>
    </PortalProvider>
  )
}
