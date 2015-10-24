Rails.application.routes.draw do
  get 'users/me', to: 'users#me'
  post 'users/login', to: 'users#login'
  delete 'users/logout', to: 'users#logout'
  resources :users, except: [:index, :new, :edit]

  resources :games, except: [:new, :edit] do
    post '', to: 'games#join'
    delete '', to: 'games#leave'
    get 'events', to: 'games#events'
  end

  resources :participations, only: [:update]
end
