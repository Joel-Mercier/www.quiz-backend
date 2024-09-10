/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  QuestionOptionPolicy: () => import('#policies/question_option_policy'),
  QuestionTypePolicy: () => import('#policies/question_type_policy'),
  QuestionPolicy: () => import('#policies/question_policy'),
  QuizPolicy: () => import('#policies/quiz_policy'),
  CategoryPolicy: () => import('#policies/category_policy')
}
