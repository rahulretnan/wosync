import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormItemProps, Progress } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

const FormItem = Form.Item;

export interface ImageUploaderFieldProps<RecordType extends object> {
  name: Path<RecordType>;
  label: React.ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  buttonLabel?: string;
  required?: boolean;
  multiple?: boolean;
  accept: { [key: string]: string[] };
  uploadFile: (
    file: File,
    onUploadProgress: (progressEvent: ProgressEvent) => void,
  ) => Promise<void>;
  deleteFile: (file: File) => Promise<void>;
  acceptMessage?: string;
}

export const ImageUploaderField = <RecordType extends object>({
  multiple = false,
  name,
  label,

  customHelp,
  formItemProps,
  required,
  accept,
  uploadFile,
  deleteFile,
  acceptMessage,
}: ImageUploaderFieldProps<RecordType>) => {
  const { control, setValue, getValues } = useFormContext<RecordType>();
  const [fileList, setFileList] = useState<File[]>(() => getValues(name) || []);
  const [percent, setPercent] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);

      const uploadFiles = async (files: File[]) => {
        const uploadedFiles: File[] = [];

        for (const file of files) {
          try {
            await uploadFile(file, (progressEvent) => {
              const { loaded, total } = progressEvent;
              if (total) {
                const uploadProgress = Math.round((loaded / total) * 100);
                setPercent(uploadProgress);
              }
            });
            uploadedFiles.push(file);
          } catch (err) {
            console.error(err);
          }
        }

        return uploadedFiles;
      };

      const newFileList = multiple
        ? [...fileList, ...(await uploadFiles(acceptedFiles))]
        : await uploadFiles(acceptedFiles);

      setFileList(newFileList);
      setValue(name, newFileList as PathValue<RecordType, Path<RecordType>>); // update form value
      setUploading(false);
    },
    [fileList, multiple, uploadFile, setValue, name], // include setValue and name in dependencies
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const handleRemove = async (file: File) => {
    await deleteFile(file);
    setPercent(0);
    setUploading(false);
    const updatedFileList = fileList.filter((f) => f !== file);
    setFileList(updatedFileList);
    setValue(name, updatedFileList as PathValue<RecordType, Path<RecordType>>); // update form value
  };

  return (
    <Controller
      name={name}
      render={({ fieldState }) => {
        const { error } = fieldState;

        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp ?? undefined}
          >
            <div className="flex w-full flex-wrap items-center gap-5">
              {fileList.length > 0
                ? fileList.map((file) => (
                    <div
                      key={file.name}
                      className="group relative mr-2 inline-block"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="mb-2 h-auto w-full object-cover"
                      />
                      <Button
                        type="primary"
                        danger
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemove(file)}
                        className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform px-2 py-1 text-base opacity-0 group-hover:opacity-100"
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                : null}
              {(fileList.length === 0 || multiple) && (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed ${
                    isDragActive ? 'border-primary' : 'border-gray-400'
                  } group w-full rounded p-4`}
                  data-test-id="dropzone"
                >
                  <input {...getInputProps()} />
                  <p className="text-center">
                    <UploadOutlined />
                  </p>
                  <p className="text-center">
                    Click or drag files to this area to upload
                  </p>
                  <p className="text-center text-xs text-gray-600">
                    {acceptMessage}
                  </p>
                </div>
              )}
              <div className="w-full">
                {uploading && <Progress percent={percent} />}
              </div>
            </div>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
