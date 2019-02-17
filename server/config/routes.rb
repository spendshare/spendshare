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

      get 'bills/:group_id', to: 'bills#all'
      post 'bills/:group_id', to: 'bills#create'
      put 'bills/:id', to: 'bills#update'
      delete 'bills/:id', to: 'bills#delete'
    end
  end
end
