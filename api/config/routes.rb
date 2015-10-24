Rails.application.routes.draw do
  resources :users, except: [:index, :new, :edit]
  post 'users/login', to: 'users#login'

  resources :games, except: [:new, :edit]
end
