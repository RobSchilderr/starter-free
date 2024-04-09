// @ts-nocheck - ignore the _SchemaForm error
import { createTsForm, createUniqueFieldSchema } from '@ts-react/form'

import { Form, FormProps, FormWrapper, SelectField } from '@my/ui'
import { ComponentProps } from 'react'
import { z } from 'zod'

export const formFields = {
  select: createUniqueFieldSchema(z.string(), 'select'),
}

// function createFormSchema<T extends ZodRawShape>(getData: (fields: typeof formFields) => T) {
//   return z.object(getData(formFields))
// }

const mapping = [[formFields.select, SelectField] as const] as const

const FormComponent = (props: FormProps) => {
  return (
    <Form asChild {...props}>
      <FormWrapper tag="form">{props.children}</FormWrapper>
    </Form>
  )
}

const _SchemaForm = createTsForm(mapping, {
  FormComponent,
})

export const SchemaForm: typeof _SchemaForm = ({ ...props }) => {
  const renderAfter: ComponentProps<typeof _SchemaForm>['renderAfter'] = props.renderAfter
    ? (vars) => <FormWrapper.Footer>{props.renderAfter?.(vars)}</FormWrapper.Footer>
    : undefined

  return (
    <_SchemaForm {...props} renderAfter={renderAfter}>
      {(fields, context) => (
        <FormWrapper.Body>
          {props.children ? props.children(fields, context) : Object.values(fields)}
        </FormWrapper.Body>
      )}
    </_SchemaForm>
  )
}
