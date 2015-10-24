Rails.application.routes.draw do
  get 'users/me', to: 'users#me'
  post 'users/login', to: 'users#login'
  resources :users, except: [:index, :new, :edit]

  resources :games, except: [:new, :edit] do
    post '', to: 'games#join'
    delete '', to: 'games#leave'
  end
end
