import React from 'react';
import { Stack, Button, Box } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Textarea, FormLabel } from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { SmallAddIcon } from '@chakra-ui/icons';
import { theme } from '../../../theme';

type Props = {
  onSubmit: (data: any) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { fields, append } = useFieldArray({ name: 'activity', control });

  return (
    <Stack alignItems="baseline" justifyContent="flex-end" gap="none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <Stack gap="2">
          <Box>
            <FormLabel mb="0" fontSize="sm">
              Activity name
            </FormLabel>
            <Input
              placeholder="what is the activity"
              {...register('name', { required: 'you need to do something!' })}
              isInvalid={errors.name?.message}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p
                  style={{ color: theme.colors.red[400], fontSize: '0.75rem' }}
                >
                  {message}
                </p>
              )}
            />
          </Box>
          <Box>
            <FormLabel mb="0" fontSize="sm">
              description
            </FormLabel>
            <Textarea
              placeholder="you can add more details.."
              {...register('description')}
            />
          </Box>

          {fields.map((field, index) => (
            <Box>
              <FormLabel mb="0" fontSize="sm">
                category
              </FormLabel>
              <Input
                key={field.id} // important to include key with field's id
                {...register(`activity.${index}.value`)}
              />
            </Box>
          ))}
          {!fields.length && (
            <Button
              leftIcon={<SmallAddIcon margin="0" />}
              colorScheme="teal"
              onClick={() => append({ category: '' })}
              size="sm"
              width="max-content"
              iconSpacing="xs"
            >
              category
            </Button>
          )}
          <Button
            mt={4}
            display="flex"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            alignSelf="flex-end"
          >
            Done
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Form;
