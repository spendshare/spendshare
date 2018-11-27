Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  match '*path',
        controller: 'application',
        action: 'options',
        via: :options

  namespace 'api' do
    namespace 'v1' do
      post 'session', to: 'sessions#get'
      delete 'session', to: 'sessions#delete'
      get 'bills', to: 'bills#all'
      post 'bill', to: 'bills#create'
      get 'users', to: 'users#all'
    end
  end
end
