"use client";
import { action as createCommentAction } from "@/app/reviews/[slug]/createComment";
import React, { useState, FormEvent } from "react";

interface CommentFormProps {
  title: string;
  slug: string;
}

interface FormState {
  loading: boolean;
  error: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({ slug, title }) => {
  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createCommentAction(formData);
    if (result?.isError) {
      setState({ loading: false, error: result.error });
    } else {
      form.reset();
      setState({ loading: false, error: null });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 bg-white rounded-md shadow-lg max-w-screen-sm"
    >
      <h2 className="text-xl font-bold text-green-700">
        Already watched this {title}?
      </h2>
      <h3 className="text-lg font-semibold text-green-600">Have your say</h3>
      <input type="hidden" name="slug" value={slug} />
      {state.error && <p className="text-red-600">{state.error}</p>}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-green-700">
          Your Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          className="p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="comment" className="text-green-700">
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          rows={4}
          className="p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <button
        disabled={state.loading}
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition duration-300 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
