import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { modules } from "@/pages/gauges/create/components/GeneralStep.tsx";
import { CustomFlatpickr, FormInput, VerticalForm } from "@/components";
import classNames from "classnames";
import { createComment, updateComment } from "@/helpers/api/comment.ts";
import { addMonths, isAfter, isEqual } from "date-fns";
import { CommentData } from "@/pages/gauges/components/CommentDialog/index.tsx";
import * as yup from "yup";
import { AlertCircle } from "lucide-react";

interface CommentFormProps {
  commentData: CommentData;
  type: string;
  reference_id?: string;
  isEdit: boolean;
  toggleModal: () => void;
}

const betweenOptions = [
  { name: "Month", value: 1 },
  { name: "Quarter", value: 3 },
  { name: "Half a year", value: 6 },
  { name: "Year", value: 12 },
];

export const commentSchema = yup.object().shape({
  contents: yup.string().required("Content is required"),
  started_at: yup.string().optional(),
  ended_at: yup.string()
    .optional()
    .test("minDate", "End date must be later than start date", function (value) {
      const started_at = this.resolve(yup.ref("started_at"));
      if (typeof started_at !== 'string' || !started_at || !value) {
        return true;
      }

      try {
        const parsedFrom = new Date(started_at);
        const parsedValue = new Date(value);
        return isEqual(parsedValue, parsedFrom) || isAfter(parsedValue, parsedFrom);
      } catch (error) {
        return this.createError({ message: 'Invalid date format' });
      }
    }),
});

const CommentForm = ({ commentData: initialCommentData, type, reference_id, isEdit, toggleModal }: CommentFormProps) => {
  const [commentData, setCommentData] = useState<CommentData>(initialCommentData);
  const [between, setBetween] = useState<number>();
  const [errors, setErrors] = useState<{ [key in keyof CommentData]?: string }>({});

  useEffect(() => {
    setCommentData(initialCommentData);
  }, [initialCommentData]);

  useEffect(() => {
    if (commentData.started_at && between) {
      const newEndDate = addMonths(new Date(commentData.started_at), between).toDateString();
      setCommentData((prev) => ({ ...prev, ended_at: newEndDate }));
    }
  }, [commentData.started_at, between]);

  const handleChangeField = <K extends keyof CommentData>(field: K, value: CommentData[K]) => {
    setCommentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = async (data: CommentData, schema: any) => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key in keyof CommentData]?: string } = {};
        err.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path as keyof CommentData] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const renderFieldError = (fieldName: keyof CommentData) => {
    if (errors[fieldName]) {
      return (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors[fieldName]}
        </p>
      );
    }
    return null;
  };

  const onSubmit = async () => {

    const isValid = await validateStep(commentData, commentSchema);
    const payload = {
      id: commentData.id,
      type: type,
      contents: commentData.contents,
      tags: commentData.tags,
      reference_id: reference_id,
      started_at: commentData.started_at,
      ended_at: commentData.ended_at,
    };
    if (isValid) {
      if (isEdit) {
        updateComment(payload.id, { payload }).then();
      } else {
        createComment({ payload }).then();
      }
      toggleModal();
    }
  };

  return (
    <>
      <VerticalForm<CommentData>
        onSubmit={onSubmit}
      >
        <h2 className="text-lg mb-2">Add comments</h2>
        <div className="mb-3">
          <ReactQuill
            id="description"
            modules={modules}
            className="text-black"
            theme="snow"
            placeholder="Add comment..."
            value={commentData.contents}
            onChange={(e) => handleChangeField("contents", e.replaceAll('<p><br></p>', '').trim())}
          />
          {renderFieldError('contents')}
        </div>
        <FormInput
          label="Tags"
          type="text"
          name="tags"
          containerClass="mb-4"
          className="form-input"
          labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
          value={commentData.tags}
          onChange={(e) => handleChangeField("tags", e.target.value)} // Update tags correctly
          required
        />
        <div className={classNames('grid gap-3', commentData.started_at ? 'grid-cols-3' : 'grid-cols-3')}>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
              Period From
            </label>
            <CustomFlatpickr
              className="form-input pb-2"
              options={{
                enableTime: false,
              }}
              value={commentData.started_at ? new Date(commentData.started_at) : undefined}
              onChange={(e) => handleChangeField("started_at", e.toDateString())}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
              Between
            </label>
            <select className="form-select mb-2 pb-2" value={between} onChange={(e) => setBetween(+e.target.value)}>
              <option value=""></option>
              {betweenOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
              Until
            </label>
            <div className="pb-2">
              <CustomFlatpickr
                className="form-input"
                options={{
                  enableTime: false,
                }}
                value={commentData.ended_at ? new Date(commentData.ended_at) : undefined}
                onChange={(e) => handleChangeField("ended_at", e.toDateString())}
              />
              {renderFieldError('ended_at')}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 pt-3 border-t dark:border-slate-700">
          <button
            className="py-2 px-5 inline-flex justify-center items-center gap-2 rounded dark:text-gray-200 border dark:border-slate-700 font-medium hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
            onClick={toggleModal}
            type="button"
          >
            Cancel
          </button>
          <button type="submit" className={`btn text-white ${isEdit ? 'bg-primary' : 'bg-green-600'}`}>
            {isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </VerticalForm>
    </>
  );
};

export default CommentForm;
