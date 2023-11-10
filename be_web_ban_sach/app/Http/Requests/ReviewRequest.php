<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class ReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'book_id' => 'required',
            'review_title' => 'required|min:12|max:120',
            'rating_star' => 'required|integer|between:1,5',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'The :attribute field is required',
            'min' => 'The :attribute field must be at least :min characters.',
            'max' => 'The :attribute field must be at most :max characters.',
            'integer' => 'The :attribute field must be an integer.',
            'between' => 'The :attribute field must be between :min and :max.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'error' => $errors,
                'status_code' => 422,
                'messages' => 'Oops... Validate Request',
            ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
