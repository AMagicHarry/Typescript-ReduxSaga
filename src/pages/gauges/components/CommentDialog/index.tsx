import { useEffect, useState } from "react";
import { ModalLayout } from "@/components/HeadlessUI";
import { format } from "date-fns";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames";
import { Gauge } from "@/redux/gauges/reducers.ts";
import {
  deleteComment,
  getComments,
} from "@/helpers/api/comment.ts";
import CommentForm from "@/pages/gauges/components/CommentDialog/CommentForm.tsx";

export interface Comment {
  id: number;
  contents: string;
  tags: string;
  started_at: string;
  ended_at: string;
  between?: number;
  type: string;
  reference_id?: string;
  created_at: Date;
  updated_at: Date;
  owner: any;
}

export interface CommentData {
  id: number;
  contents: string;
  reference_id?: string;
  tags: string;
  started_at: string;
  ended_at: string;
}

const INITIAL_COMMENT_DATA = {
  id: 0,
  contents: '',
  tags: '',
  started_at: '',
  ended_at: '',
}

interface CommentDialog {
  open: boolean;
  toggleModal: () => void;
  gauge: Gauge | null;
  type: string;
}

const CommentDialog = ({ open, gauge, toggleModal, type }: CommentDialog) => {
  const [commentData, setCommentData] = useState<CommentData>(INITIAL_COMMENT_DATA);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>()

  useEffect(() => {
    if (open) {
      setCommentData(INITIAL_COMMENT_DATA);
      setEdit(false);
      const payload = {
        type: type,
        reference_id: gauge?.id.toString()
      }
      getComments(payload)
        .then((res) => {
          setComments(res.data.comments);
        });
    }
  }, [open]);

  const handleSelectComment = (comment: Comment) => {
    setEdit(true);
    let selectedCommentData: CommentData = {
      id: comment.id,
      contents: comment.contents,
      tags: comment.tags,
      started_at: comment.started_at,
      ended_at: comment.ended_at,
      reference_id: comment.reference_id,
    }
    setCommentData(selectedCommentData);
  };

  const handleRemoveComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        setComments(comments?.filter((item) => item.id !== id));
      });
  };

  return (
    <ModalLayout
      showModal={open}
      toggleModal={toggleModal}
      panelClassName="sm:max-w-lg"
      placement="justify-center items-center"
    >
      <div
        className="duration-500 ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
        <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white text-lg mr-8">
            Comments: {gauge?.name}
          </h3>
          <button onClick={toggleModal} className="inline-flex justify-center items-center h-8 w-8 dark:text-gray-200">
            <i className="mgc_close_line text-xl"></i>
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-2 mb-4 border-b pb-2 max-h-[500px] overflow-auto">
            {comments?.map((item, index) => (
              <div
                className={classNames("p-2 border rounded-lg", {
                  "border-primary": item.id === commentData?.id,
                })}
                key={`comment-${index}`}
              >
                <h3>
                  On {format(new Date(item.created_at), "MMMM, d yyyy")},{" "}
                  <span className="text-primary">{item.owner.name}</span>
                </h3>
                <div
                  className="text-sm px-1"
                  dangerouslySetInnerHTML={{ __html: item.contents }}
                ></div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleSelectComment(item)}
                    className="btn border text-xs px-2 py-1 border-primary text-primary"
                  >
                    <i className="mgc_edit_3_line mr-1"></i> Edit
                  </button>
                  <button
                    onClick={() => handleRemoveComment(item.id)}
                    className="btn border text-xs px-2 py-1 border-danger text-danger"
                  >
                    <i className="mgc_delete_2_line mr-1"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        <CommentForm
          commentData={commentData}
          type={type}
          reference_id={gauge?.id.toString()}
          isEdit={isEdit}
          toggleModal={toggleModal}
        />
        </div>
      </div>
    </ModalLayout>
  );
};

export default CommentDialog;
