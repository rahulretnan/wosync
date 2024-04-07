import React, { Dispatch, SetStateAction } from 'react';
import FormGenerator from '../form/form-generator';
import { Button } from 'antd';
import { useUserId } from '@nhost/react';
import useAntd from '../../hooks/use-antd';
import { useCreateStoreMutation } from '../../graphql/stores';
import { useForm } from 'react-hook-form';
import {
  createStoreSchemaResolver,
  CreateStoreValues,
} from '@shared/validations/create-store-form.schema';
import { FormGeneratorFieldProps } from '../form/types';

interface CreateStoreFormProps {
  setCurrent: Dispatch<SetStateAction<number>>;
  setStore: Dispatch<
    SetStateAction<{ id: string; website: string; name: string } | undefined>
  >;
}

const CreateStoreForm = ({ setCurrent, setStore }: CreateStoreFormProps) => {
  const userId = useUserId();
  const { message } = useAntd();
  const [createStore, { loading }] = useCreateStoreMutation({
    refetchQueries: ['stores'],
  });
  const form = useForm<CreateStoreValues>({
    defaultValues: {
      name: '',
      website_url: '',
    },
    resolver: createStoreSchemaResolver,
    mode: 'onSubmit',
  });
  const fields: FormGeneratorFieldProps<CreateStoreValues>[] = [
    {
      type: 'input',
      props: {
        label: 'Store Name',
        name: 'name',
        required: true,
      },
    },
    {
      type: 'input',
      props: {
        label: 'Website Url',
        name: 'website_url',
        required: true,
        prefix: 'https://',
      },
    },
  ];
  const onSubmit = async ({ website_url, name }: CreateStoreValues) => {
    try {
      const { data } = await createStore({
        variables: {
          object: {
            name,
            website_url,
            user_id: userId,
          },
        },
      });
      message.success('Store created successfully.');
      form.reset();
      setStore({ id: data?.insertStore?.id, website: website_url, name });
      setCurrent((prevState) => prevState + 1);
    } catch (e) {
      console.error(e);
      const error = e as Error;
      message.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <FormGenerator
        form={form}
        formClassName="w-[500px]"
        onSubmit={onSubmit}
        fields={fields}
        rows={1}
        buttonRender={
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading || form.formState.isSubmitting}
          >
            Add Store
          </Button>
        }
      />
    </div>
  );
};
export default CreateStoreForm;
