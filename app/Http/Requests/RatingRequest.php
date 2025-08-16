<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RatingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'book_id' => 'required|exists:books,id',
            'score'   => 'required|integer|min:1|max:10',
        ];
    }

    /**
     * Custom messages
     */
    public function messages(): array
    {
        return [
            'book_id.required' => 'Book is required.',
            'book_id.exists'   => 'Selected book does not exist.',
            'score.required'   => 'Rating score is required.',
            'score.integer'    => 'Rating score must be an integer.',
            'score.min'        => 'Rating score must be at least 1.',
            'score.max'        => 'Rating score cannot be more than 10.',
        ];
    }
}
