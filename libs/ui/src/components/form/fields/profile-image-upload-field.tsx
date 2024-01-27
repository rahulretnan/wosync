import {
  CameraOutlined,
  LoadingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Form,
  FormItemProps,
  Image,
  message,
  Upload,
  UploadProps,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { ReactNode, useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export interface ProfileImageUploadFieldProps<RecordType extends FieldValues>
  extends UploadProps {
  name: Path<RecordType>;
  label?: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

const checkJpgOrPng = (file: RcFile) =>
  file.type === 'image/jpeg' || file.type === 'image/png';
const checkLt2M = (file: RcFile) => file.size / 1024 / 1024 < 2;

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const ProfileImageUploadField = <RecordType extends FieldValues>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  accept,
  ...props
}: ProfileImageUploadFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur, ref } = field;
        const { error } = fieldState;

        const url = value?.isUploaded ? (value?.url as string) : undefined;

        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp ?? undefined}
          >
            <Upload
              {...props}
              listType="picture-circle"
              showUploadList={false}
              accept="image/*"
              beforeUpload={async (file) => {
                setLoading(true);
                const isJpgOrPng = checkJpgOrPng(file);
                const isLt2M = checkLt2M(file);
                if (!isJpgOrPng)
                  message.error('You can only upload JPG/PNG file!');
                if (!isLt2M) message.error('File must be smaller than 2MB!');
                if (!(isJpgOrPng && isLt2M)) {
                  setLoading(false);
                  return isJpgOrPng && isLt2M;
                }
                setPreviewImage(await getBase64(file));
                onChange(file);
                setLoading(false);
                return isJpgOrPng && isLt2M;
              }}
              multiple={false}
              onRemove={() => onChange(undefined)}
              fileList={value ? [value] : undefined}
              ref={ref}
            >
              {url || value ? (
                <Image
                  src={value?.isUploaded ? url : previewImage}
                  onBlur={onBlur}
                  className="rounded-full"
                  width={value?.isUploaded ? 95 : 100}
                  preview={{
                    mask: value ? (
                      <div>
                        {loading ? (
                          <LoadingOutlined />
                        ) : (
                          <CameraOutlined className="text-4xl" />
                        )}
                      </div>
                    ) : undefined,
                    maskClassName: 'rounded-full',
                    visible: false,
                  }}
                />
              ) : (
                <Avatar size={100} icon={<UserOutlined onBlur={onBlur} />} />
              )}
            </Upload>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
