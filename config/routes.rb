Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      get 'recipes/create'
      get 'recipes/show'
      get 'recipes/destroy'
    end
  end
  root 'homepage#index'
end
