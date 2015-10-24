Rails.application.routes.draw do
  resources :users, except: [:index, :new, :edit]
  post 'users/login', to: 'users#login'

  resources :games, except: [:new, :edit] do
    post '', to: 'games#join'
    delete '', to: 'games#leave'
  end
end
