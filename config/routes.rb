Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :create, :show, :destroy]
      resources :favourites, only: [:index, :create, :destroy]
    end
  end
  root 'homepage#index'
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get '/*path' => 'homepage#index'
end