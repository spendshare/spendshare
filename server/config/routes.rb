Rails.application.routes.draw do
  match '*path',
    controller: 'application',
    action: 'options',
    via: :options

  namespace 'api' do
    namespace 'v1' do
      post 'session', to: 'sessions#get'
      delete 'session', to: 'sessions#delete'
      post 'bill', to: 'bills#create'
      get 'users', to: 'users#all'
    end
  end
end
